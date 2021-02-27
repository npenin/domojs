
import { description as deviceType } from './server/devicetype-commands'
import { description as device } from './server/device-commands'

export type deviceTypeContainer = deviceType.deviceTypes;
export type deviceContainer = device.devices;
import * as devices from './devices';
import { connect, sidecar, SidecarMap } from '@akala/pm';
export { devices }

import * as ac from '@akala/commands'

export async function registerDeviceType(deviceType: devices.DeviceType)
{
    var container = await sidecar<{ deviceTypeContainer: deviceTypeContainer } & SidecarMap>().deviceTypeContainer;
    container.dispatch('register', deviceType);
}