import { Rfxtrx, PacketType } from "rfxtrx";
import { devices } from "@domojs/devices";
import { Http } from '@akala/core';
import { State } from "../state";
import * as ac from '@akala/commands'
import * as api from '../api'
import { Socket } from 'net'
import { Container } from "@akala/commands";
import { ISCPProcessor } from "../iscp-processor";


const deviceCollection: { [name: string]: devices.IDevice } = {};

export function getMainDevice(name)
{
    var indexOfDot = name.indexOf('.');
    if (indexOfDot > 0)
        var mainDevice = name.substr(0, indexOfDot);
    else
        var mainDevice = name;

    return deviceCollection[mainDevice];
}

export default async function save(this: State, body: any, device: devices.IDevice, container: ac.Container<any>)
{
    if (device.name.indexOf('.') > -1)
        return device;
    var socket = new Socket();

    this.collection[device.name] = new Container('iscp-' + device.name, {}, new ISCPProcessor(socket, (message) =>
    {
        switch (message.command)
        {
            case 'PWR':
                this.collection[device.name].state.power = message.arg == '00';
                break;
            default:
                this.collection[device.name].state[message.command] = message.arg;
        }
    }));

    socket.connect({ host: body.IP || device.name, port: body.port || 60128 });
    device.statusMethod = 'push';
    device.subdevices = [
        {
            name: "power",
            type: 'iscp',
            category: 'switch',
            classes: ['power', 'switch'],
            statusMethod: 'pull',
            status: function ()
            {
                return api.send('?P', device.name).then(function (result)
                {
                    console.log('result:' + result);
                    if (result)
                        result = result.trim();
                    return { state: result == 'PWR0', color: result == 'PWR0' ? 'green' : 'red' };
                });
            },
            commands: ['on', 'off']
        },
        {
            name: "mute",
            type: 'iscp',
            category: 'switch',
            statusMethod: 'pull',
            status: function ()
            {
                console.log('mute status');
                return api.send('?M', device.name).then((result) =>
                {
                    console.log(result);
                    return { state: result == 'MUT0', color: result == 'MUT0' ? 'green' : 'red' };
                });
            },
            commands: ['on', 'off']
        },
        {
            name: "volume",
            type: 'iscp',
            category: 'input',
            statusMethod: 'pull',
            status: function ()
            {
                var status = {};
                return api.send('?V', device.name).then(function (result)
                {
                    return { state: Number(/\d+/.exec(result)) * 100 / 185 };
                });
            },
            commands: ['up', 'down', 'set']
        },
        {
            name: "input",
            type: 'iscp',
            category: 'values',
            statusMethod: 'pull',
            status: function ()
            {
                return api.send('?FN', device.name).then(function (result)
                {
                    console.log(result);
                    switch (Number(/[0-9]+/.exec(result)))
                    {
                        case 49:
                            return { state: 'Game' };
                        case 25:
                            return { state: 'BD' };
                        case 4:
                            return { state: 'Dvd' };
                        case 6:
                            return { state: 'Sat/Cbl' };
                        case 15:
                            return { state: 'Dvr/Bdr' };
                        case 17:
                            return { state: 'iPod' };
                        case 10:
                            return { state: 'Video' };
                        default:
                            return null;
                    }
                });
            },
            commands: ['Game', 'Dvd', 'Sat/Cbl', 'Dvr/Bdr', 'iPod', 'Video', 'BD']
        }
    ]
    return device;
}