import '@akala/server'
import "../../store.js";
import * as akala from '@akala/core'
import { Container } from "@akala/commands";
import { deviceContainer } from "../../../index.js";
import { Container as pmContainer } from '@akala/pm'
import app, { Sidecar, SidecarConfiguration } from '@akala/sidecar'
import Configuration, { ProxyConfiguration } from '@akala/config'
import { State } from '../index.js';
import { CliContext, OptionType } from '@akala/cli';
import { fileURLToPath } from 'url'

export default async function (this: State, context: CliContext<Record<string, OptionType>, Configuration>, container: Container<any> & deviceContainer.container, pm: Container<any> & pmContainer)
{
    if (!context.state.has('devices'))
        context.state.set('devices', {});
    const sidecar = await app(context, context.state.get<SidecarConfiguration>('devices'), pm);

    container.register('pm', pm);
    var mdule = akala.module('@domojs/devices');

    try
    {
        var webc = await sidecar.sidecars['@akala/server'];
        await webc.dispatch('remote-container', '/api/devices', (await import('../../device-commands.js')).default.meta)

        await webc.dispatch('asset', 'main', fileURLToPath(new URL('../../../client', import.meta.url)))
    }
    catch (e)
    {
        console.warn('no web available');
    }
    const deviceTypeContainer = await sidecar.sidecars['@domojs/devicetype'];

    mdule.register('deviceType', deviceTypeContainer);

    // mdule.readyAsync(['db', 'livedb'], async function (db: Store, livedb: LiveStore)
    // {
    //     this.waitUntil((async () =>
    //     {
    //         var devices = await db.DevicesInit.toArray();
    //         container.register('db', db);
    //         container.register('livedb', livedb);

    //         state.initializing = true;

    //         await akala.eachAsync(devices, async (device) =>
    //         {
    //             await container.dispatch('add', device.type, Promise.resolve(device));
    //         });
    //         state.initializing = false;
    //     })());
    // })
    // mdule.start();
}