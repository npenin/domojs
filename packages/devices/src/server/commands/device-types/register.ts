import * as devices from "../../../devices";
import { Container, CommandProxy, Metadata, updateCommands } from "@akala/commands";


export default async function register(this: devices.DeviceTypeCollection, type: devices.DeviceType, self: Container<any>, container: Container<void>)
{
    if (typeof this[type.name] != 'undefined')
        throw new Error(`a device type with name ${type.name} already exists`);
    if (typeof container === 'undefined')
        throw new Error(`no container to be registered`);
    this[type.name] = type;
    updateCommands([
        { name: type + '.save', config: { "": { "inject": ['$params'] } } },
        { name: type + '.exec', config: { "": { "inject": ['$params'] } } }], container.processor, container);
    self.register(type.name, container);
    // self.register(new CommandProxy(container.processor, type.name + '.save'));
    // self.register(new CommandProxy(container.processor, type.name + '.exec'));
}