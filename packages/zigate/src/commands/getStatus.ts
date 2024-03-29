import { State, ZDevices } from "../state.js";

export default async function (this: State, deviceName: string)
{
    var device = this.devices[deviceName];
    switch (device.type)
    {
        case 'device':
            return device.attributes;
        case 'gateway':
        default:
            return null;
    }
}