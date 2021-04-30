import { mdule2 } from './main.module'
import * as client from '@akala/client'
import { Container, Command } from '@akala/commands'
import { inject } from '@akala/core';
import { LocationService, PartDefinition } from '@akala/client';
import deviceTypes from '../server/devicetype-commands';
import template from '../../views/new.html'
import { DeviceType, IDevice } from '../devices';

@client.component(mdule2)
export class NewDevice implements PartDefinition<any>
{
    // public readonly template = require('@domojs/theme-default/views/tiles.html').default;

    constructor(@inject('akala-services.$part') part: client.Part, @inject('@domojs/devices/type.container') private container: Container<void> & deviceTypes.container)
    {
        part.use('/devices/new', 'body', this);
    }

    public readonly template = template;

    async controller(scope: client.IScope<any>, _element: Element, params: { ns?: string })
    {
        scope.$set('device', {});
        scope.$set('deviceTypes', this.container.dispatch('list'));
        scope.$set('send', this.send);
    }

    public send(this: { device: IDevice, type: DeviceType }, @inject('$modules.@domojs/devices.container') container: Container<void> & import('../server/device-commands').default.container)
    {
        return container.dispatch('add', this.type.name, this.device);
    }
}


@client.component(mdule2)
export class NewDeviceCommand
{
    // public readonly template = require('@domojs/theme-default/views/tiles.html').default;

    constructor(@inject('akala-services.$part') part: client.Part, @inject('akala-services.$location') private location: LocationService)
    {
        part.use('/devices', 'commands', this);
    }



    async controller(scope: client.IScope<any>, _element: Element)
    {
        scope.$set('commands', [{ name: 'new' }]);
        scope.$set('dispatch', (cmd: Command) =>
        {
            switch (cmd.name)
            {
                case 'new':
                    this.location.set('/devices/new');
                    break;
            }
        });
    }
}