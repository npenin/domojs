import * as devices from "../../../devices.js";
import { Container } from "@akala/commands";
import deviceType from "../../devicetype-commands.js";
import { sidecar, Container as pmContainer } from '@akala/pm';
import app from "@akala/sidecar";
import { DbSet } from "@akala/storage";
import { CliContext } from "@akala/cli";


export default async function (this: devices.DeviceTypeState, context: CliContext, container: Container<any> & deviceType.container, pm: pmContainer & Container<any>)
{
    try
    {
        var webc = await sidecar({ container })['@akala/server'];

        await webc.dispatch('remote-container', '/api/devices/types', require('../../../../devicetype-commands.json'))
    }
    catch (e)
    {
        if (e && e.code !== 'INVALID_CMD' && e.statusCode !== 404)
            throw e;
    }
    this.initializing = [];
    this.types = {};
    Object.assign(this, await app<{ DeviceInit: DbSet<{ name: string, body: any }> }>(context, require.resolve('../../../../devicetype-app.json'), pm));
}