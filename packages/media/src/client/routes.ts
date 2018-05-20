import './mediaApi';
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
            scope['list'] = http.getJSON('api/@domojs/media/device/video' + params.name);
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