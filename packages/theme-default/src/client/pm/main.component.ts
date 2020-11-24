import * as akala from '@akala/core'
import { module } from './main.module'
import * as client from '@akala/client'
import { Container, Processors, Metadata } from '@akala/commands'
import { Tile } from '../public_api';
import { inject } from '@akala/core';


@client.component(module)
export class Main
{
    public readonly template = import('../../../views/tiles.html').then(h => h.default);

    constructor(@inject('akala-services.$part') part: client.Part, @inject('pm') private container: Promise<Container<void>>)
    {
        part.use('/pm', 'body', this);
        part.use('/pm/:ns', 'body', this);
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

    async controller(scope: client.IScope<any>, element: Element, params: { ns?: string }, next: () => void)
    {
        debugger;
        var metaContainer = await (await this.container).dispatch('$metadata', { param: [true] }) as Metadata.Container;
        var list: Tile[] = [];
        metaContainer.commands.forEach(c =>
        {
            var indexOfDot = c.name.indexOf('.');
            if (params.ns && indexOfDot > -1 && c.name.startsWith(params.ns + '.'))
                list.push(this.commandToTile(c, indexOfDot));
            else if (!params.ns) 
            {
                if (indexOfDot == -1)
                    list.push(this.commandToTile(c, indexOfDot));
                else if (!list.find(li => li.text == c.name.substr(0, indexOfDot)))
                {
                    list.push({ text: c.name.substr(0, indexOfDot), url: '/pm/' + c.name.substr(0, indexOfDot) });
                }
            }
        });
        scope.$set('tile.list', list);
    }
}