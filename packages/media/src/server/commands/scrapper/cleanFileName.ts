import { fileNameCleaner } from "../../fileNameScrapper";
import { Media } from "../../index";

export default async function cleanFileName(media: Media)
{
    debugger;
    media.name = fileNameCleaner(media.path);
    return media;
}