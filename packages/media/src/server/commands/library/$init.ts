import { CliContext } from "@akala/cli";
import Configuration, { ProxyConfiguration } from "@akala/config";
import Config from '../../configuration.js'
import { LibraryState } from "../../state.js";
import path from 'path'
import { Container } from "@akala/commands";

export default async function (this: LibraryState, context: CliContext, container: Container<LibraryState>, configPath?: string)
{
    if (!configPath)
        configPath = path.join(context.currentWorkingDirectory, './media.json');

    container.state = await Configuration.load<Config>(configPath, true);

    initConfig(this);
    await this.commit();
}

export function initConfig(config: LibraryState['config'])
{

    var libs = config.libraries;
    if (typeof (libs) === 'undefined')
        config.set('libraries', {});

    if (!config.scrappers)
        config.set('scrappers', { music: [], video: [] });
}
