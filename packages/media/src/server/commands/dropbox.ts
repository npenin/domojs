import * as akala from '@akala/server';
import * as process from './processFolder'
import { client as db } from '@domojs/db';
import { writeFile, fstat, stat, readFile, exists } from 'fs';
import { promisify } from 'util';
import { saveMedia } from './processFolder';
import { Media } from '@domojs/media/metadata';

akala.injectWithName(['$router'], function (router: akala.worker.Router)
{
    router.get('/api/dropbox/browse', akala.command([
        '$config',
        'query.source',
        'query.episode',
        'query.name',
        'query.season',
        'query.episode',
        'query.album',
        'query.artist'],
        process.processSource));

    router.get('/api/dropbox', akala.command([
        '$config',
        'query.source',
        'query.episode',
        'query.name',
        'query.season',
        'query.episode',
        'query.album',
        'query.artist'],
        function (config, source?: string, type?: 'music' | 'video', name?: string, season?: number, episode?: number, album?: string, artist?: string)
        {
            return db.scard('media:' + type + ':toIndex').then(async (count) =>
            {
                var lastIndex: Date;

                if (count)
                    if (await promisify(exists)('./dropbox.json'))
                        lastIndex = (await promisify(stat)('./dropbox.json')).mtime;

                return process.processSource(config, source, type, lastIndex, name, season, episode, album, artist).then((results) =>
                {
                    return akala.when([
                        Promise.resolve().then(async () =>
                        {
                            if (Object.keys(results).length)
                            {
                                if (await promisify(exists)('./dropbox.json'))
                                {
                                    var content = JSON.parse(await promisify(readFile)('./dropbox.json', 'utf8')) as { [key: string]: Media[] };
                                    akala.each(content, function (media, group)
                                    {
                                        if (results[group])
                                            media.push.call(media, results[group]);
                                    })
                                }
                                await promisify(writeFile)('./dropbox.json', JSON.stringify(content));
                            }
                        }),
                        Promise.resolve().then(() =>
                        {
                            var cmd = db.multi();
                            akala.each(results, function (medias)
                            {
                                akala.each(medias, (media) =>
                                {
                                    if (!media.collections)
                                        media.collections = [];
                                    media.collections.push('media:' + type + ':toIndex')
                                    cmd = saveMedia(cmd, media)
                                });
                            });

                            return cmd.exec();
                        })
                    ]).then(() => { return results });
                });
            });
        }
    ));
});