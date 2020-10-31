import '@akala/server'
import * as devices from "../../../devices";
import { Store } from "../../store";
import "../../store";
import * as akala from '@akala/core'
import { Container, serve } from "@akala/commands";
import { deviceContainer } from "../../..";
import * as web from '@akala/server'
import * as net from 'net'


export default async function (this: devices.IDeviceCollection & { initializing: boolean }, container: Container<any> & deviceContainer, pm: Container<any>, socketPath: string, options: any)
{
    container.register('pm', pm);
    var state = this;
    var mdule = akala.module('@domojs/devices');

    console.log(socketPath);
    if (!socketPath)
        throw new Error('path to akala-server is not defined');
    // this.socketPath = socketPath;
    var socket = await new Promise<net.Socket>((resolve, reject) =>
    {
        var socket = net.connect({ path: socketPath }, function ()
        {
            console.log('connected to ' + socketPath);
            resolve(socket)
        }).on('error', reject);
    });
    var webc = web.connect(socket, container);
    await webc.dispatch('remote-container', '/api/devices')

    await webc.dispatch('asset', 'main', require.resolve('../../../client'))

    mdule.readyAsync(['db'], async function (db: Store)
    {
        var devices = await db.Devices.toArray();
        container.register('db', db);
        state.initializing = true;

        await akala.eachAsync(devices, async (device) =>
        {
            await container.dispatch('add', null, device);
        });
        state.initializing = false;
    })
    mdule.start();


    return await serve(container, options);
}