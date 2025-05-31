import * as devices from "../../../devices.js";
import { Container } from "@akala/commands";
import { sidecar, Container as pmContainer } from '@akala/pm';
import app, { SidecarConfiguration } from "@akala/sidecar";
import { DbSet } from "@akala/storage";
import { CliContext, OptionType } from "@akala/cli";
import Configuration, { ProxyConfiguration } from "@akala/config";


export default async function (this: devices.DeviceTypeState, context: CliContext<Record<string, OptionType>, ProxyConfiguration<SidecarConfiguration>>, container: Container<unknown>, pm: pmContainer & Container<any>)
{
    try
    {
        var webc = await sidecar({ pm, container })['@akala/server'];

        await webc.dispatch('remote-container', '/api/devices/types', (await import('../../devicetype-commands.js')).default.meta)
    }
    catch (e)
    {
        if (e && e.code !== 'INVALID_CMD' && e.statusCode !== 404)
            throw e;
    }
    this.initializing = [];
    this.types = {};
    if (!context.state)
        context.state = Configuration.new('./devicetype-app.json', {});
    else
    {
        let dirty = false;
        if (!context.state.has('store'))
        {
            dirty = true;
            context.state.set('store', {
                "provider": "file+json://./",
                "models": {
                    "DeviceInit": {
                        "members": {
                            "name": {
                                "isKey": true,
                                "type": {
                                    "type": "string",
                                    "length": 250
                                },
                                "generator": "business"
                            },
                            "body": {
                                "isKey": false,
                                "type": {
                                    "type": "string"
                                }
                            }
                        }
                    }
                }
            });

        }
        if (dirty)
            await context.state.commit();
    }
    Object.assign(this, await app<{ DeviceInit: DbSet<{ name: string, body: any }> }>(context, pm));
}