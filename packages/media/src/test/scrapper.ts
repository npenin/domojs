import { Video } from '../../metadata.js';
import cleanFileName from "../server/commands/scrapper/cleanFileName.js";
import scrapTVShowFileName from "../server/commands/scrapper/scrapTVShowFileName.js";

(async function ()
{
    var media: Video = { path: '/home/coder/domojs/test.S01E01.mp4', type: 'video', id: null }
    media = cleanFileName(media);
    media = scrapTVShowFileName(media);

    console.log(media);
})()