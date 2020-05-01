import * as devices from "../../../devices";
import { Container, CommandProxy } from "@akala/commands";


export default function register(this: devices.DeviceTypeCollection, type: devices.DeviceType, self: Container<any>, container: Container<void>)
{
    if (typeof this[type.name] != 'undefined')
        throw new Error(`a device type with name ${type.name} already exists`);
    if (typeof container === 'undefined')
        throw new Error(`no container to be registered`);
    this[type.name] = type;
    self.register(type.name, container);
    // self.register(new CommandProxy(container.processor, type.name + '.save'));
    // self.register(new CommandProxy(container.processor, type.name + '.exec'));
}