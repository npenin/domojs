import { LibraryConfiguration } from "../../configuration";
import { LibraryState } from "../../state";
import scrap from "./scrap";

export default async function addScrapper(this: LibraryState, name: string, scrapperType: string)
{
    var config = this.config.libraries[name];
    if (!config)
    {
        this.config.libraries.set(name, { paths: [], scrappers: [] });
        config = this.config.libraries[name];
    }
    config.scrappers.push(scrapperType);
    await config.commit();
}