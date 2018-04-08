import * as akala from '@akala/server';
import { meta } from './scrapper';
import { MediaTypes, MediaType, Media } from '../../metadata';
import { Connection } from '@akala/json-rpc-ws';

var scrappers: { [key: string]: { connection: Connection, priority: number }[] } = {}

akala.injectWithName(['$router'], function (router: akala.HttpRouter)
{
    akala.createServerFromMeta(meta)(router, '/media', {
        register: function (scrapper, connection)
        {
            if (scrapper.type in scrappers)
                scrappers[scrapper.type] = [];
            for (var index = 0; index < scrappers[scrapper.type].length; index++)
            {
                if (scrappers[scrapper.type][index].priority < scrapper.priority)
                    break;
            }
            scrappers[scrapper.type].splice(index, 0, { connection: connection, priority: scrapper.priority });

        },
        scrap: function (media)
        {
            return new Promise<Media>((resolve, reject) =>
            {
                akala.eachAsync(scrappers[media.type], (scrapper, i, next) =>
                {
                    this.$proxy(scrapper.connection).scrap(media).then((m) =>
                    {
                        media = m;
                        next();
                    }, next);
                }, function (err)
                    {
                        if (err)
                            reject(err);
                        else
                            resolve(media);
                    });
            })
        }
    })
})();
