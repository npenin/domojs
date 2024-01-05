import { Container } from "@akala/commands";
import { ProxyConfiguration } from "@akala/config";
import { LibraryState } from "../../state.js";
import { initConfig } from "./$init.js";

export default function (container: Container<LibraryState>, rootConfig: ProxyConfiguration<object>)
{

    if (!this)
    {
        let config: LibraryState = rootConfig.get('@akala/media');
        if (!config)
        {
            rootConfig.set('@akala/media', {});
            initConfig(config = rootConfig.get('@akala/media'))
        }
        container.state = config;

        const scrapperContainer = new Container<unknown>('scrapper', undefined);
        Object.entries(container.state.scrappers.extract()).map(e =>
        {
            e[1].forEach(s =>
            {
                scrapperContainer.register(e[0] + '.' + s.name, s);
            })
        })
    }
}