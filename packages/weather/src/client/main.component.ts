import { mdule } from './main.module'
import * as client from '@akala/client'
import { Container, Metadata } from '@akala/commands'
import { Tile } from '@domojs/theme-default';
import { inject } from '@akala/core';
import { LocationService } from '@akala/client';
import { description } from '../commander';

@client.component(mdule)
export class Main
{
    // public readonly template = require('@domojs/theme-default/views/tiles.html').default;

    constructor(@inject('akala-services.$part') part: client.Part, @inject('container') private container: Promise<Container<void> & description.commands>, @inject('akala-services.$location') private location: LocationService)
    {
        part.use('/devices', 'body', this);
        part.use('/devices/category/:ns', 'body', this);
        part.use('/devices/:ns', 'body', this);
    }

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
        if (this.location.current.startsWith('/devices/category') || this.location.current == '/devices')
            scope.$set('list', (await this.container).dispatch('get-by-category', params.ns));
        else
            scope.$set('list', (await this.container).dispatch('get-by-name', params.ns));
    }
}