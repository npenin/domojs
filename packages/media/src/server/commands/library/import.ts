import { Container } from "@akala/commands";
import { LibraryState } from "../../state.js";
import { fsHandler } from '../processFolder.js'
import Configuration, { LibraryConfiguration, Vault } from "../../configuration.js";
import { distinctStrings, eachAsync, mapAsync } from "@akala/core";
import { Media } from "../../index.js";
import updateIndex, { formatMedia, getIndexFileName } from "./update-index.js";
import library from "../../../library.js";
import { ProxyConfiguration } from "@akala/config";

export default async function importFiles(this: LibraryState, container: Container<Configuration>, source: string, target: string, type?: 'music' | 'video')
{


    if (!type)
    {
        return eachAsync(['music', 'video'] as const, type => importFiles.call(this, container, source, target, type));
    }

    let targetLibrary: ProxyConfiguration<LibraryConfiguration>;
    let targetIndex: number;
    let targetRoot: string;

    if (target.indexOf('/') == -1)
    {
        if (!this.libraries.has(target))
            throw new Error(`There is no such library named '${target}'`);
        targetLibrary = this.libraries[target];
        if (targetLibrary.paths.length > 1)
            throw new Error('The target library needs to be in the form `library/folderIndex` where library is the name of the library and folderIndex is the 0 based index of the target folder in this library.')
        targetIndex = 0;
        targetRoot = 'domojs://' + target + '/0';
    }
    else
    {
        const s = target.split('/')
        target = s[0];
        if (!this.libraries.has(s[0]))
            throw new Error(`There is no such library named '${target}'`);
        targetLibrary = this.libraries[target];
        targetRoot = 'domojs://' + target + '/' + s[1];
        targetIndex = Number(s[1]);
        if (isNaN(targetIndex) || targetLibrary.paths.length <= targetIndex)
            throw new Error('The target library needs to be in the form `library/folderIndex` where library is the name of the library and folderIndex is the 0 based index of the target folder in this library.')
    }


    const indexFileName = getIndexFileName(this, source, type);
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
            await updateIndex.call(this, container, source, type);
            results = JSON.parse(await fs.readFile(indexFileName, 'utf-8'));
        }
    }
    const organizers = targetLibrary.organizers;
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
            groupedResults[media.album].push({ ...media, relativePath: [targetIndex.toString(), ...media.relativePath.slice(1)] });
        }
        else
        {
            if (!(media.name in groupedResults))
                groupedResults[media.name] = [];
            groupedResults[media.name].push({ ...media, relativePath: [targetIndex.toString(), ...media.relativePath.slice(1)] });
        }
    })

    const result = await mapAsync(groupedResults, async (mm: (Media & { newRelativePath?: string[], newPath?: URL })[]) =>
    {
        // const types = distinctStrings(mm.map(m => m.type));
        // await eachAsync(types, async type =>
        await eachAsync(allOrganizers[type].filter(s => !organizers || organizers.indexOf(s.name) > -1), async (organizer) => mm = await container.dispatch(organizer, mm.filter(m => m.type == type)))
        // );
        mm.forEach(m => m.newRelativePath ? m.newPath = new URL(m.newRelativePath.join('/'), targetRoot) : m.newPath = new URL(m.relativePath.join('/'), targetRoot))
        return mm.filter(m => m.newPath.toString() !== m.path.toString());
    }, true).then(r => r.flat());

    const { provider: targetFs } = await fsHandler.process(new URL(targetRoot), { config: this });

    await eachAsync(result, async m =>
    {
        const { provider: sourceFs } = await fsHandler.process(new URL('domojs://' + source + '/' + m.relativePath[0]), { config: this });
        // TODO optimize in case of move on same server
        // if (sourceUri.hostname == targetUri.hostname)
        // {
        //     await targetFs.move(sourceFs.resolve('/' + m.relativePath[0]).pathname.replace(/\/[^\/]+/g, '/..') + sourceUri.pathname.substring(1), m.newPath);
        // }
        // else
        {
            console.log(`copying ${m.path} to ${m.newPath}`);
            await new Promise<void>((resolve, reject) => sourceFs.createReadStream(m.path).pipe(targetFs.createWriteStream(m.newPath, { overwrite: false })).on('error', reject).on('close', resolve));
            console.log(`deleting ${m.path}`)
            await sourceFs.deleteFile(m.path);
        }
    })
}