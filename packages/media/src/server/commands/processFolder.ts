import * as akala from '@akala/core';
import * as fs from 'fs/promises';
import { createWriteStream, createReadStream } from 'fs';
import * as p from 'path';
import { BaseMedia, Media } from '../../../metadata.js';
import * as redis from 'ioredis';
import Configuration, { ProxyConfiguration } from '@akala/config';
import { Container } from '@akala/commands'
import { Vault } from '../configuration.js';
import { AuthType, FileStat, WebDAVClient, WebDAVClientOptions, createClient } from 'webdav';
import { fileURLToPath, pathToFileURL } from 'url'
import { Writable, Readable } from 'stream'
import { LibraryState } from '../state.js';

const log = akala.logger.use('domojs:media');

(function ()
{
    const orig = globalThis.decodeURIComponent;
    const decodedCache: Record<string, string> = {};

    globalThis.decodeURIComponent = function (s: string)
    {
        const originalS = s;
        let indexOfPercent: number;
        while (~indexOfPercent)
        {
            const firstIndexOfPercent = s.indexOf('%', indexOfPercent);
            if (!~firstIndexOfPercent)
                break;
            indexOfPercent = firstIndexOfPercent;
            const values = [];
            do
            {
                values.push(Number.parseInt(s.substring(indexOfPercent + 1, indexOfPercent + 3), 16));
                if (values.length > 1 && values[0] > 0x7f && values[0] <= 0xf4 && values.length > 1 && (values[values.length - 1] < 0x80 || values[values.length - 1] >= 0xC0))
                {
                    //wrong encoding
                    values.pop();
                    indexOfPercent -= 3;
                    break;
                }
                if (values.length == 1 && values[0] > 0x7f && values[0] < 0xc2)
                {
                    break;
                    //possible wrong encoding
                    if (s[indexOfPercent + 3] == '%')
                        indexOfPercent += 3;
                    else
                    {
                        break;
                    }
                }
                else if (values[0] > 0x7f && values[0] <= 0xdf && values.length < 2 || values[0] > 0xdf && values[0] <= 0xef && values.length < 3 || values[0] > 0xef && values[0] < 0xf4 && values.length < 4)
                {
                    if (values[0] > 0x7f && values[0] <= 0xf4 && (values.length == 1 || values[values.length - 1] >= 0x80 && values[values.length - 1] < 0xC0) && s[indexOfPercent + 3] == '%')
                        indexOfPercent += 3;
                    else
                    {
                        if (values.length > 1)
                        {
                            values.pop();
                            indexOfPercent -= 3;
                        }
                        break;
                        //possible wrong encoding
                    }
                }
                else
                    break;
            }
            while (true);
            if (values.length == 1 && values[0] > 0x7f)
            {
                // debugger;
                switch (values[0])
                {
                    case 149:
                        values[0] = [0x2022];
                        break;
                    case 0xa0:
                        values[0] = [0x20];
                        break;
                }
                s = s.substring(0, firstIndexOfPercent) + String.fromCodePoint(...values) + s.substring(firstIndexOfPercent + 3 * values.length);
                decodedCache[originalS] = s;
            }
            else if (!(values[0] < 0x7f && values.length == 1 || values[0] > 0x7f && values[0] <= 0xdf && values.length == 2 || values[0] > 0xdf && values[0] <= 0xef && values.length == 3 || values[0] > 0xef && values[0] < 0xf4 && values.length == 4))
            {
                // debugger;
                s = s.substring(0, firstIndexOfPercent) + Buffer.from(String.fromCharCode(...values), 'ascii').toString() + s.substring(firstIndexOfPercent + 3 * values.length);
                decodedCache[originalS] = s;
                //possible wrong encoding
            }

            indexOfPercent = s.indexOf('%', indexOfPercent + 1);
        }
        return orig(s);
    }


    const origEncode = globalThis.encodeURIComponent;

    globalThis.encodeURIComponent = function (s: string)
    {
        const r = Object.entries(decodedCache).find(x => x[1] == s);
        if (typeof r !== 'undefined')
            s = r[0];

        return origEncode(s);
    }
})()

export function encodeURIComponentLite(s: string)
{
    return s.replace(/#\?\//g, m =>
    {
        switch (m[0])
        {
            case '#':
            case '?':
            case '/':
                return '%' + m.codePointAt(0)
        }
    })
}

var folderMapping: { [key: string]: string } = {};

async function translatePath(path: string): Promise<string>
{
    if (path[0] == '/' && path[1] == '/' && process.platform != 'win32')
    {
        path = path.substring(2).replace(/\//g, p.sep);
        var indexOfSlash = path.indexOf(p.sep);
        path = path.substring(0, indexOfSlash) + ':' + path.substring(indexOfSlash);
        if (!folderMapping)
        {
            folderMapping = {};
            var fstab = await fs.readFile('/etc/fstab', 'ascii');
            var declarations = fstab.split(/\n/g);
            akala.each(declarations, function (line)
            {
                var declaration = line.split(/[ \t]/g);
                if (typeof (line) != 'undefined' && declaration.length > 1)
                {
                    folderMapping[declaration[0]] = declaration[1]
                }
            });
            log.debug(folderMapping);
        }
        akala.each(folderMapping, function (remotePath, localPath)
        {
            if (path.startsWith(remotePath))
                path = path.replace(remotePath, localPath as string);
        });
    }
    return path;
}

export var extensions = {
    video: /\.(avi|mkv|flv|mp4|mpg|ts)$/i,
    music: /\.(mp3|fla|flac|m4a|webm)$/i
};

export function saveMedia(db: redis.Pipeline, media: Media)
{
    var multi = db
        .hmset(media.id, media)
        .set(media.path.toString(), media.id);


    if (media.type == 'video')
    {
        if (media.collection)
        {
            multi = multi.sadd(media.collection + ':items', media.id);
            if (media.cover)
                multi = multi.hset(media.collection, 'cover', media.cover);
            multi = multi.hmset(media.collection, { name: media.name });
        }
        else
            multi = multi.sadd('media:' + media.type, media.id);

        multi = multi.hset(media.id, 'subType', media.subType);


        switch (media.subType)
        {
            case 'tvshow':
                if (media.episode)
                    multi = multi.hset(media.id, 'episode', media.episode);
                multi = multi.hset(media.id, 'season', media.season || 1);
                multi = multi.hset(media.collection, 'season', media.season || 1);
                if (media.episodes)
                    multi = multi.hset(media.collection, 'mediaCount', media.episodes);

                break;
            case 'movie':
                if (media.episode)
                    multi = multi.hset(media.id, 'episode', media.episode);
                break;
        }
    }
    else
    {
        multi = multi.sadd(media.collection + ':items', media.id, 'album', media.album, 'artist', media.artist);
    }

    if (media.collections)
        akala.each(media.collections, function (collection)
        {
            multi = multi.sadd(collection, media.id);
        })
    akala.each(media.tokens, function (token)
    {
        if (token != '-')
            multi = multi.sadd('keywords:' + media.type + ':' + alphabetize(token.replace(/ /g, '_').toLowerCase()), media.id, media.collection);
    });

    return multi;
}


var alphabetize = (function ()
{
    var defaultDiacriticsRemovalMap = [
        { 'base': 'A', 'letters': '\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F' },
        { 'base': 'AA', 'letters': '\uA732' },
        { 'base': 'AE', 'letters': '\u00C6\u01FC\u01E2' },
        { 'base': 'AO', 'letters': '\uA734' },
        { 'base': 'AU', 'letters': '\uA736' },
        { 'base': 'AV', 'letters': '\uA738\uA73A' },
        { 'base': 'AY', 'letters': '\uA73C' },
        { 'base': 'B', 'letters': '\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181' },
        { 'base': 'C', 'letters': '\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E' },
        { 'base': 'D', 'letters': '\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779' },
        { 'base': 'DZ', 'letters': '\u01F1\u01C4' },
        { 'base': 'Dz', 'letters': '\u01F2\u01C5' },
        { 'base': 'E', 'letters': '\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E' },
        { 'base': 'F', 'letters': '\u0046\u24BB\uFF26\u1E1E\u0191\uA77B' },
        { 'base': 'G', 'letters': '\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E' },
        { 'base': 'H', 'letters': '\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D' },
        { 'base': 'I', 'letters': '\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197' },
        { 'base': 'J', 'letters': '\u004A\u24BF\uFF2A\u0134\u0248' },
        { 'base': 'K', 'letters': '\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2' },
        { 'base': 'L', 'letters': '\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780' },
        { 'base': 'LJ', 'letters': '\u01C7' },
        { 'base': 'Lj', 'letters': '\u01C8' },
        { 'base': 'M', 'letters': '\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C' },
        { 'base': 'N', 'letters': '\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4' },
        { 'base': 'NJ', 'letters': '\u01CA' },
        { 'base': 'Nj', 'letters': '\u01CB' },
        { 'base': 'O', 'letters': '\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C' },
        { 'base': 'OI', 'letters': '\u01A2' },
        { 'base': 'OO', 'letters': '\uA74E' },
        { 'base': 'OU', 'letters': '\u0222' },
        { 'base': 'OE', 'letters': '\u008C\u0152' },
        { 'base': 'oe', 'letters': '\u009C\u0153' },
        { 'base': 'P', 'letters': '\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754' },
        { 'base': 'Q', 'letters': '\u0051\u24C6\uFF31\uA756\uA758\u024A' },
        { 'base': 'R', 'letters': '\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782' },
        { 'base': 'S', 'letters': '\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784' },
        { 'base': 'T', 'letters': '\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786' },
        { 'base': 'TZ', 'letters': '\uA728' },
        { 'base': 'U', 'letters': '\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244' },
        { 'base': 'V', 'letters': '\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245' },
        { 'base': 'VY', 'letters': '\uA760' },
        { 'base': 'W', 'letters': '\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72' },
        { 'base': 'X', 'letters': '\u0058\u24CD\uFF38\u1E8A\u1E8C' },
        { 'base': 'Y', 'letters': '\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE' },
        { 'base': 'Z', 'letters': '\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762' },
        { 'base': 'a', 'letters': '\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250' },
        { 'base': 'aa', 'letters': '\uA733' },
        { 'base': 'ae', 'letters': '\u00E6\u01FD\u01E3' },
        { 'base': 'ao', 'letters': '\uA735' },
        { 'base': 'au', 'letters': '\uA737' },
        { 'base': 'av', 'letters': '\uA739\uA73B' },
        { 'base': 'ay', 'letters': '\uA73D' },
        { 'base': 'b', 'letters': '\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253' },
        { 'base': 'c', 'letters': '\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184' },
        { 'base': 'd', 'letters': '\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A' },
        { 'base': 'dz', 'letters': '\u01F3\u01C6' },
        { 'base': 'e', 'letters': '\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD' },
        { 'base': 'f', 'letters': '\u0066\u24D5\uFF46\u1E1F\u0192\uA77C' },
        { 'base': 'g', 'letters': '\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F' },
        { 'base': 'h', 'letters': '\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265' },
        { 'base': 'hv', 'letters': '\u0195' },
        { 'base': 'i', 'letters': '\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131' },
        { 'base': 'j', 'letters': '\u006A\u24D9\uFF4A\u0135\u01F0\u0249' },
        { 'base': 'k', 'letters': '\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3' },
        { 'base': 'l', 'letters': '\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747' },
        { 'base': 'lj', 'letters': '\u01C9' },
        { 'base': 'm', 'letters': '\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F' },
        { 'base': 'n', 'letters': '\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5' },
        { 'base': 'nj', 'letters': '\u01CC' },
        { 'base': 'o', 'letters': '\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275' },
        { 'base': 'oi', 'letters': '\u01A3' },
        { 'base': 'ou', 'letters': '\u0223' },
        { 'base': 'oo', 'letters': '\uA74F' },
        { 'base': 'p', 'letters': '\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755' },
        { 'base': 'q', 'letters': '\u0071\u24E0\uFF51\u024B\uA757\uA759' },
        { 'base': 'r', 'letters': '\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783' },
        { 'base': 's', 'letters': '\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B' },
        { 'base': 't', 'letters': '\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787' },
        { 'base': 'tz', 'letters': '\uA729' },
        { 'base': 'u', 'letters': '\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289' },
        { 'base': 'v', 'letters': '\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C' },
        { 'base': 'vy', 'letters': '\uA761' },
        { 'base': 'w', 'letters': '\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73' },
        { 'base': 'x', 'letters': '\u0078\u24E7\uFF58\u1E8B\u1E8D' },
        { 'base': 'y', 'letters': '\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF' },
        { 'base': 'z', 'letters': '\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763' }
    ];

    var diacriticsMap = {};
    for (var i = 0; i < defaultDiacriticsRemovalMap.length; i++)
    {
        var letters = defaultDiacriticsRemovalMap[i].letters;
        for (var j = 0; j < letters.length; j++)
        {
            diacriticsMap[letters[j]] = defaultDiacriticsRemovalMap[i].base;
        }
    }

    // "what?" version ... http://jsperf.com/diacritics/12
    return function removeDiacritics(str)
    {
        return str.replace(/[^\u0000-\u007E]/g, function (a)
        {
            return diacriticsMap[a] || a;
        });
    }
})();

export interface WriteOptions
{
    overwrite: boolean
}

export interface FsProvider
{
    get root(): URL;
    readdir(url: URL | string): Promise<FileSystemEntry[]>;
    readFile(url: URL | string): Promise<Buffer>
    readFile(url: URL | string, encoding: BufferEncoding): Promise<string>;
    writeFile(url: URL | string, content: string | Buffer, options: WriteOptions): Promise<void>;
    deleteFile(url: URL | string): Promise<void>;
    createWriteStream(url: string | URL, options: WriteOptions): Writable
    createReadStream(url: string | URL): Readable
    get writable(): boolean;
    getEntry(url: URL | string): Promise<FileSystemEntry>;
    resolve(path: URL | string): URL
    move(source: URL | string, target: URL | string): Promise<void>
}

export interface FileSystemEntry
{
    isDirectory(): boolean;
    isFile(): boolean;
    name: string;
    mtime: Promise<Date>;
}

class RootedFs implements FsProvider
{
    constructor(public readonly root: URL, public readonly writable: boolean = true) { }
    resolve(url: string | URL): URL
    {
        if (typeof url == 'string' && url[0] == '/')
            url = url.substring(1);
        return new URL(url, this.root);
    }

    move(source: string | URL, target: string | URL): Promise<void>
    {
        const sourcePath = fileURLToPath(new URL(source, this.root));
        const targetPath = fileURLToPath(new URL(target, this.root));
        return fs.rename(sourcePath, targetPath);
    }

    getEntry(url: string | URL): Promise<FileSystemEntry>
    {
        if (typeof url == 'string' && url[0] == '/')
            url = url.substring(1);
        url = new URL(url, this.root);
        const filePath = fileURLToPath(url);
        return fs.lstat(filePath).then(stats => ({
            isDirectory: () => stats.isDirectory(),
            isFile: () => stats.isFile(),
            mtime: Promise.resolve(stats.mtime),
            name: p.basename(filePath)
        }));
    }

    writeFile(url: string | URL, content: string | Buffer, options: WriteOptions): Promise<void>
    {
        if (typeof url == 'string' && url[0] == '/')
            url = url.substring(1);
        url = new URL(url, this.root);
        return fs.writeFile(fileURLToPath(url), content, { flag: options?.overwrite ? 'w' : 'wx' });
    }

    deleteFile(url: string | URL): Promise<void>
    {
        if (typeof url == 'string' && url[0] == '/')
            url = url.substring(1);
        url = new URL(url, this.root);
        return fs.rm(fileURLToPath(url));
    }

    createWriteStream(url: string | URL, options: WriteOptions): Writable
    {
        if (typeof url == 'string' && url[0] == '/')
            url = url.substring(1);
        url = new URL(url, this.root);
        return createWriteStream(fileURLToPath(url), { flags: options?.overwrite ? 'w' : 'wx' });
    }

    createReadStream(url: string | URL): Readable
    {
        if (typeof url == 'string' && url[0] == '/')
            url = url.substring(1);
        url = new URL(url, this.root);
        return createReadStream(fileURLToPath(url));
    }

    async readdir(url: URL | string)
    {
        url = new URL(url, this.root);
        return (await fs.readdir(fileURLToPath(url), { withFileTypes: true })).map(e => ({
            name: e.name,
            isDirectory() { return e.isDirectory() },
            isFile() { return e.isFile() },
            mtime: fs.stat(fileURLToPath(new URL(e.name, url))).then(s => s.mtime)
        }));
    }
    async readFile(url: URL | string): Promise<Buffer>
    async readFile(url: URL | string, encoding: BufferEncoding): Promise<string>
    async readFile(url: URL | string, encoding?: BufferEncoding): Promise<Buffer | string>
    async readFile(url: URL | string, encoding?: BufferEncoding): Promise<Buffer | string>
    {
        url = new URL(url, this.root);
        return fs.readFile(fileURLToPath(url), encoding);
    }
}
class WebDavFs implements FsProvider
{
    client: WebDAVClient;

    constructor(public readonly root: URL, options?: WebDAVClientOptions, public readonly writable: boolean = true)
    {
        this.client = createClient(root.toString().replace(/^dav/i, 'http'), options);
    }

    public resolve(path: string | URL): URL
    {
        if (typeof path == 'string' && path[0] == '/')
            path = path.substring(1);
        return new URL(path, this.root);
    }

    move(source: string | URL, target: string | URL): Promise<void>
    {
        if (source instanceof URL)
            source = source.pathname;

        if (target instanceof URL)
            target = target.pathname;
        return this.client.moveFile(decodeURIComponent(source), decodeURIComponent(target));
    }

    getEntry(url: string | URL): Promise<FileSystemEntry>
    {
        if (url instanceof URL)
            url = url.pathname;
        return this.readdir(p.dirname(url)).then(ff => ff.find(f => f.name == p.basename(url as string)));
    }
    createWriteStream(url: string | URL, options: WriteOptions)
    {
        return this.client.createWriteStream(decodeURIComponent(url.toString()), options)
    }
    createReadStream(url: string | URL)
    {
        return this.client.createReadStream(decodeURIComponent(url.toString()))
    }

    writeFile(url: string | URL, content: string | Buffer, options: WriteOptions): Promise<void>
    {
        const stream = this.createWriteStream(url, options);
        return new Promise<void>((resolve, reject) => stream.write(content, (err) =>
        {
            if (err)
                reject(err);
            stream.end(resolve);
        }))
    }

    deleteFile(url: string | URL): Promise<void>
    {
        return this.client.deleteFile(decodeURIComponent(url.toString()));
    }

    async readdir(url: URL | string)
    {
        return (await this.client.getDirectoryContents(url.toString()) as FileStat[]).map(x => ({
            isDirectory() { return x.type == 'directory' },
            isFile() { return x.type == 'file' },
            name: x.basename,
            mtime: Promise.resolve(new Date(x.lastmod))
        }))
    }
    async readFile(url: URL | string): Promise<Buffer>
    async readFile(url: URL | string, encoding: BufferEncoding): Promise<string>
    async readFile(url: URL | string, encoding?: BufferEncoding): Promise<Buffer | string>
    async readFile(url: URL | string, encoding?: BufferEncoding): Promise<Buffer | string>
    {
        const chunks: Buffer[] = [];
        let readLength = 0;
        const readable = this.createReadStream(url);
        return new Promise((resolve, reject) => readable.on('data', function (chunk: Uint8Array)
        {
            chunks.push(Buffer.from(chunk));
            readLength += chunk.length;
        }).on('error', (err) =>
        {
            if ('response' in err && typeof err.response == 'object' && 'status' in err.response)
                switch (err.response.status)
                {
                    case 404:
                        reject(Object.assign(new Error(err.message, { cause: err }), { code: 'ENOENT' }));
                        break;
                    default:
                        reject(err);
                        break;
                }
            else
                reject(err);
        }).on('end', function ()
        {
            const buffer = Buffer.concat(chunks);
            if (encoding)
                return buffer.toString(encoding);
            resolve(buffer);
        })
        )
    }
}
class DomojsFsProvider implements FsProvider
{
    constructor(public readonly root: URL, private innerProvider: FsProvider)
    {
    }

    move(source: URL | string, target: URL | string)
    {
        if (URL.canParse(source))
            source = new URL(source);
        if (source instanceof URL)
            source = source.pathname + (source.search || '') + (source.hash || '');
        if (!source.startsWith(this.root.pathname))
            throw new Error(`Fs provider is chrooted to ${this.root.pathname}, but ${source} was used`);
        if (URL.canParse(target))
            target = new URL(target);
        if (target instanceof URL)
            target = target.pathname + (target.search || '') + (target.hash || '');
        if (!target.startsWith(this.root.pathname))
            throw new Error(`Fs provider is chrooted to ${this.root.pathname}, but ${target} was used`);
        return this.innerProvider.move(source.substring(this.root.pathname.length + 1), target.substring(this.root.pathname.length + 1))
    }

    resolve(url: string | URL): URL
    {
        if (URL.canParse(url))
            url = new URL(url);
        if (url instanceof URL)
            url = url.pathname + (url.search || '') + (url.hash || '');
        if (!url.startsWith(this.root.pathname))
            throw new Error(`Fs provider is chrooted to ${this.root.pathname}, but ${url} was used`);
        return this.innerProvider.resolve(url.substring(this.root.pathname.length));
    }

    getEntry(url: string | URL): Promise<FileSystemEntry>
    {
        if (URL.canParse(url))
            url = new URL(url);
        if (url instanceof URL)
            url = url.pathname + (url.search || '') + (url.hash || '');
        if (!url.startsWith(this.root.pathname))
            throw new Error(`Fs provider is chrooted to ${this.root.pathname}, but ${url} was used`);
        return this.innerProvider.getEntry(url.substring(this.root.pathname.length));
    }

    deleteFile(url: string | URL): Promise<void>
    {
        if (URL.canParse(url))
            url = new URL(url);
        if (url instanceof URL)
            url = url.pathname + (url.search || '') + (url.hash || '');
        if (!url.startsWith(this.root.pathname))
            throw new Error(`Fs provider is chrooted to ${this.root.pathname}, but ${url} was used`);
        return this.innerProvider.deleteFile(url.substring(this.root.pathname.length));
    }

    get writable() { return this.innerProvider.writable; }

    createWriteStream(url: string | URL, options: WriteOptions)
    {
        if (URL.canParse(url))
            url = new URL(url);
        if (url instanceof URL)
            url = url.pathname + (url.search || '') + (url.hash || '');
        if (!url.startsWith(this.root.pathname))
            throw new Error(`Fs provider is chrooted to ${this.root.pathname}, but ${url} was used`);
        return this.innerProvider.createWriteStream(url.substring(this.root.pathname.length), options);
    }
    createReadStream(url: string | URL)
    {
        if (URL.canParse(url))
            url = new URL(url);
        if (url instanceof URL)
            url = url.pathname + (url.search || '') + (url.hash || '');
        if (!url.startsWith(this.root.pathname))
            throw new Error(`Fs provider is chrooted to ${this.root.pathname}, but ${url} was used`);
        return this.innerProvider.createReadStream(url.substring(this.root.pathname.length));
    }

    writeFile(url: string | URL, content: string | Buffer, options: WriteOptions): Promise<void>
    {
        if (URL.canParse(url))
            url = new URL(url);
        if (url instanceof URL)
            url = url.pathname + (url.search || '') + (url.hash || '');
        if (!url.startsWith(this.root.pathname))
            throw new Error(`Fs provider is chrooted to ${this.root.pathname}, but ${url} was used`);
        return this.innerProvider.writeFile(url.substring(this.root.pathname.length), content, options);
    }

    async readdir(url: URL | string)
    {
        if (URL.canParse(url))
            url = new URL(url);
        if (url instanceof URL)
            url = url.pathname + (url.search || '') + (url.hash || '');
        if (!url.startsWith(this.root.pathname.substring(1)))
            throw new Error(`Fs provider is chrooted to ${this.root.pathname}, but ${url} was used`);
        return this.innerProvider.readdir(url.substring(this.root.pathname.length));
    }
    async readFile(url: URL | string): Promise<Buffer>
    async readFile(url: URL | string, encoding: BufferEncoding): Promise<string>
    async readFile(url: URL | string, encoding?: BufferEncoding): Promise<Buffer | string>
    async readFile(url: URL | string, encoding?: BufferEncoding): Promise<Buffer | string>
    {
        if (URL.canParse(url))
            url = new URL(url);
        if (url instanceof URL)
            url = url.pathname + (url.search || '') + (url.hash || '');
        if (!url.startsWith(this.root.pathname))
            throw new Error(`Fs provider is chrooted to ${this.root.pathname}, but ${url} was used`);
        return this.innerProvider.readFile(url.substring(this.root.pathname.length));
    }
}

export const fsHandler = new akala.UrlHandler<[URL, { provider?: FsProvider, config: LibraryState }], { provider: FsProvider, config: LibraryState }>();

fsHandler.useProtocol('file', async (root, result) =>
{
    return { provider: new RootedFs(root), config: result.config }
})

fsHandler.useProtocol('davs', async (root, result) =>
{
    var credentials = result.config.vault[root.hostname];
    if (root.pathname[root.pathname.length - 1] !== '/')
        root = new URL(root.pathname + '/' + root.search + root.hash, root)
    if (credentials)
        return { provider: new WebDavFs(root, { authType: AuthType.Password, username: credentials.username, password: await credentials.getSecret('password') }), config: result.config }
    else
        return { provider: new WebDavFs(root), config: result.config };
});
fsHandler.useProtocol('domojs', async (root, result) =>
{

    const lib = result.config.libraries[root.hostname];

    const mappedUrl = new URL(lib.paths.at(Number(root.pathname.substring(1))));

    await fsHandler.process(mappedUrl, result);
    return { provider: new DomojsFsProvider(root, result.provider), config: result.config };
})



var processing: string = null;
export async function processSource(library: string, config: LibraryState, container: Container<Configuration>, type: string, scrappers: string[], lastIndex?: Date, onlyWritable: boolean = false, options?: { name?: string, season?: number, episode?: number, album?: string, artist?: string })
{
    const sources = config.libraries[library].paths.map((_x, i) => `domojs://${library}/${i}`);
    var wasProcessing: string = null;

    var result: Media[] = [];
    if (processing)
        return Promise.reject('Server is already processing (' + processing + ')');
    var interval = setInterval(function ()
    {
        if (processing)
        {
            log.info(processing);
            wasProcessing = processing;
        }
        else if (wasProcessing)
        {
            log.info('process finished');
            wasProcessing = null;
            clearInterval(interval);
        }
    }, 10000);
    processing = 'processing folders';
    var extension = extensions[type];
    if (!lastIndex)
        lastIndex = new Date(0);
    var matcher = function (item: Media)
    {
        return (!options?.name || item.name == options?.name) &&
            (!options?.season || item.type == 'video' && item.subType == 'tvshow' && item.season == options?.season) &&
            (!options?.episode || item.type == 'video' && item.episode == options?.episode) &&
            (!options?.album || item.type == 'music' && item.album == options?.album) &&
            (!options?.artist || item.type == 'music' && item.artists && options?.artist in item.artists);
    }

    await akala.eachAsync(sources, async function (source)
    {
        let url: URL;
        if (URL.canParse(source))
            url = new URL(source);
        else
            url = new URL(pathToFileURL(source).toString());
        const r: { provider: FsProvider, config: LibraryState } = { provider: null, config };
        await fsHandler.process(url, r);
        if (onlyWritable && !r.provider.writable)
            return;

        await browse(r.provider, [url.pathname.substring(1)], extension);
    }, false);
    log.info('found ' + result.length + ' new ' + type + '(s)');
    processing = 'processing indexation';
    var trueResult: { [key: string]: Media[] } = {};
    await akala.eachAsync(result, async function (path)
    {
        var groups = Object.keys([]);
        const item = await container.dispatch('scrap', path, scrappers);
        if (item && matcher(item))
        {
            var name = item.type == 'music' && item.album || item.name;
            var group = trueResult[name];
            if (!group)
            {
                var groupName = groups.find(g => g.toLowerCase() == name.toLowerCase());
                group = trueResult[groupName];
                if (!group)
                {
                    groups.push(name);
                    trueResult[name] = group = [];
                }
            }
            group.push(item);
        }
    });
    processing = null;
    return trueResult;
}

export type BrowsedMedia = Pick<BaseMedia, 'type' | 'relativePath'> & { fs: FsProvider, path: URL, mtime: Date };

export async function browse(fs: FsProvider, tree: string[], extension: RegExp)
{
    var result: BrowsedMedia[] = [];

    const files = await fs.readdir(tree.join(''));
    await akala.eachAsync(files, async function (file)
    {
        if (file.name == '$RECYCLE.BIN' || file.name == '.recycle')
            return;
        // const stat = await fs.stat(await translatePath(path));
        if (file.isDirectory())
        {
            if (!file.name.endsWith('/'))
                result = result.concat(await browse(fs, tree.concat([file.name + '/']), extension));
            else
                result = result.concat(await browse(fs, tree.concat([file.name]), extension));
        }
        else
        {
            if (extension.test(file.name))
                result.push({
                    fs: fs,
                    path: new URL(tree.concat([file.name]).reduce((previous, p) => previous + '/' + p, ''), fs.root),
                    relativePath: tree.concat([file.name]),
                    type: Object.entries(extensions).find(e => e[1].test(file.name))[0] as 'video',
                    mtime: await file.mtime
                }
                );
        }
    });
    return result;
}