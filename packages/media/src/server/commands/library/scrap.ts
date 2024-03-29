import { Container } from "@akala/commands";
import { eachAsync } from "@akala/core";
import { Media } from '../../../../metadata.js';
import Configuration from '../../configuration.js';
import { LibraryState } from '../../state.js';
import { extensions } from "../processFolder.js";

export default async function scrap(this: LibraryState, container: Container<Configuration>, mediaPath: string, scrappers?: string[])
{
    if (scrappers && !scrappers.length)
        scrappers = undefined;
    var media: Media = { path: mediaPath, type: Object.entries(extensions).find(e => e[1].test(mediaPath))[0] as 'video', id: null }
    this.scrappers[media.type].sort((a, b) => a.priority - b.priority);
    await eachAsync(this.scrappers[media.type].filter(s => !scrappers || scrappers.indexOf(s.name) > -1), async (scrapper) => media = await container.dispatch(scrapper, media));
    return media;
}