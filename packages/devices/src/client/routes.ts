import * as akala from '@akala/client'
import * as commands from '@akala/commands'
import * as devices from '../devices';
import * as jsonrpc from '@akala/json-rpc-ws/lib/browser'

interface DeviceScope<T> extends akala.IScope<DeviceScope<T>>
{
    value: any;
}

interface DeviceCommandRenderer<T> extends akala.PartDefinition<DeviceScope<T>>
{
    controller(scope: DeviceScope<T>, element: Element): void;
}


var api = new commands.Container('devices', null, new commands.Processors.JsonRpc(commands.Processors.JsonRpc.getConnection(new WebSocketAdapter())))

akala.run(['$part', '$http', '$location', '$injector'], function (part: akala.Part, http: akala.Http, location: akala.LocationService, injector: akala.Injector)
{
    injector.register('deviceTypes', api.types());
    part.use<NewDevice>('/api/@domojs/devices/devices/new/{deviceType}', 'body', {
        controller: function (scope, element, params, next)
        {
            debugger;
            scope.deviceType = params.deviceType;
            next();
        }
    });
    part.use('/devices/new', 'body', {
        template: '/@domojs/devices/new.html', controller: function (scope: NewDevice, element, params, next)
        {
            if (scope.deviceType)
                return;
            scope.deviceTypes = injector.resolve('deviceTypes');
            scope.device = {};
            akala.injectWithName(['$http', '$location'], function (http: akala.Http, location: akala.LocationService)
            {
                var form = document.querySelector('form#create') as HTMLFormElement;
                scope.send = function ()
                {
                    api.new(scope.device).then(function ()
                    {
                        location.set('/devices/' + scope.device.name);
                    });

                    return false;
                };
            })();
        }
    });

    part.use('/devices', 'commands', {
        template: '/@domojs/devices/commands.html'
        , controller: function (scope, element, params, next)
        {
            next();
        }
    });
    part.use('/devices', 'body', {
        template: '/@domojs/theme-default/tiles.html', controller: function (scope)
        {
            scope['list'] = api.list({}).then(function (devices)
            {
                return akala.map(devices, function (dev)
                {
                    return { text: dev.name, url: '/devices/category/' + dev.name }
                });
            });
        }
    })

    part.use('/devices/category/:name', 'body', {
        template: '/@domojs/theme-default/tiles.html', controller: function (scope, elem, params)
        {
            scope['list'] = api.list({ id: params.name })
        }
    })

    part.use('/devices/:name', 'body', {
        template: '/@domojs/theme-default/tiles.html', controller: function (scope, elem, params)
        {
            scope['list'] = api.get({ id: params.name }).then(function (result)
            {
                return akala.map(result, function (item: Tile & { command?: domojs.devices.CommandDescription, device?: { type: string } }):
                    (Tile & { part?: akala.PartDefinition<akala.IScope<any>> }) | PromiseLike<(Tile & { part?: akala.PartDefinition<akala.IScope<any>> })>
                {
                    if (typeof (item.command) == 'object' && typeof (item.command.type) != 'undefined')
                    {
                        switch (item.command.type)
                        {
                            case 'range':
                                {
                                    var cmd = item.command;
                                    return akala.extend(item, {
                                        part: new Knob(function (value)
                                        {
                                            value = value * (cmd.max - cmd.min) + cmd.min;
                                            if (isNaN(value))
                                                return;
                                            if (cmd.max * 10 == Math.round(cmd.max) * 10 && cmd.min * 10 == Math.round(cmd.min) * 10)
                                                value = Math.round(value);
                                            api.get({ id: params.name, cmd: item.text, value: value.toString() });
                                        })
                                    });
                                }
                        }
                    }
                    if (typeof (item.device) == 'object' && typeof (item.device.type) != 'undefined')
                    {
                        switch (item.device.type)
                        {
                            case 'sensor':
                                {
                                    return api.get({ id: item.text, status: 1 }).then((status) =>
                                    {
                                        item.text = status + (item.device['unit'] || '');
                                        return item;
                                    });
                                }
                        }
                    }

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

                    return item;
                }, true);
            })
        }
    })

});