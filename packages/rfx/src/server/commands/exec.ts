import { State } from "../state.js";
import { RFXDevice, PacketType, InterfaceControl, Type } from "@domojs/rfx-parsers";
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
            var gw = this.gateways[device.gateway];
            switch (command)
            {
                case InterfaceControl.Commands[InterfaceControl.Commands.reset]:
                    break;
                case InterfaceControl.Commands[InterfaceControl.Commands.save]:
                case InterfaceControl.Commands[InterfaceControl.Commands.status]:
                    message = Object.assign({ command: InterfaceControl.Commands[command] }, device) as RFXDevice;
                    break;
                case InterfaceControl.Commands[InterfaceControl.Commands.setMode]:
                    const modes = gw.modes;
                    if (typeof value !== 'string')
                        throw new Error('Invalid value');
                    const protocol = value.substring(1);
                    if (protocol in InterfaceControl.protocols_msg3)
                    {
                        if (value[0] == '+')
                            modes.msg3 = modes.msg3 | InterfaceControl.protocols_msg3[protocol];
                        else if (value[0] == '-')
                            modes.msg3 = modes.msg3 & ~InterfaceControl.protocols_msg3[protocol];
                    }
                    if (protocol in InterfaceControl.protocols_msg4)
                    {
                        if (value[0] == '+')
                            modes.msg4 = modes.msg4 | InterfaceControl.protocols_msg4[protocol];
                        else if (value[0] == '-')
                            modes.msg4 = modes.msg4 & ~InterfaceControl.protocols_msg4[protocol];
                    }
                    if (protocol in InterfaceControl.protocols_msg5)
                    {
                        if (value[0] == '+')
                            modes.msg5 = modes.msg5 | InterfaceControl.protocols_msg5[protocol];
                        else if (value[0] == '-')
                            modes.msg5 = modes.msg5 & ~InterfaceControl.protocols_msg5[protocol];
                    }
                    if (protocol in InterfaceControl.protocols_msg6)
                    {
                        if (value[0] == '+')
                            modes.msg6 = modes.msg6 | InterfaceControl.protocols_msg6[protocol];
                        else if (value[0] == '-')
                            modes.msg6 = modes.msg6 & ~InterfaceControl.protocols_msg6[protocol];
                    }
                    return this.gateways[device.gateway].setModes(modes);
            }
            break;
    }
    if (message == null)
        throw new Error(`${JSON.stringify({ deviceName, command })} is not supported on ${JSON.stringify(device.type)}`)

    return this.gateways[device.gateway].send<RFXDevice>(device.type, message);
}