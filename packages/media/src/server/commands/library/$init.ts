import { CliContext } from "@akala/cli";
import Configuration from "@akala/config";
import Config from '../../configuration'
import { LibraryState } from "../../state";
import path from 'path'

export default async function (this: LibraryState, context: CliContext, configPath?: string)
{
    if (!configPath)
        configPath = path.join(context.currentWorkingDirectory, './media.json');

    this.config = await Configuration.load<Config>(configPath, true);
    var libs = this.config.libraries;
    if (typeof (libs) === 'undefined')
    {
        this.config.set('libraries', {});
        await this.config.commit();
    }
    if (!this.config.scrappers)
        this.config.set('scrappers', { music: [], video: [] });

    this.scrappers = { music: [], video: [] };
}