import * as devices from "../../../devices";
import * as akala from '@akala/core'
import { Container, Command } from "@akala/commands";
import { deviceTypeContainer, deviceContainer } from "../../..";

export default function register(this: devices.IDeviceCollection, device: devices.IDevice, deviceTypeContainer: Container<devices.DeviceTypeCollection> & deviceTypeContainer, deviceContainer: Container<devices.IDeviceCollection> & deviceContainer)
{
    if (typeof this[device.name] != 'undefined')
        throw new Error(`a device with name ${device.name} already exists`);

    var indexOfDot = device.name.indexOf('.');
    if (indexOfDot >= 0)
    {
        var mainName = device.name.substr(0, indexOfDot);
        var mainDevice = this[mainName];
        if (mainDevice && mainDevice.subdevices)
        {
            var subDeviceIndex = mainDevice.subdevices.findIndex(d => d.name == device.name);
            if (!~subDeviceIndex)
                mainDevice.subdevices.push(device);
            else
                mainDevice.subdevices[subDeviceIndex] = akala.extend(mainDevice.subdevices[subDeviceIndex], device);
        }
    }

    this[device.name] = device;

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
                deviceContainer.register(new Command(commands[command].run, device.name + '-' + command));
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

                deviceContainer.register(new Command(commands[name].run, device.name + '-' + name));

            })
            device.commands = commands;
        }
    }
    if (device.subdevices)
    {
        akala.each(device.subdevices, function (item: devices.Device)
        {
            register.call(this, deviceTypeContainer, akala.extend(item, { name: device.name + '.' + item.name, type: item.type || device.type }));
        });
    }
}