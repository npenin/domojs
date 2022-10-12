
import lib from '../../../library'
import { sidecar, Container as pmContainer } from '@akala/pm'
import { Container } from '@akala/commands';

export default async function $init(pm: pmContainer & Container<void>, container: Container<void>)
{
    const mediaContainer = await sidecar({ pm })['@domojs/media'] as lib.container;
    var cmd = container.resolve('cleanFileName');
    await mediaContainer.dispatch('register-scrapper', 'video', { name: cmd.name, config: cmd.config, inject: cmd.inject, priority: 100 });
    var cmd = container.resolve('scrapTVShowFileName');
    await mediaContainer.dispatch('register-scrapper', 'video', { name: cmd.name, config: cmd.config, inject: cmd.inject, priority: 100 });
}