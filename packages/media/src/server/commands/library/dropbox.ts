import { Stats } from 'fs'
import * as fs from 'fs/promises'
import * as process from '../processFolder.js'
import * as akala from '@akala/core'
import { Media } from '../../index.js';
import { Container } from '@akala/commands';
import Configuration, { Vault } from '../../configuration.js';

export default async function (this: Configuration, container: Container<Configuration>, source: string, type: 'music' | 'video', name?: string, season?: number, episode?: number, album?: string, artist?: string)
{
    var lastIndex: Date;
    const fileName = `./dropbox-${source}-${type}.json`;

    const stat: Stats = await fs.lstat(fileName).catch((e) => { if (e.code === 'ENOENT') return null; throw e; });
    if (stat != null)
        lastIndex = stat.mtime;

    const results = await process.processSource(this.libraries[source].paths, this.get<Vault>('vault'), container, type, this.libraries[source].scrappers, lastIndex, name, season, episode, album, artist);

    let content: Record<string, Media[]> = results;
    if (Object.keys(results).length)
    {
        if (stat)
        {
            content = JSON.parse(await fs.readFile(fileName, 'utf8')) as { [key in keyof typeof results]: Media[] };
            akala.each(content, function (media, group)
            {
                if (results[group])
                    media.push(...results[group]);
            });
            akala.each(results, function (media, group)
            {
                if (!(group in content))
                    content[group as string] = media;
            });
        }
    }
    else
        return;
    await fs.writeFile(fileName, JSON.stringify(content));
}