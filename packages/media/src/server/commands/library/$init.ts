import { CliContext } from "@akala/cli";
import Configuration, { ProxyConfiguration } from "@akala/config";
import Config from '../../configuration.js'
import { LibraryState } from "../../state.js";
import path from 'path'
import { Container } from "@akala/commands";

export default async function (this: LibraryState, context: CliContext, configPath?: string)
{
    if (!configPath)
        configPath = path.join(context.currentWorkingDirectory, './media.json');

    this.config = await Configuration.load<Config>(configPath, true);

    initConfig(this.config);
    await this.config.commit();

    this.scrappers = { music: [], video: [] };
}

export function initConfig(config: LibraryState['config'])
{

    var libs = config.libraries;
    if (typeof (libs) === 'undefined')
        config.set('libraries', {});

    if (!config.scrappers)
        config.set('scrappers', { music: [], video: [] });
}
