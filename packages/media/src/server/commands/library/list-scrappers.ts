import { LibraryConfiguration } from "../../configuration";
import { LibraryState } from "../../state";
import scrap from "./scrap";

export default async function listScrapper(this: LibraryState, type?: string)
{
    if (type)
        return this.scrappers[type];
    return this.scrappers;
}