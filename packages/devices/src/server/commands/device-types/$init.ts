import * as devices from "../../../devices.js";
import { Container } from "@akala/commands";
import { sidecar, Container as pmContainer } from '@akala/pm';
import app from "@akala/sidecar";
import { DbSet } from "@akala/storage";
import { CliContext } from "@akala/cli";
import { fileURLToPath } from 'url'


export default async function (this: devices.DeviceTypeState, context: CliContext, container: Container<unknown>, pm: pmContainer & Container<any>)
{
    debugger;
    try
    {
        var webc = await sidecar({ container, pm })['@akala/server'];

        await webc.dispatch('remote-container', '/api/devices/types', (await import('../../devicetype-commands.js')).default.meta)
    }
    catch (e)
    {
        if (e && e.code !== 'INVALID_CMD' && e.statusCode !== 404)
            throw e;
    }
    this.initializing = [];
    this.types = {};
    Object.assign(this, await app<{ DeviceInit: DbSet<{ name: string, body: any }> }>(context, fileURLToPath(new URL('../../../../devicetype-app.json', import.meta.url)), pm));
}