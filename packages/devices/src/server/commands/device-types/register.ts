import * as devices from "../../../devices.js";
import { CommandWithProcessorAffinity, Container, ICommandProcessor, Processors, SelfDefinedCommand, updateCommands } from "@akala/commands";
import { ErrorWithStatus, HttpStatusCode, logger } from "@akala/core";
import { sidecar } from "@akala/pm";
import { BinaryOperator } from "@akala/core/expressions";

const log = logger('domojs:devices');

export default async function register(this: devices.DeviceTypeState, type: devices.DeviceType, self: Container<any>, container: Container<void>, processor: Processors.JsonRpc)
{
    if (typeof this[type.name] != 'undefined')
        throw new ErrorWithStatus(HttpStatusCode.Conflict, `a device type with name ${type.name} already exists`);
    if (typeof container === 'undefined')
        throw new ErrorWithStatus(HttpStatusCode.NotFound, `no container to be registered`);
    this.types[type.name] = type;

    container.name = type.name;
    updateCommands([
        { name: 'save', config: { "": { "inject": ['param.0', 'param.1'] } } },
        {
            name: 'exec', config: {
                "": { "inject": ['param.0', 'param.1', 'param.2'] }, "jsonrpc": { inject: ['param.0', 'param.1', 'param.2'] }, "cli": {
                    "usage": "exec <device> <command> [value]",
                    "inject": [
                        "options.device",
                        "options.command",
                        "options.value"
                    ]
                }
            }
        }], processor, container);
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
            devices.sort((a, b) => a.class - b.class);
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