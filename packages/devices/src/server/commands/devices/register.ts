import * as devices from "../../../devices";
import * as akala from '@akala/core'
import { Container, SelfDefinedCommand } from "@akala/commands";
import { deviceTypeContainer, deviceContainer } from "../../..";
import { LiveStore } from "../../store";
import { expressions } from "@akala/storage";
import { BinaryOperator } from "@akala/core";

export default async function register(db: LiveStore, deviceTypeContainer: Container<devices.DeviceTypeCollection> & deviceTypeContainer.container, deviceContainer: Container<devices.IDeviceCollection> & deviceContainer.container, device: devices.IDevice)
{
    console.log(arguments);
    if (await db.Devices.where('name', BinaryOperator.Equal, device.name).any())
        throw new Error(`a device with name ${device.name} already exists`);

    var indexOfDot = device.name.indexOf('.');
    if (indexOfDot >= 0)
    {
        var mainName = device.name.substr(0, indexOfDot);
        var mainDevice = await db.Devices.where('name', BinaryOperator.Equal, mainName).firstOrDefault();
        if (mainDevice && mainDevice.subdevices)
        {
            var subDeviceIndex = mainDevice.subdevices.findIndex(d => d.name == device.name);
            if (!~subDeviceIndex)
                mainDevice.subdevices.push(device);
            else
                mainDevice.subdevices[subDeviceIndex] = akala.extend(mainDevice.subdevices[subDeviceIndex], device);
        }
    }

    await db.Devices.createSingle(device);

    if (device.statusMethod !== 'push')
    {
        deviceTypeContainer.dispatch('status', device);
        if (typeof device.statusMethod == 'number')
            setInterval(() => deviceTypeContainer.dispatch('status', device), device.statusMethod);
    }

    if (device.commands)
    {
        var commands: { [key: string]: devices.RunnableCommandDescription } = {};
        if (Array.isArray(device.commands))
        {
            akala.each(device.commands, function (command)
            {
                commands[command] = {
                    type: 'button',
                    run: function (value)
                    {
                        return deviceTypeContainer.dispatch(device.type + '.exec', device.name, command, value);
                    }
                };
                deviceContainer.register(new SelfDefinedCommand(commands[command].run, device.name + '-' + command));
            })
            device.commands = commands;
        }
        else
        {
            akala.each(device.commands, function (command: devices.Command, name)
            {
                if (typeof (command) == 'function')
                {
                    commands[name] = {
                        type: 'button',
                        run: command
                    };
                }
                else if (typeof (command) == 'string')
                    commands[name] = {
                        type: 'button',
                        run: function (value)
                        {
                            return deviceTypeContainer.dispatch(device.type + '.exec', device.name, name, value);
                        }
                    };
                else
                {
                    commands[name] = akala.extend(command, {
                        run: function (value)
                        {
                            switch (command.type)
                            {
                                case 'range':
                                    if (value < command.min || value > command.max)
                                        throw new Error('Value (' + value + ') is out of bounds (' + command.min + ', ' + command.max + ')');
                                    break;
                                case 'input':
                                    if (typeof (value) == 'number' || command.values.indexOf(value) == -1)
                                        throw new Error('Value (' + value + ') is not accepted (' + command.values.join(', ') + ')');
                                    break;
                            }
                            return deviceTypeContainer.dispatch(device.type + '.exec', device.name, name, value);
                        }
                    });
                }

                deviceContainer.register(new SelfDefinedCommand(commands[name].run, device.name + '-' + name));

            })
            device.commands = commands;
        }
    }
    if (device.subdevices)
    {
        await akala.eachAsync(device.subdevices, (item: devices.Device) =>
        {
            return register(db, deviceTypeContainer, deviceContainer, akala.extend(item, { name: device.name + '.' + item.name, type: item.type || device.type }));
        }, false);
    }
}