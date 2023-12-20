import { Container } from "@akala/commands";
import { ProxyConfiguration } from "@akala/config";
import { LibraryState } from "../../state.js";
import { initConfig } from "./$init.js";

export default function (container: Container<LibraryState>, config: ProxyConfiguration<object>)
{

    if (!this)
    {
        config = config.get('@akala/media');
        if (!config)
        {
            config.set('@akala/media', {});
            initConfig(config = config.get('@akala/media'))
        }
        container.state = { config: config as LibraryState['config'], scrappers: { music: [], video: [] } };

        const scrapperContainer = new Container<unknown>('scrapper', undefined);
        Object.entries(container.state.config.scrappers.extract()).map(e =>
        {
            e[1].forEach(s =>
            {
                scrapperContainer.register(e[0] + '.' + s.name, s);
            })
        })
    }
}