import { Container, Metadata, SelfDefinedCommand } from "@akala/commands";
import Configuration, { ProxyConfiguration } from "@akala/config";
import { ScrapperConfiguration, ScrappersConfiguration } from '../../configuration.js';
import { LibraryState } from '../../state.js';
import { Processors } from "@akala/commands";

export default async function registerOrganizer(this: LibraryState, container: Container<LibraryState>, remote: Container<void> | string, type: keyof ScrappersConfiguration, organizer: ScrapperConfiguration)
{
    if (typeof remote !== 'string')
    {
        container.register({ name: organizer.name, inject: organizer.config[''].inject, config: organizer.config, processor: remote });
        this.organizers[type].push(organizer);
        var disconnect = remote.resolve<Metadata.Command & { organizers?: ScrapperConfiguration[] }>('$disconnect');
        if (!disconnect)
        {
            disconnect = new SelfDefinedCommand(() =>
            {
                for (var scrapper of disconnect.organizers)
                {
                    container.unregister(scrapper.name);
                    this.organizers[type].splice(this.organizers[type].indexOf(scrapper), 1);
                }
            }, '$disconnect');
            disconnect.organizers = [];
            remote.register(disconnect);
        }
        disconnect.organizers.push(organizer);
    }
    else
    {
        const commands = await Processors.FileSystem.discoverMetaCommands(remote);
        if (!this.has('organizers'))
            this.set('organizers', { music: [], video: [] });
        this.organizers[type].push({ ...container.register(commands.commands.find(c => c.name == organizer.name)), priority: organizer.priority });
        await this.commit();
    }
}