import * as akala from '@akala/server';
import { scrapper } from './scrapper';
import * as path from 'path'
import { extensions } from './commands/processFolder';
import { TVShow, Movie } from '../../metadata';


export function fileNameCleaner(fileName: string, extension?: RegExp) {
    while (fileName.startsWith('/'))
        fileName = fileName.substr(1);
    if (/%[0-9a-f]{2}/gi.test(fileName))
        fileName = decodeURIComponent(fileName);
    // keep only files
    fileName = fileName.replace(/^([^\/]+\/)+([^\/]+)$/g, '$2');
    //trimming extension
    fileName = fileName.replace(extension, '');
    //trimming endTags
    fileName = fileName.replace(/(\[[A-F0-9]+\])*$/i, '');
    //checksum
    fileName = fileName.replace(/(\[[A-F0-9]+\]|\(_CRC[A-F0-9]+\))$/i, '');
    //other checksum format
    fileName = fileName.replace(/\[[a-f0-9]{6,8}\]/i, '');
    // //team specification at the beginning of the file name
    // fileName = fileName.replace(/^([A-Z]+-)/i, '');
    // //team specification at the end of the file name
    // fileName = fileName.replace(/([A-Z]+-)$/i, '');
    //team specification in brackets
    fileName = fileName.replace(/\{[A-Z]+\}/i, '');
    //normalizing separators to a dot
    fileName = fileName.replace(/[-\._ ]+/g, '.');
    //trimming codecs and format
    fileName = fileName.replace(/(^(\[[^\]]+\]_?)(\[[^\]]{2,7}\])?)|((10|8)bit(?:s)?)|((1080|720)[pi]?)|[0-9]{3,4}x[0-9]{3,4}|([XH]\.?)26[45]|xvid|ogg|mp3|ac3|\+?aac|rv(9|10)e?([_-]EHQ)?|multi|vost(f(r)?)?|(?:true)(?:sub)?(?:st)?fr(?:ench)?|5\.1|dvd(rip(p)?(ed)?)?|bluray|directors\.cut|web-dl|\.V?[HLS][QD](?:TV)?(?=\.)|\.(?:fin(al)?)|TV|B(?:R)?(?:D)(rip(p)?(ed)?)?|\.v[1-9]/gi, '');
    //trimming end tags
    fileName = fileName.replace(/\[[^\]]+\]\.?$/, '');
    //removing empty tags
    fileName = fileName.replace(/\[[\.+-]?\]/g, '');
    //removing empty tags with braces
    fileName = fileName.replace(/\{[\.+-]?\}/g, '');
    //removing empty tags with parent
    fileName = fileName.replace(/\([\.+-]?\)/g, '');
    //removing dates
    fileName = fileName.replace(/\[[0-9]{2}\.[0-9]{2}\.[0-9]{4}\]/, '');
    fileName = fileName.replace(/[0-9]{4}/, '');
    //trimming start for dots and spaces
    fileName = fileName.replace(/^[ \.]/g, '');
    //trimming end for dots
    fileName = fileName.replace(/[\. ]+$/, '');
    return fileName;
}

akala.injectWithNameAsync(['$agent.api/media'], function (client) {
    var s=akala.api.jsonrpcws(scrapper).createClient(client, {
        scrap: function (media) {
            var fileName = path.basename(media.path);
            fileName = fileNameCleaner(fileName);
            media.name = fileName;

            return media;
        }
    }).$proxy();
    s.register({ type: 'video', priority: 100 });
    s.register({ type: 'music', priority: 100 });
});

export function scrapTVShowInfo(media: TVShow | Movie) {
    var seasonMatch = seasonNumber.exec(media.name);
    var episodeMatch = episodeNumber.exec(media.name);
    var itemName = media.name.replace(extensions[media.type], '');
    if (!episodeMatch || !episodeMatch[1]) {
        if (!seasonMatch) {
            episodeMatch = /([0-9]+)(?:x|\.)([0-9]+)/.exec(media.name);
            if (episodeMatch && episodeMatch[2]) {
                seasonMatch = episodeMatch;
                episodeMatch = [false, episodeMatch[2]] as RegExpExecArray;
                episodeMatch.index = episodeMatch.index;
            }
        }
        if (!episodeMatch) {
            //console.log(media.name);
            episodeMatch = /(?:\.S(?:aison)?)\.?([0-9]+)\.?(?:E(?:p(?:isode)?)?|Part|Chapitre\.?)?([0-9]+)(?:v\d)?/i.exec(media.name);
            if (episodeMatch && episodeMatch[2]) {
                seasonMatch = episodeMatch;
                episodeMatch = [false, episodeMatch[2]] as RegExpExecArray;
                episodeMatch.index = seasonMatch.index
            }
            else
                episodeMatch = /(?:[^0-9v]|^)([0-9]{1,3})(?=\W|$)/.exec(media.name);
            if (!episodeMatch)
                episodeMatch = /(?:[^0-9]|^)([0-9]{1,3})(?:[^0-9]|$)/.exec(media.name);
        }

    }
    else {
        if (seasonMatch && seasonMatch[0]) {
            media.name = media.name.substring(0, seasonMatch.index) + media.name.substring(seasonMatch.index + seasonMatch[0].length);
            seasonMatch[0] = null;
            episodeMatch = /(?:[^0-9]|^)([0-9]{1,3})(?:v\d)?(?:[^0-9]|$)/.exec(media.name);
        }
    }

    if (episodeMatch && episodeMatch[0]) {
        media.name = media.name.substring(0, episodeMatch.index) + media.name.substring(episodeMatch.index + episodeMatch[0].length);
    }
    if (seasonMatch && seasonMatch[0]) {
        media.name = media.name.substring(0, seasonMatch.index) + media.name.substring(seasonMatch.index + seasonMatch[0].length);
    }
    var maxLength = Math.min(seasonMatch && seasonMatch.index || media.name.length, episodeMatch && episodeMatch.index || media.name.length);
    if (episodeMatch !== null && episodeMatch && episodeMatch[1])
        media.episode = Number(episodeMatch[1]);
    var itemNameMatch = name.exec(media.name);

    if (itemNameMatch) {
        if (itemNameMatch.index + itemNameMatch[0].length > maxLength)
            itemName = itemNameMatch[0].substr(0, maxLength);
        else
            itemName = itemNameMatch[0];
    }
    else
        itemName = media.name;
    media.name = itemName.replace(/prologue|oav|ova|Film|Movie/gi, '').replace(/\./g, ' ').replace(/ $/, '');
    media.displayName = media.name;

    media.id = 'media:video:' + media.name;
    if (seasonMatch) {
        media.subType = 'tvshow';
        if (media.subType == 'tvshow') {
            media.season = Number(seasonMatch[1]);
            media.displayName = media.displayName + ' - S' + media.season;
        }
    }
    if (episodeMatch) {
        media.displayName = media.displayName + ' - E' + media.episode;
    }
    return media;
}

var episodeNumber = /(?:\.E(?:p(?:isode)?)?|Part|Chapitre)\.?([0-9]+)(?:v\d)?/i;
var seasonNumber = /(?:\.S(?:aison)?)\.?([0-9]+)/i;
var name = /(([&,]|[A-Z!][A-Z!0-9]*|[A-Z!0-9]*[A-Z!'])+(\.|$))+/i;


akala.injectWithNameAsync(['$agent.api/media'], function (client) {
    var s = akala.api.jsonrpcws(scrapper).createClient(client, {
        scrap: scrapTVShowInfo
    }).$proxy();
    s.register({ type: 'video', priority: 90 });
});
