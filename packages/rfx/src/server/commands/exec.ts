import { State } from "../state";
import { RFXDevice, PacketType, InterfaceControl } from "@domojs/rfx-parsers";
import { Rfy } from "@domojs/rfx-parsers";

export default async function (this: State, deviceName: string, command: string, value: any)
{
    var device = this.devices[deviceName];
    console.log(device);
    if (!device)
        console.log(this.devices);
    let message: RFXDevice;
    switch ((device.type & 0xff00) >> 8 as PacketType)
    {
        case PacketType.RFY:
            message = Object.assign({ command: Rfy.Commands[command] }, device) as RFXDevice;
            break;
        case PacketType.INTERFACE_CONTROL:
            var gw = await device.gateway;
            var modes = gw.modes;
            if (command in InterfaceControl.protocols_msg3)
            {
                if (value)
                    modes.msg3 = modes.msg3 | InterfaceControl.protocols_msg3[command];
                else
                    modes.msg3 = modes.msg3 & ~InterfaceControl.protocols_msg3[command];
            }
            if (command in InterfaceControl.protocols_msg4)
            {
                if (value)
                    modes.msg4 = modes.msg4 | InterfaceControl.protocols_msg4[command];
                else
                    modes.msg4 = modes.msg4 & ~InterfaceControl.protocols_msg4[command];
            }
            if (command in InterfaceControl.protocols_msg5)
            {
                if (value)
                    modes.msg5 = modes.msg5 | InterfaceControl.protocols_msg5[command];
                else
                    modes.msg5 = modes.msg5 & ~InterfaceControl.protocols_msg5[command];
            }
            if (command in InterfaceControl.protocols_msg6)
            {
                if (value)
                    modes.msg6 = modes.msg6 | InterfaceControl.protocols_msg6[command];
                else
                    modes.msg6 = modes.msg6 & ~InterfaceControl.protocols_msg6[command];
            }
            message = Object.assign({ command: InterfaceControl.Commands.setMode }, modes) as RFXDevice;
            break;
    }
    if (message == null)
        throw new Error(`${JSON.stringify({ deviceName, command })} is not supported on ${JSON.stringify(device.type)}`)

    return (await device.gateway).send<RFXDevice>(device.type, message);
}