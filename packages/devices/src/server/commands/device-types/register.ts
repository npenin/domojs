import * as devices from "../../../devices";
import { CommandWithProcessorAffinity, Container, updateCommands } from "@akala/commands";
import { Local } from "@akala/commands/dist/processors";


export default async function register(this: devices.DeviceTypeCollection, type: devices.DeviceType, self: Container<any>, container: Container<void>)
{
    if (typeof this[type.name] != 'undefined')
        throw new Error(`a device type with name ${type.name} already exists`);
    if (typeof container === 'undefined')
        throw new Error(`no container to be registered`);
    this[type.name] = type;

    updateCommands([
        { name: 'save', "inject": ['$params'], config: { "": { "inject": ['$params'] } } },
        { name: 'exec', "inject": ['$params'], config: { "": { "inject": ['$params'] } } }], container.processor, container);
    self.register(type.name, container);
    container.register({
        name: '$disconnect', processor: new Local({
            '$disconnect': () =>
            {
                delete this[type.name];
                self.unregister(type.name);
            }
        }), config: {}, inject: []
    } as CommandWithProcessorAffinity);
    // self.register(new CommandProxy(container.processor, type.name + '.save'));
    // self.register(new CommandProxy(container.processor, type.name + '.exec'));
}