import { mdule2 } from './main.module'
import * as client from '@akala/client'
import { Container, Processors, Command } from '@akala/commands'
import { inject } from '@akala/core';
import { LocationService, PartDefinition } from '@akala/client';
import { description } from '../server/devicetype-commands';
import template from '../../views/new.html'

@client.component(mdule2)
export class NewDevice implements PartDefinition<any>
{
    // public readonly template = require('@domojs/theme-default/views/tiles.html').default;

    constructor(@inject('akala-services.$part') part: client.Part, @inject('@domojs/devices/type.container') private container: Container<void> & description.deviceTypes)
    {
        part.use('/devices/new', 'body', this);
    }

    public readonly template = template;

    async controller(scope: client.IScope<any>, _element: Element, params: { ns?: string })
    {
        scope.$set('device', {});
        scope.$set('deviceTypes', this.container.dispatch('list'));
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