import * as akala from '@akala/server';
import { meta as scrapper } from './scrapper';
import { player, controller } from '../client/playerApi';
import { MediaTypes, MediaType, Media } from '../../metadata';
import { Connection } from '@akala/json-rpc-ws';
import * as ws from 'ws';
const log = akala.log('domojs:media:scrap')
var scrappers: { [type: string]: { priority: number, connection: Connection }[] } = {}
var controllers: { [key: string]: Connection[] } = { all: [] }
var players: { [key: string]: { connection: Connection, name: string } } = {}

function playerProxy(connection: Connection)
{
    return akala.api.jsonrpcws(player).createClientProxy(connection);
}
function controllerProxy()
{
    return {
        progress(p)
        {
            controllers[p.identity].forEach(connection =>
            {
                akala.api.jsonrpcws(controller).createClientProxy(connection).progress(p);
            });
        },
        playlist(p)
        {
            controllers[p.identity].forEach(connection =>
            {
                akala.api.jsonrpcws(controller).createClientProxy(connection).progress(p);
            });
        },
        players(p)
        {
            controllers['all'].forEach(connection =>
            {
                akala.api.jsonrpcws(controller).createClientProxy(connection).progress(p);
            });
        }
    };
}

akala.buildServer(new akala.DualApi(scrapper, new akala.DualApi(player, controller)), { jsonrpcws: '/media', rest: '/api/media' }, {
    register(scrapper, connection: Connection)
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
                    for (let i = 0; i < scrappers[scrapper.type].length; i++)
                    {
                        if (scrappers[scrapper.type][i].connection === connection)
                        {
                            index = i;
                            break;
                        }
                    }
                }
                scrappers[scrapper.type].splice(index, 1);
            })
    },
    scrap(media)
    {
        log(media);
        return akala.eachAsync(scrappers[media.type], (scrapper, i, next) =>
        {
            this.$proxy(scrapper.connection).scrap(media).then((m) =>
            {
                media = m;
                next();
            }, function (err)
                {
                    log(err);
                    next();
                });
        }).then((err) => { return media; });
    },
    play(param)
    {
        return playerProxy(players[param.identity].connection).play(param);
    },
    pause(param)
    {
        return playerProxy(players[param.identity].connection).pause(param);
    },
    stop(param)
    {
        return playerProxy(players[param.identity].connection).stop(param);
    },
    next(param)
    {
        return playerProxy(players[param.identity].connection).next(param);
    },
    previous(param)
    {
        return playerProxy(players[param.identity].connection).previous(param);
    },
    mute(param)
    {
        return playerProxy(players[param.identity].connection).mute(param);
    },
    registerAsPlayer(param, connection: Connection)
    {
        if (param.identity in players)
            throw new Error(`${param.identity} is already a registered player`);
        players[param.identity] = { connection, name: param.name };
        controllers[param.identity] = [];

        connection.on('close', function ()
        {
            delete controllers[param.identity];
            delete player[param.identity];
        })
    },
    getPlayers()
    {
        return Promise.resolve(akala.map(players, function (player, identity)
        {
            return { name: player.name, identity: identity as string };
        }, true));
    },
    progress(param)
    {
        return controllerProxy().progress(param);
    },
    control(param, connection)
    {
        controllers[param].push(connection);
        controllers['all'].push(connection);
        connection.on('close', function ()
        {
            controllers[param].splice(controllers[param].indexOf(connection), 1);
            controllers['all'].splice(controllers['all'].indexOf(connection), 1);
        })
    },
    playlist(param)
    {
        return controllerProxy().playlist(param)
    }
});