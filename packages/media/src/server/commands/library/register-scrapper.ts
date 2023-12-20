import { Container, Metadata, SelfDefinedCommand } from "@akala/commands";
import Configuration, { ProxyConfiguration } from "@akala/config";
import { ScrapperConfiguration, ScrappersConfiguration } from '../../configuration.js';
import { LibraryState } from '../../state.js';
import { Processors } from "@akala/commands";

export default async function registerScrapper(this: LibraryState, container: Container<LibraryState>, remote: Container<void> | string, type: keyof ScrappersConfiguration, scrapper: ScrapperConfiguration)
{
    if (typeof remote !== 'string')
    {
        container.register({ name: scrapper.name, inject: scrapper.config[''].inject, config: scrapper.config, processor: remote });
        this.scrappers[type].push(scrapper);
        var disconnect = remote.resolve<Metadata.Command & { scrappers?: ScrapperConfiguration[] }>('$disconnect');
        if (!disconnect)
        {
            disconnect = new SelfDefinedCommand(() =>
            {
                for (var scrapper of disconnect.scrappers)
                {
                    container.unregister(scrapper.name);
                    this.scrappers[type].splice(this.scrappers[type].indexOf(scrapper), 1);
                }
            }, '$disconnect');
            disconnect.scrappers = [];
            remote.register(disconnect);
        }
        disconnect.scrappers.push(scrapper);
    }
    else
    {
        const commands = await Processors.FileSystem.discoverMetaCommands(remote);
        this.config.scrappers[type].push({ ...container.register(commands.find(c => c.name == scrapper.name)), priority: scrapper.priority } as unknown as ProxyConfiguration<ScrapperConfiguration>);
        await this.config.commit();
    }
}