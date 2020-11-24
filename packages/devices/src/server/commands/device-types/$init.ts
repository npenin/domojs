import '@akala/server'
import * as devices from "../../../devices";
import { Container, serve } from "@akala/commands";
import { deviceTypeContainer } from "../../..";
import * as web from '@akala/server'
import * as net from 'net'


export default async function (this: devices.DeviceTypeCollection & { initializing: boolean }, container: Container<any> & deviceTypeContainer, pm: Container<any>, socketPath: string, options: any)
{
    container.register('pm', pm);

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
    await webc.dispatch('remote-container', '/api/devices/types')

    return await serve(container, options);
}