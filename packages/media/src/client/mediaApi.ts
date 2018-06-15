import * as akala from '@akala/core';
import * as media from '../../metadata';

export var api = new akala.Api()
    .clientToServer<void, string[]>()({
        libraries: {
            rest: { url: '/libraries', param: { config: '$config.@domojs/media' } },
            cli: { command: 'library', param: { updateConfig: '$updateConfig.@domojs/media', config: '$config.@domojs/media' } }
        }
    })
    .clientToServer<{ path: string, additionalPaths?: string[], name: string }, media.Media>()({
        updateLibrary: {
            rest: { url: '/library/:name', method: 'post', param: { path: 'body', additionalPaths: 'body', name: 'route', db: 'db', config: '$updateConfig.@domojs/media' } },
            cli: { command: 'library <name> <path> [...additionalPaths]', param: { path: 'param', additionalPaths: 'param', name: 'param', db: 'db', config: '$updateConfig.@domojs/media' } }
        }
    })
    .clientToServer<{ library: string }, media.Media[]>()({
        library: {
            rest: { url: '/library/:library', param: { library: 'route', db: 'db', config: '$config.@domojs/media' } },
            cli: { command: 'library <library>', param: { library: 'param', db: 'db', config: '$config.@domojs/media' } }
        }
    })
    .clientToServer<{ source: string, episode?: string, name?: string, season?: string, album?: string, artist?: string }, PromiseLike<{ [key: string]: media.Media[] }>>()({
        browse: {
            rest: {
                url: '/library/:name/browse', param: {
                    config: '$config.@domojs/media',
                    source: 'route.name',
                    episode: 'query.episode',
                    name: 'query.name',
                    season: 'query.season',
                    album: 'query.album',
                    artist: 'query.artist'
                }
            },
            cli: { command: 'browse <library>', param: { config: '$config.@domojs/media', library: 'param', episode: 'option', name: 'option', season: 'option', album: 'option', artist: 'option' } }
        },
    });