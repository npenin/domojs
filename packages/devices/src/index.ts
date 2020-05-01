
import { description as deviceType } from './server/devicetype-commands'
import { description as device } from './server/device-commands'

export type deviceTypeContainer = deviceType.devicetype;
export type deviceContainer = device.devices;
import * as devices from './devices';
export { devices }