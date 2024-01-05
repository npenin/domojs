import { Container } from "@akala/commands";
import { ProxyConfiguration } from "@akala/config";
import State from "../state.js";

export default function (container: Container<State>, rootConfig: ProxyConfiguration<object>)
{

    if (!this)
    {
        let config: State = rootConfig.get('@akala/media-crunchyroll');
        if (!config)
        {
            rootConfig.set('@akala/media-crunchyroll', { locales: {} });
            config = rootConfig.get('@akala/media-crunchyroll');
        }
        container.state = config;

    }
}