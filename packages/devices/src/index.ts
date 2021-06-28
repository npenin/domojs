
import deviceTypeContainer from './server/devicetype-commands'
import deviceContainer from './server/device-commands'

import * as devices from './devices';
import { sidecar, SidecarMap } from '@akala/pm';
export { devices, deviceContainer, deviceTypeContainer }

import { Container } from '@akala/commands';

export async function registerDeviceType(deviceType: devices.DeviceType)
{
    var container = await sidecar<SidecarMap>()['@domojs/devicetype'];
    container.dispatch('register', deviceType);
}

declare module '@akala/pm'
{
    interface SidecarMap
    {
        ['@domojs/devices']: Promise<deviceContainer.container & Container<void>>;
        ['@domojs/devicetype']: Promise<deviceTypeContainer.container & Container<void>>;
    }
}