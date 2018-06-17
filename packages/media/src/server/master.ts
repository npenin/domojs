import * as akala from '@akala/server';
import { meta } from './scrapper';
import { MediaTypes, MediaType, Media } from '../../metadata';
import { Connection } from '@akala/json-rpc-ws';
import * as ws from 'ws';
const log=akala.log('domojs:media:scrap')
var scrappers: { [key: string]: { connection: Connection, priority: number }[] } = {}

akala.injectWithName(['$router'], function (router: akala.HttpRouter)
{
    akala.api.jsonrpcws(meta).createServer('/media', {
        register: function (scrapper, connection: Connection)
        {
            if (!(scrapper.type in scrappers))
                scrappers[scrapper.type] = [];
            for (var index = 0; index < scrappers[scrapper.type].length; index++)
            {
                if (scrappers[scrapper.type][index].priority < scrapper.priority)
                    break;
            }
            scrappers[scrapper.type].splice(index, 0, { connection: connection, priority: scrapper.priority });
            if (connection.socket instanceof ws)
                connection.socket.on('close', function ()
                {
                    if (!scrappers[scrapper.type][index] || scrappers[scrapper.type][index].connection !== connection)
                    {
                        for (let i = 0; i < scrappers[scrapper.type].length; i++) {
                            if(scrappers[scrapper.type][i].connection===connection)
                            {
                                index=i;
                                break;
                            }
                        }
                    }
                    scrappers[scrapper.type].splice(index, 1);
                })
        },
        scrap: function (media)
        {
            log(media);
            return akala.eachAsync(scrappers[media.type], (scrapper, i, next) =>
            {
                this.$proxy(scrapper.connection).scrap(media).then((m) =>
                {
                    media = m;
                    next();
                }, next);
            }).then(() => { return media; });
        }
    });
})();
