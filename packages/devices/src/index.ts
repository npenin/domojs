
import deviceTypeContainer from './server/devicetype-commands'
import deviceContainer from './server/device-commands'

import * as devices from './devices';
import { sidecarSingleton } from '@akala/pm';
import { Container } from '@akala/commands';
export { devices, deviceContainer, deviceTypeContainer }


export async function registerDeviceType(container: Container<void>, ...deviceTypes: devices.DeviceType[])
{
    var deviceType = await sidecarSingleton({ container })['@domojs/devicetype'];
    for (var dt of deviceTypes)
        await deviceType.dispatch('register', dt);
}

declare module '@akala/pm'
{
    interface SidecarMap
    {
        ['@domojs/devices']: deviceContainer.container;
        ['@domojs/devicetype']: deviceTypeContainer.container;
    }
}