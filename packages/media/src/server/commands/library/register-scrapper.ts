import { Container, Metadata, SelfDefinedCommand } from "@akala/commands";
import Configuration from "@akala/config";
import { ScrapperConfiguration, ScrappersConfiguration } from "../../configuration";
import { LibraryState } from "../../state";

export default async function registerScrapper(this: LibraryState, container: Container<LibraryState>, remote: Container<void>, type: keyof ScrappersConfiguration, scrapper: ScrapperConfiguration)
{
    debugger;
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