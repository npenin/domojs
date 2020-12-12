import '@akala/server'
import * as devices from "../../../devices";
import { LiveStore, Store } from "../../store";
import "../../store";
import * as akala from '@akala/core'
import { Container, NetSocketAdapter, Processors, proxy, serve } from "@akala/commands";
import { deviceContainer } from "../../..";
import * as web from '@akala/server'
import * as net from 'net'


export default async function (this: { initializing: boolean }, container: Container<any> & deviceContainer, pm: Container<any>, socketPath: string, deviceTypeSocketPath: string, options: any)
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

    if (!deviceTypeSocketPath)
        throw new Error('path to device-type is not defined');
    // this.socketPath = socketPath;
    var deviceTypeSocket = await new Promise<net.Socket>((resolve, reject) =>
    {
        var deviceTypeSocket = net.connect({ path: deviceTypeSocketPath }, function ()
        {
            console.log('connected to ' + deviceTypeSocketPath);
            resolve(deviceTypeSocket)
        }).on('error', reject);
    });

    var deviceTypeContainer = Container.proxy('device-type', new Processors.JsonRpc(Processors.JsonRpc.getConnection(new NetSocketAdapter(deviceTypeSocket), null)) as any);
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


    return await serve(container, options);
}