import { Stats } from 'fs'
import * as fs from 'fs/promises'
import * as process from '../processFolder'
import * as akala from '@akala/core'
import { Media } from '../..';
import { Container } from '@akala/commands';
import Configuration from '../../configuration';

export default async function (container: Container<Configuration>, source: string, type: 'music' | 'video', name?: string, season?: number, episode?: number, album?: string, artist?: string)
{
    var lastIndex: Date;

    const stat: Stats = await fs.lstat('./dropbox-' + type + '.json').catch((e) => { if (e.code === 'ENOENT') return null; throw e; });
    if (stat != null)
        lastIndex = stat.mtime;

    var results = await process.processSource(container.state.libraries[source].paths, container, type, lastIndex, name, season, episode, album, artist);

    if (Object.keys(results).length)
    {
        var content = JSON.parse(await fs.readFile('./dropbox-' + type + '.json', 'utf8')) as { [key in keyof typeof results]: Media[] };
        akala.each(content, function (media, group)
        {
            if (results[group])
                media.push(...results[group]);
        })
    }
    await fs.writeFile('./dropbox-' + type + '.json', JSON.stringify(content));
}