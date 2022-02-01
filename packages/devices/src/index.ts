
import deviceTypeContainer from './server/devicetype-commands'
import deviceContainer from './server/device-commands'

import * as devices from './devices';
import { sidecar } from '@akala/pm';
export { devices, deviceContainer, deviceTypeContainer }


export async function registerDeviceType(deviceType: devices.DeviceType)
{
    var container = await sidecar()['@domojs/devicetype'];
    await container.dispatch('register', deviceType);
}

declare module '@akala/pm'
{
    interface SidecarMap
    {
        ['@domojs/devices']: deviceContainer.container;
        ['@domojs/devicetype']: deviceTypeContainer.container;
    }
}