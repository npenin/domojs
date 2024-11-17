import * as devices from "../../../devices.js";
import { Container } from "@akala/commands";
import { sidecar, Container as pmContainer } from '@akala/pm';
import app, { SidecarConfiguration } from "@akala/sidecar";
import { DbSet } from "@akala/storage";
import { CliContext, OptionType } from "@akala/cli";
import { fileURLToPath } from 'url'
import Configuration, { ProxyConfiguration } from "@akala/config";


export default async function (this: devices.DeviceTypeState, context: CliContext<Record<string, OptionType>, Configuration>, container: Container<unknown>, pm: pmContainer & Container<any>)
{
    debugger;
    try
    {
        var webc = await sidecar({ pm })['@akala/server'];

        await webc.dispatch('remote-container', '/api/devices/types', (await import('../../devicetype-commands.js')).default.meta)
    }
    catch (e)
    {
        if (e && e.code !== 'INVALID_CMD' && e.statusCode !== 404)
            throw e;
    }
    this.initializing = [];
    this.types = {};
    let config: ProxyConfiguration<SidecarConfiguration>;
    if (!context.state)
        config = Configuration.new('./devicetype.json', {});
    else
    {
        if (!context.state.has('devicetype'))
            context.state.set('devicetype', {});
        config = context.state.get('devicetype')
    }
    Object.assign(this, await app<{ DeviceInit: DbSet<{ name: string, body: any }> }>(context, config, pm));
}