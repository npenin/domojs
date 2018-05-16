import * as akala from '@akala/server';
import { DbClient } from '@domojs/db';
import { api } from '../../client/mediaApi'
import * as process from './processFolder';


@akala.server(api, {
    rest: '/api',
    cli: '@domojs/media:media',
    jsonrpcws: true
})
class Api
{
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
        return param.config(param.path, 'libraries.' + param.name);
    }

    browse(param)
    {
        return Promise.resolve(param.config).then(function (config)
        {
            return process.processSource(config.libraries, param.source, param.type, null, param.name, param.season, param.episode, param.album, param.artist);
        });
    }
}