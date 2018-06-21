import * as akala from '@akala/server';
import { client as db } from '@domojs/db';
import { api } from '../../client/mediaApi'
import * as process from './processFolder';
import { promisify } from 'util';
import { writeFile, fstat, stat, readFile, exists } from 'fs';
import { saveMedia } from './processFolder';
import { Media } from '@domojs/media/metadata';


@akala.server(api, {
    rest: '/api',
    cli: '@domojs/media:media',
    jsonrpcws: false
})
class Api
{
    async libraries(param)
    {
        var config = await param.config;
        if (!config)
            param.updateConfig({}, 'libraries');
        return config && config.libraries || {};
    }
    async library(param)
    {
        var config = await param.config;
        if (!config.libraries)
        {
            console.log('no libraries')
            return null;
        }

        var lib = config.libraries[param.library];
        if (lib)
        {
            return lib;
        }
        console.log('no lib');
        return null;
    }

    updateLibrary(param)
    {
        return param.config(param.path, 'libraries.' + param.name).then(function ()
        {
            return {};
        });
    }

    browse(param)
    {
        return param.config.then(function (config)
        {
            return process.processSource(config.libraries, param.source, param.type, null, param.name, param.season, param.episode, param.album, param.artist);
        });
    }

    dropbox(param)
    {
        return db.scard('media:' + param.type + ':toIndex').then(async (count) =>
        {
            var lastIndex: Date;

            if (count)
                if (await promisify(exists)('./dropbox-' + param.type + '.json'))
                    lastIndex = (await promisify(stat)('./dropbox-' + param.type + '.json')).mtime;

            return process.processSource(param.config, 'dropbox', param.type, lastIndex, param.name, param.season, param.episode, param.album, param.artist).then((results) =>
            {
                return akala.when([
                    Promise.resolve().then(async () =>
                    {
                        if (Object.keys(results).length)
                        {
                            if (await promisify(exists)('./dropbox-' + param.type + '.json'))
                            {
                                var content = JSON.parse(await promisify(readFile)('./dropbox-' + param.type + '.json', 'utf8')) as { [key: string]: Media[] };
                                akala.each(content, function (media, group)
                                {
                                    if (results[group])
                                        media.push.call(media, results[group]);
                                })
                            }
                            await promisify(writeFile)('./dropbox-' + param.type + '.json', JSON.stringify(content));
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
                                media.collections.push('media:' + param.type + ':toIndex')
                                cmd = saveMedia(cmd, media)
                            });
                        });

                        return cmd.exec();
                    })
                ]).then(() => { return results });
            });
        });
    }
}