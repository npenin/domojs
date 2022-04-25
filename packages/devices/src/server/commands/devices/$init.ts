import '@akala/server'
import { LiveStore, Store } from "../../store";
import "../../store";
import * as akala from '@akala/core'
import { Container } from "@akala/commands";
import { deviceContainer } from "../../..";
import { Container as pmContainer } from '@akala/pm'
import app, { Sidecar } from '@akala/sidecar'
import Configuration from '@akala/config'
import { State } from '..';

export default async function (this: State, config: Configuration, container: Container<any> & deviceContainer.container, pm: Container<any> & pmContainer)
{
    const context = await app(akala.logger('domojs:devices', akala.LogLevels.warn), config, pm);
    container.register('pm', pm);
    var state = this;
    var mdule = akala.module('@domojs/devices');

    try
    {
        var webc = await context.sidecars['@akala/server'];
        await webc.dispatch('remote-container', '/api/devices', require('../../../../device-commands.json'))

        await webc.dispatch('asset', 'main', require.resolve('../../../client'))
    }
    catch (e)
    {
        console.warn('no web available');
    }
    const deviceTypeContainer = await context.sidecars['@domojs/devicetype'];

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