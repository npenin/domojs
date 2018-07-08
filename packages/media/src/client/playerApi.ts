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

export var api = new akala.Api()
    .clientToServerOneWay<{ name: string, identity: string }>()({ register: { jsonrpcws: true } })
    .clientToServer<void, { name: string, identity: string }[]>()({ getPlayers: { jsonrpcws: true } })
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