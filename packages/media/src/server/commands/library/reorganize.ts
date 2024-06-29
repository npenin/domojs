import { Container } from "@akala/commands";
import { LibraryState } from "../../state.js";
import { fsHandler } from '../processFolder.js'
import Configuration, { Vault } from "../../configuration.js";
import { distinctStrings, eachAsync, mapAsync } from "@akala/core";
import { Media } from "../../index.js";
import updateIndex, { formatMedia, getIndexFileName } from "./update-index.js";

export default async function reorganize(this: LibraryState, container: Container<Configuration>, library: string, type?: 'music' | 'video')
{

    if (!type)
    {
        return eachAsync(['music', 'video'] as const, type => reorganize.call(this, container, library, type));
    }

    const indexFileName = getIndexFileName(this, library, type);
    const { provider: fs } = await fsHandler.process(indexFileName, { config: this });
    let results: Media[];
    try
    {
        results = JSON.parse(await fs.readFile(indexFileName, 'utf-8'));
    }
    catch (e)
    {
        if (e && e.code == 'ENOENT')
        {
            await updateIndex.call(this, container, library, type);
            results = JSON.parse(await fs.readFile(indexFileName, 'utf-8'));
        }
    }
    const organizers = this.libraries[library].organizers;
    const allOrganizers = this.organizers;

    if (type)
        allOrganizers[type].sort((a, b) => a.priority - b.priority);
    else
        Object.values(allOrganizers).map(x => x.sort((a, b) => a.priority - b.priority));

    let groupedResults: Record<string, Media[]> = {};
    results.forEach(media =>
    {
        if (media.type == 'music')
        {
            if (!(media.album in groupedResults))
                groupedResults[media.album] = [];
            groupedResults[media.album].push(media);
        }
        else
        {
            if (!(media.name in groupedResults))
                groupedResults[media.name] = [];
            groupedResults[media.name].push(media);

        }
    })

    const result = await mapAsync(groupedResults, async (mm: (Media & { newRelativePath?: string[] })[]) =>
    {
        const types = distinctStrings(mm.map(m => m.type));
        await eachAsync(types, async type =>
            await eachAsync(allOrganizers[type].filter(s => !organizers || organizers.indexOf(s.name) > -1), async (organizer) => mm = await container.dispatch(organizer, mm))
        );
        return mm.filter(m => m.newRelativePath && (m.newRelativePath.join('/') !== m.relativePath.join('/')));
    }, true).then(r => r.flat(1));

    const fss = await Promise.all(this.libraries[library].paths.map(async (m, i) =>
    {
        const { provider } = await fsHandler.process(new URL(`domojs://${library}/${i}`), { config: this })
        return provider;
    }));

    await eachAsync(result, async media =>
    {
        console.log(`moving ${media.relativePath.join('/')} to ${media.newRelativePath.join('/')}`);

        await fss[Number(media.relativePath[0])].move(media.path, new URL('/' + media.newRelativePath.join('/'), media.path));
    })

    return;


}