import { mdule } from './main.module'
import * as client from '@akala/client'
import { Container, Metadata, SelfDefinedCommand } from '@akala/commands'
import { Tile } from '@domojs/theme-default';
import { inject } from '@akala/core';
import { LocationService } from '@akala/client';
import devices from '../server/device-commands';
import * as website from '@domojs/theme-default'

var commandRegistered = false;

@client.component(mdule)
export class Main
{
    // public readonly template = require('@domojs/theme-default/views/tiles.html').default;

    constructor(@inject('akala-services.$part') part: client.Part, @inject('container') private container: Promise<Container<void> & devices.container>, @inject('akala-services.$location') private location: LocationService)
    {
        part.use('/devices', 'body', this);
        part.use('/devices/category/:ns', 'body', this);
        part.use('/devices/:ns', 'body', this);
    }

    public readonly template = website.tiles;

    commandToTile(c: Metadata.Command, indexOfDot?: number): Tile
    {
        if (typeof indexOfDot == 'undefined')
            indexOfDot = c.name.indexOf('.');

        return {
            text: c.name.substring(indexOfDot + 1), click: async () =>
            {
                await (await this.container).dispatch(c.name);
                alert('command executed');
            }
        };
    }

    async controller(scope: client.IScope<any>, _element: Element, params: { ns?: string })
    {
        if (!commandRegistered)
        {
            scope['commands'].push(new SelfDefinedCommand((location: LocationService) => location.show('/devices/new'), 'new', ['$modules.akala-services.$location']));
            commandRegistered = true;
        }
        if (this.location.current.startsWith('/devices/category') || this.location.current == '/devices')
            scope.$set('tile.list', (await this.container).dispatch('get-by-category', params.ns));
        else
            scope.$set('tile.list', (await this.container).dispatch('get-by-name', params.ns));
    }
}