import * as devices from "../../../devices";
import { CommandWithProcessorAffinity, Container, ICommandProcessor, Processors, SelfDefinedCommand, updateCommands } from "@akala/commands";
import { BinaryOperator, logger } from "@akala/core";
import { sidecar } from "@akala/pm";

const log = logger('domojs:devices');

export default async function register(this: devices.DeviceTypeState, type: devices.DeviceType, self: Container<any>, container: Container<void>, processor: Processors.JsonRpc)
{
    if (typeof this[type.name] != 'undefined')
        throw new Error(`a device type with name ${type.name} already exists`);
    if (typeof container === 'undefined')
        throw new Error(`no container to be registered`);
    this[type.name] = type;

    container.name = type.name;
    updateCommands([
        { name: 'save', "inject": ['$params'], config: { "": { "inject": ['$params'] } } },
        { name: 'exec', "inject": ['$params'], config: { "": { "inject": ['$params'] } } }], processor, container);
    self.register(type.name, container);
    container.register(new SelfDefinedCommand(
        async () =>
        {
            delete this[type.name];
            self.unregister(type.name);
            await this.pm.dispatch('reload-metadata');
        }
        , '$disconnect'));

    log.silly('%s registered with connection %s', type.name, processor.connectionId)
    await this.pm.dispatch('reload-metadata');
    if (this.store)
    {
        try
        {
            this.initializing.push(type.name);
            const devices = await this.store.DeviceInit.where('body.type', BinaryOperator.Equal, type.name).toArray();
            devices.sort((a, b) => a.body.class - b.body.class);
            for await (var device of devices)
            {
                await self.dispatch('add', type.name, Promise.resolve(device.body));
            }
        }
        catch (e)
        {
            console.error(e);
        }
        finally
        {
            this.initializing.splice(this.initializing.indexOf(type.name), 1);
        }
    }
    // self.register(new CommandProxy(container.processor, type.name + '.save'));
    // self.register(new CommandProxy(container.processor, type.name + '.exec'));
}