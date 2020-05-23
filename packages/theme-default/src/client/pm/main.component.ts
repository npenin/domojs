import { module } from './main.module'
import * as client from '@akala/client'
import { Container, Processors, Metadata } from '@akala/commands'


@module.activateNew('akala-services.$part', 'pm')
class Main
{
    template = require('../../../views/tiles.html');

    constructor(part: client.Part, private container: Promise<Container<void>>)
    {
        part.use('/pm', 'body', this);
        part.use('/pm/:ns', 'body', this);
    }

    async controller(scope: client.IScope<any>, element: Element, params: { ns?: string }, next: () => void)
    {
        var metaContainer = await (await this.container).dispatch('$metadata') as Metadata.Container;
        scope.$set('list', metaContainer.commands.filter(c => params.ns && c.name.startsWith(params.ns) || !params.ns && c.name.indexOf('.') == -1));
    }
}