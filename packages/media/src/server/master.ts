import * as akala from '@akala/server';
import { meta as scrapper } from './scrapper';
import { player, controller } from '../client/playerApi';
import { MediaTypes, MediaType, Media } from '../../metadata';
import { Connection } from '@akala/json-rpc-ws';
import * as ws from 'ws';
const log = akala.log('domojs:media:scrap')
var scrappers: { [type: string]: { priority: number, connection: Connection }[] } = {}
var controllers: { [key: string]: Connection[] } = { all: [] }
var players: { [key: string]: { connection: Connection, name: string, icons: { [key: string]: string } } } = { }

function playerProxy(connection: Connection)
{
    return akala.api.jsonrpcws(player).createClientProxy(connection);
}
function controllerProxy()
{
    return {
        status(p)
        {
            controllers[p.identity].forEach(connection =>
            {
                akala.api.jsonrpcws(controller).createClientProxy(connection).status(p);
            });
        },
        playlist(p)
        {
            controllers[p.identity].forEach(connection =>
            {
                akala.api.jsonrpcws(controller).createClientProxy(connection).playlist(p);
            });
        },
        players(p, identity: string = 'all')
        {
            controllers[identity].forEach(connection =>
            {
                akala.api.jsonrpcws(controller).createClientProxy(connection).players(p);
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
        return playerProxy(players[param.target].connection).play(param);
    },
    pause(param)
    {
        return playerProxy(players[param.target].connection).pause(param);
    },
    stop(param)
    {
        return playerProxy(players[param.target].connection).stop(param);
    },
    next(param)
    {
        return playerProxy(players[param.target].connection).next(param);
    },
    previous(param)
    {
        return playerProxy(players[param.target].connection).previous(param);
    },
    mute(param)
    {
        return playerProxy(players[param.target].connection).mute(param);
    },
    registerPlayer(param, connection: Connection)
    {
        if (param.identity in players)
            throw new Error(`${param.identity} is already a registered player`);

        players[param.identity] = { connection, name: param.name,icons:param.icons };
        controllers[param.identity] = [];

        connection.on('close', function ()
        {
            delete player[param.identity];
            controllerProxy().players(akala.map(players, function (player, identity)
            {
                return { name: player.name, identity: identity as string };
            }, true), param.identity);
            delete controllers[param.identity];
        })
    },
    unregisterPlayer(param, connection: Connection)
    {
        if (!(param.identity in players))
            throw new Error(`${param.identity} is not registered as a player`);

        if (players[param.identity].connection != connection)
            throw new Error(`${param.identity} is not registered as a player on this connection`);

        delete player[param.identity];
        controllerProxy().players(akala.map(players, function (player, identity)
        {
            return { name: player.name, identity: identity as string, icons: player.icons };
        }, true), param.identity);
        delete controllers[param.identity];
    },
    getPlayers()
    {
        return Promise.resolve(akala.map(players, function (player, identity)
        {
            return { name: player.name, identity: identity as string, icons: player.icons };
        }, true));
    },
    status(param)
    {
        return controllerProxy().status(param);
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