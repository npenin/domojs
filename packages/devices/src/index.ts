
import { description as deviceType } from './server/devicetype-commands'
import { description as device } from './server/device-commands'

export type deviceTypeContainer = deviceType.deviceTypes;
export type deviceContainer = device.devices;
import * as devices from './devices';
import { connect } from '@akala/pm';
export { devices }

import * as ac from '@akala/commands'

export async function registerDeviceType(deviceType: devices.DeviceType)
{
    const { container } = await ac.connectByPreference(await connect('@domojs/devicetype'), { container: require('../devicetype-commands.json') }, 'socket', 'wss', 'ws');
    await (container as deviceType.deviceTypes).dispatch('register', deviceType);
}