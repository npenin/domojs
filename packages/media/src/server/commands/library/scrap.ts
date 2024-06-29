import { Container } from "@akala/commands";
import { eachAsync } from "@akala/core";
import { Media } from '../../../../metadata.js';
import Configuration from '../../configuration.js';
import { LibraryState } from '../../state.js';
import { FsProvider, extensions, fsHandler } from "../processFolder.js";

export default async function scrap(this: LibraryState, container: Container<Configuration>, media: string | (Media & { fs: FsProvider }), scrappers?: string[])
{
    if (scrappers && !scrappers.length)
        scrappers = undefined;
    if (typeof media == 'string')
    {
        const r = { provider: null, config: this };
        fsHandler.process(new URL(media), r);

        media = { fs: r.provider, path: media, type: Object.entries(extensions).find(e => e[1].test(media as string))[0] as 'video', id: null }
    }
    this.scrappers[media.type].sort((a, b) => a.priority - b.priority);
    await eachAsync(this.scrappers[media.type].filter(s => !scrappers || scrappers.indexOf(s.name) > -1), async (scrapper) =>
    {
        try
        {
            media = await container.dispatch(scrapper, media)
        }
        catch (e)
        {
            console.error(e);
            console.error((media as Media).path)
        }
    });
    return media;
}