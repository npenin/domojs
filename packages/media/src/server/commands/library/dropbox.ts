import { Stats } from 'fs'
import * as fs from 'fs/promises'
import * as process from '../processFolder.js'
import * as akala from '@akala/core'
import { Media } from '../../index.js';
import { Container } from '@akala/commands';
import Configuration from '../../configuration.js';
import { LibraryState } from '../../state.js';

export default async function (this: LibraryState, container: Container<Configuration>, source: string, type: 'music' | 'video', name?: string, season?: number, episode?: number, album?: string, artist?: string) {
    var lastIndex: Date;
    const fileName = `./dropbox-${source}-${type}.json`;

    const stat: Stats = await fs.lstat(fileName).catch((e) => { if (e.code === 'ENOENT') return null; throw e; });
    if (stat != null)
        lastIndex = stat.mtime;

    const r1 = await Promise.all(this.libraries[source].paths.map(path => process.processSource(path, this, container, type, this.libraries[source].scrappers, lastIndex, false, { name, season, episode, album, artist })));
    const results = r1.reduce((acc, result) => ({ ...acc, ...result }), {});
    let content: Record<string, Media[]> = results;
    if (Object.keys(results).length) {
        if (stat) {
            content = JSON.parse(await fs.readFile(fileName, 'utf8')) as { [key in keyof typeof results]: Media[] };
            akala.each(content, function (media, group) {
                if (results[group])
                    media.push(...results[group]);
            });
            akala.each(results, function (media, group) {
                if (!(group in content))
                    content[group as string] = media;
            });
        }
    }
    else
        return;
    await fs.writeFile(fileName, JSON.stringify(content));
}