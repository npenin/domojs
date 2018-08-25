import * as akala from '@akala/client'
import { player as playerApi, controller as controllerApi, Player } from './playerApi'
import { api as mediaApi } from './mediaApi'
import { Client, Connection } from '@akala/json-rpc-ws';
import { Media } from '../../metadata';

interface IScopePlayer extends akala.IScope<IScopePlayer>
{
    playlist?: { url: string, current?: boolean }[];
    item?: { url: string, current?: boolean } | Media;
    status?: { identity: string, state: 'playing' | 'paused' | 'stopped', position?: number, time?: number, length?: number };
    controller: akala.api.Client<typeof controllerApi>;
    togglePlaylist(): void;
    playlistVisible?: boolean;
    togglePlayers(): void;
    playersVisible?: boolean;
    setPlayer(player: Player): void;
    currentPlayer?: Player;
}

akala.run(['$part', '$http', '$location', '$injector'], function (part: akala.Part, http: akala.Http, location: akala.LocationService, injector: akala.Injector)
{
    part.use('/media/player', 'body', {
        template: '/@domojs/media/player.html', controller: function (scope: IScopePlayer, elem, params)
        {
            scope.togglePlaylist = function ()
            {
                scope.$set('playlistVisible', !scope.playlistVisible)
            }
            scope.togglePlayers = function ()
            {
                scope.$set('playersVisible', !scope.playersVisible)
            }

            akala.injectWithNameAsync(['$agent.media'], async function (client: Client<Connection>)
            {
                var library = akala.api.jsonrpcws(mediaApi).createServerProxy(client);
                var controller = scope.controller = akala.api.jsonrpcws(controllerApi).createClient(client,
                    {
                        players(players)
                        {
                            scope.$set('players', players);
                        },
                        playlist(playlist)
                        {
                            scope.$set('playlist', playlist);
                            var liteMedia = playlist.playlist.find((item) => item.current);
                            scope.$set('item', playlist.playlist.find((item) => item.current));
                            library.getByPath(liteMedia.url).then((media) =>
                            {
                                if (media)
                                    scope.$set('item', media);
                            })
                        },
                        status(status)
                        {
                            scope.$set('status', status);
                        }
                    });
                scope.$set('players', controller.$proxy().getPlayers(null));
                scope.setPlayer = function (player)
                {
                    scope.currentPlayer = player;
                    controller.$proxy().control(player.identity)
                }
            })
        }
    });
});