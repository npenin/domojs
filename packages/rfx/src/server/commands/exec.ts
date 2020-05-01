import { State } from "../state";
import { RFXDevice, PacketType } from "rfxtrx";
import * as rfy from 'rfxtrx/dist/rfy';

export default function (this: State, deviceName: string, command: string, value: any)
{
    var device = this.devices[deviceName];
    let message: RFXDevice;
    switch ((device.type & 0xff00) >> 8 as PacketType)
    {
        case PacketType.RFY:
            message = Object.assign({ command: rfy.Commands[command] }, device) as RFXDevice;
            break;
    }
    if (message == null)
        throw new Error(`${JSON.stringify({ deviceName, command })} is not supported on ${JSON.stringify(device.type)}`)

    return device.gateway.send<RFXDevice>(device.type, message);
}