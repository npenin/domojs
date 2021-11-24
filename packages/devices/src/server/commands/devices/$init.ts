import '@akala/server'
import * as devices from "../../../devices";
import { LiveStore, Store } from "../../store";
import "../../store";
import * as akala from '@akala/core'
import { connectByPreference, Container, NetSocketAdapter, Processors, proxy, serve, ServeMetadata } from "@akala/commands";
import { deviceContainer, deviceTypeContainer } from "../../..";
import * as web from '@akala/server'
import * as net from 'net'
import { connect, Container as pmContainer, sidecar, SidecarMap } from '@akala/pm'

export default async function (this: { initializing: boolean }, container: Container<any> & deviceContainer.container, pm: Container<any> & pmContainer)
{
    container.register('pm', pm);
    var state = this;
    var mdule = akala.module('@domojs/devices');

    var sidecars = sidecar();
    try
    {
        var webc = await sidecars['@akala/server'];
        await webc.dispatch('remote-container', '/api/devices', require('../../../../device-commands.json'))

        await webc.dispatch('asset', 'main', require.resolve('../../../client'))
    }
    catch (e)
    {
        console.warn('no web available');
    }
    const deviceTypeContainer = await sidecars['@domojs/devicetype'];

    mdule.register('deviceType', deviceTypeContainer);

    mdule.readyAsync(['db', 'livedb'], async function (db: Store, livedb: LiveStore)
    {
        this.waitUntil((async () =>
        {
            var devices = await db.DevicesInit.toArray();
            container.register('db', db);
            container.register('livedb', livedb);
            state.initializing = true;

            await akala.eachAsync(devices, async (device) =>
            {
                await container.dispatch('add', device.type, Promise.resolve(device));
            });
            state.initializing = false;
        })());
    })
    mdule.start();
}