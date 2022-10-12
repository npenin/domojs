import { Video } from "../../metadata";
import cleanFileName from "../server/commands/scrapper/cleanFileName";
import scrapTVShowFileName from "../server/commands/scrapper/scrapTVShowFileName";

(async function ()
{
    var media: Video = { path: '/home/coder/domojs/test.S01E01.mp4', type: 'video', id: null }
    media = cleanFileName(media);
    media = scrapTVShowFileName(media);

    console.log(media);
})()