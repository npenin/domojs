import * as akala from '@akala/server';
import { Media } from '../../metadata';
import { RestConfig } from '@akala/core/dist/api/rest';

type commandType = 'stop' | 'next' | 'pause' | 'previous' | 'mute';
var commands: commandType[] = ['stop', 'next', 'pause', 'previous', 'mute'];
function buildCommands(url: string, definition: { jsonrpcws: boolean, rest: RestConfig<{ target: string }> })
{
    var apiDefinition: {
        [K in commandType]: {
            jsonrpcws: boolean,
            rest: RestConfig<{ target: 'route.playerIdentity' }>
        }
    } = {} as any;
    akala.each(commands, function (cmd)
    {
        apiDefinition[cmd] = definition
        definition.rest.url = url + cmd
    })
    return apiDefinition;
}

export interface Player
{
    name: string;
    identity: string;
    icons: { [key: string]: string }
    capability?: ('playlist')[];
}

export var controller = new akala.Api()
    .serverToClientOneWay<Player[]>()({ players: { jsonrpcws: true, rest: false } })
    .clientToServer<void, Player[]>()({ getPlayers: { jsonrpcws: true, rest: { method: 'get', url: '/player' }, cli: { command: 'player' } } })
    .clientToServerOneWay<string>()({ control: true })
    .clientToServerOneWay<{ media: Media, target: string }>()({
        play: {
            jsonrpcws: true,
            rest:
            {
                method: 'post',
                url: '/api/@domojs/media/player/:playerIdentity',
                param: {
                    target: 'route.playerIdentity',
                    media: 'body'
                }
            }
        }
    })
    .clientToServerOneWay<{ target: string }>()(buildCommands('/api/@domojs/media/player/:playerIdentity/', {
        jsonrpcws: true,
        rest:
        {
            method: 'get',
            url: null,
            param: {
                target: 'route.playerIdentity',
            }
        }
    }))
    .serverToClientOneWay<{
        identity: string,
        state: 'playing' | 'paused' | 'stopped',
        position?: number,
        time?: number,
        length?: number,
    }>()({
        status: {
            jsonrpcws: true, rest: {
                method: 'get',
                url: '/api/@domojs/media/player/:playerIdentity/status',
                param: {
                    target: 'route.playerIdentity'
                }
            }
        }
    })
    .serverToClientOneWay<{ identity: string, playlist: { url: string, current?: boolean }[] }>()({
        playlist: {
            jsonrpcws: true,
            rest: {
                method: 'get',
                url: '/api/@domojs/media/player/:playerIdentity/playlist',
                param: {
                    target: 'route.playerIdentity'
                }
            }
        }
    })
    ;

export var player = new akala.Api()
    .clientToServerOneWay<Player>()({ registerPlayer: { jsonrpcws: true }, unregisterPlayer: { jsonrpcws: true } })
    .clientToServerOneWay<{
        identity: string,
        state: 'playing' | 'paused' | 'stopped',
        position?: number,
        time?: number,
        length?: number,
    }>()({ status: { jsonrpcws: true } })
    .clientToServerOneWay<{ identity: string, playlist: { url: string, current?: boolean }[] }>()({ playlist: { jsonrpcws: true } })
    .serverToClientOneWay<{ media: Media, target: string }>()({
        play: {
            jsonrpcws: true,
            rest:
            {
                method: 'post',
                url: '/api/player/:playerIdentity',
                param: {
                    target: 'route.playerIdentity',
                    media: 'body'
                }
            }
        },
    })
    .serverToClientOneWay<{ target: string }>()(buildCommands('/api/player/:playerIdentity/', {
        jsonrpcws: true,
        rest:
        {
            method: 'get',
            url: null,
            param: {
                target: 'route.playerIdentity',
            }
        }
    }))