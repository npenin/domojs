import { Container } from "@akala/commands";
import { eachAsync } from "@akala/core";
import { Media } from "../../../../metadata";
import Configuration from "../../configuration";
import { LibraryState } from "../../state";
import { extensions } from "../processFolder";

export default async function scrap(this: LibraryState, container: Container<Configuration>, mediaPath: string, scrappers?: string[])
{
    if (scrappers && !scrappers.length)
        scrappers = undefined;
    var media: Media = { path: mediaPath, type: Object.entries(extensions).find(e => e[1].test(mediaPath))[0] as 'video', id: null }
    this.scrappers[media.type].sort((a, b) => a.priority - b.priority);
    debugger;
    await eachAsync(this.scrappers[media.type].filter(s => !scrappers || scrappers.indexOf(s.name) > -1), async (scrapper) => media = await container.dispatch(scrapper, media));
    return media;
}