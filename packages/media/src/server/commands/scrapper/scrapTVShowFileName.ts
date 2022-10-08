import { scrapTVShowInfo } from "../../fileNameScrapper";
import { TVShow, Movie } from "../../index";

export default async function scrapTVShowFileName(media: TVShow | Movie)
{
    debugger;
    return scrapTVShowInfo(media);
}