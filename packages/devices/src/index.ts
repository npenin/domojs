
import deviceTypeContainer from './server/devicetype-commands.js'
import deviceContainer from './server/device-commands.js'

import * as devices from './devices.js';
import { sidecarSingleton } from '@akala/pm';
import { Container } from '@akala/commands';
export { devices, deviceContainer, deviceTypeContainer }
import { logger } from '@akala/core';


export async function registerDeviceType(container: Container<void>, signal: AbortSignal, ...deviceTypes: devices.DeviceType[])
{
    var deviceType = await sidecarSingleton({ container, preferRemote: false, signal })['@domojs/devicetype'];
    for (var dt of deviceTypes)
        await deviceType.dispatch('register', dt);
}

// declare module '@akala/pm'
// {
//     interface SidecarMap
//     {
//         ['@domojs/devices']: deviceContainer.container;
//         ['@domojs/devicetype']: deviceTypeContainer.container;
//     }
// }



export { Gateway } from './Gateway.js'