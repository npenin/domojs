import { api } from './mediaApi';
import * as akala from '@akala/client';
import { Tile } from '@domojs/theme-default/dist/tile'


interface Collection extends akala.IScope<Collection>
{
}

akala.run(['$part', '$http', '$location', '$injector'], function (part: akala.Part, http: akala.Http, location: akala.LocationService, injector: akala.Injector)
{
    part.use('/media/video', 'body', {
        template: '/@domojs/media/video.html', controller: function (scope, elem, params)
        {
            var mediaApi = akala.api.rest(api).createServerProxy(new URL('/api/@domojs/media/', window.location.origin).toString());
            scope['list'] = mediaApi.library({ library: 'video' });
            scope['tileClick'] = function (tile: Tile, $location: akala.LocationService, $http: akala.Http)
            {
                if (tile.url)
                    if (akala.isPromiseLike(tile.url))
                        tile.url.then(function (url) { $location.show(url) });
                    else
                        $location.show(tile.url);
                if (tile.cmd)
                    $http.get(tile.cmd)
            }
        }
    })

    part.use('/media', 'commands', {
        template: '/@domojs/media/commands.html'
        , controller: function (scope, element, params, next)
        {
            next();
        }
    });

    interface MediaConfigScope extends akala.IScope<MediaConfigScope>
    {
        newItems: akala.ObservableArray<any>;
        addNewItem(): void;
    }

    part.use('/config/media', 'body', {
        template: '/@domojs/media/config.html'
        , controller: function (scope: MediaConfigScope, element, params, next)
        {
            scope.newItems = new akala.ObservableArray([]);
            scope.addNewItem = function ()
            {
                scope.newItems.push({});
            }
        }
    });

    part.use('/media', 'body', {
        template: '/@domojs/theme-default/tiles.html', controller: function (scope, elem, params)
        {
            var mediaApi = akala.api.rest(api).createServerProxy(new URL('/api/@domojs/media/', window.location.origin).toString());
            scope['list'] = mediaApi.libraries(null);
            scope['tileClick'] = function (tile: Tile, $location: akala.LocationService, $http: akala.Http)
            {
                if (tile.url)
                    if (akala.isPromiseLike(tile.url))
                        tile.url.then(function (url) { $location.show(url) });
                    else
                        $location.show(tile.url);
                if (tile.cmd)
                    $http.get(tile.cmd)
            }
        }
    })
});