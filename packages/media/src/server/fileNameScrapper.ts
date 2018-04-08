import * as akala from '@akala/server';
import { meta as scrapper } from './scrapper';
import * as path from 'path'


function fileNameCleaner(fileName: string, extension?: RegExp)
{
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
    fileName = fileName.replace(/(^(\[[^\]]+\]_?)(\[[^\]]{2,7}\])?)|((1080|720)[pi])|[0-9]{3,4}x[0-9]{3,4}|([XH]\.?)26[45]|xvid|ogg|mp3|ac3|\+?aac|rv(9|10)e?([_-]EHQ)?|multi|vost(f(r)?)?|real|(?:true)(?:sub)?(?:st)?fr(?:ench)?|5\.1|dvd(rip(p)?(ed)?)?|bluray|directors\.cut|web-dl|\.V?[HLS][QD]|\.(?:fin(al)?)|TV|B(?:R)?(?:D)(rip(p)?(ed)?)?|\.v[1-9]/gi, '');
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

akala.worker.createClient('media').then((client) =>
{
    var s = scrapper.createClient(client)({
        scrap: function (media)
        {
            var fileName = path.basename(media.path);
            fileName = fileNameCleaner(fileName);
            media.name = fileName;

            return media;
        }
    }).$proxy();
    s.register({ type: 'video', priority: 100 });
    s.register({ type: 'music', priority: 100 });
});