import { Stats } from 'fs'
import * as process from '../processFolder.js'
import * as akala from '@akala/core'
import { BaseMedia, Media } from '../../index.js';
import { Container } from '@akala/commands';
import Configuration, { Vault } from '../../configuration.js';
import { LibraryState } from '../../state.js';
import { join } from 'path'
import { pathToFileURL } from 'url'

export function getIndexFileName(config: LibraryState, library: string, type: string): URL
{
    return new URL(pathToFileURL(join(config.indexFolder || '', `./index-${library}-${type}.json`)).toString());
}

export default async function updateIndex(this: LibraryState, container: Container<Configuration>, source: string, type: 'music' | 'video', options?: { force?: boolean, rescrap?: boolean, name?: string, season?: number, episode?: number, album?: string, artist?: string })
{
    var lastIndex: Date;
    const fileName = getIndexFileName(this, source, type);
    const { provider: fs } = await process.fsHandler.process(fileName, { config: this });

    const library = this.libraries[source];

    const stat = options?.force ? null : await fs.getEntry(fileName).catch(e => e.code === 'ENOENT' ? null : Promise.reject(e));
    if (stat != null)
        lastIndex = await stat.mtime;

    const results = (await Promise.all(library.paths.map(async (_, i) =>
    {
        const url: URL = new URL(`domojs://${source}/${i}`);
        const r: { provider: process.FsProvider, config: LibraryState } = { provider: null, config: this };
        await process.fsHandler.process(url, r);

        return await process.browse(r.provider, [i.toString() + '/'], process.extensions[type]);
    }))).flat(1);

    let content: Media[];

    try
    {
        content = JSON.parse(await fs.readFile(fileName, 'utf8'));
    }
    catch (e)
    {
        content = [];
    }

    const index = Object.fromEntries(content.map(x => [x.path.toString(), x]));
    const matcher = options && (options?.name || options.album || options.season || options.episode || options.artist) ? function (item: Media)
    {
        return (!options?.name || item.name == options?.name) &&
            (!options?.season || item.type == 'video' && item.subType == 'tvshow' && item.season == options?.season) &&
            (!options?.episode || item.type == 'video' && item.episode == options?.episode) &&
            (!options?.album || item.type == 'music' && item.album == options?.album) &&
            (!options?.artist || item.type == 'music' && item.artists && options?.artist in item.artists);
    } : null;

    const newIndex = {};
    await akala.eachAsync(results, async function (m)
    {
        let indexedMedia = index[m.path.href];
        if (!indexedMedia || options.rescrap)
        {
            newIndex[m.path.href] = formatMedia(await container.dispatch('scrap', m, library.scrappers));
        }
        else
        {
            newIndex[m.path.href] = formatMedia(Object.assign({}, indexedMedia, m));
        }
    }, true);

    await fs.writeFile(fileName, JSON.stringify(Object.values(newIndex), null, 4), { overwrite: true });
}

export function formatMedia(m: process.BrowsedMedia | Media): BaseMedia
{
    const media = { ...m, id: null, path: m.path.toString() };
    delete media['fs'];
    delete media['mtime'];

    return media;
}