import { Rfxtrx, PacketType } from "rfxtrx";
import { devices } from "@domojs/devices";
import { Rfy } from 'rfxtrx';
import { State } from "../state";
import * as ac from '@akala/commands'

export default async function save(this: State, body: any, device: devices.IDevice, container: ac.Container<any>)
{
    if (!body)
        return device;
    var type: PacketType = (body.rfxType & 0xff00) >> 8;
    var gateway = await this.gateway;
    switch (type)
    {
        case PacketType.RFY:
            this.devices[device.name] = { type: body.rfxType, id1: body.id1, id2: body.id2, id3: body.id3, unitCode: body.unitCode, gateway };
            device.commands = Object.keys(Rfy.Commands).filter(v => isNaN(Number(v)));
            break;
        case PacketType.TEMPERATURE_HUMIDITY:
            this.devices[device.name] = { type: body.rfxType, id: body.rfxType, gateway };
            device.subdevices = [
                { room: body.room, type: body.rfxType, name: 'temperature', commands: [], statusMethod: 'push', statusUnit: '°C' },
                { room: body.room, type: body.rfxType, name: 'humidity', commands: [], statusMethod: 'push', statusUnit: '%' },
                { room: body.room, type: body.rfxType, name: 'battery', commands: [], statusMethod: 'push', statusUnit: '%' },
                { room: body.room, type: body.rfxType, name: 'signal', commands: [], statusMethod: 'push', statusUnit: '%' },
            ];

            gateway.on('TEMPERATURE_HUMIDITY', state =>
            {
                container.dispatch('pushStatus', { device: device.name + '.temperature', state: state.temperature / 10 })
                if (state.humidity !== 0)
                    container.dispatch('pushStatus', { device: device.name + '.humidity', state: state.humidity })
                container.dispatch('pushStatus', { device: device.name + '.battery', state: state.batteryLevel * 6.25 })
                container.dispatch('pushStatus', { device: device.name + '.signal', state: state.rssi * 6.25 })
            })
            break;
        case PacketType.ENERGY:
            this.devices[device.name] = { type: body.rfxType, sensorId: body.sensorId, gateway };
            device.subdevices = [
                { room: body.room, type: body.rfxType, name: 'instant', commands: [], statusMethod: 'push', statusUnit: 'W' },
                { room: body.room, type: body.rfxType, name: 'total', commands: [], statusMethod: 'push', statusUnit: 'Wh' },
                { room: body.room, type: body.rfxType, name: 'battery', commands: [], statusMethod: 'push', statusUnit: '%' },
                { room: body.room, type: body.rfxType, name: 'signal', commands: [], statusMethod: 'push', statusUnit: '%' },
            ];
            gateway.on('ENERGY', state =>
            {
                container.dispatch('pushStatus', { device: device.name + '.instant', state: state.instant })
                if (!state.count)
                    container.dispatch('pushStatus', { device: device.name + '.total', state: state.total / 223.666 })
                container.dispatch('pushStatus', { device: device.name + '.battery', state: state.batteryLevel * 6.25 })
                container.dispatch('pushStatus', { device: device.name + '.signal', state: state.rssi * 6.25 })
            })
            break;
        case PacketType.CURRENT_ENERGY:
            this.devices[device.name] = { type: body.rfxType, sensorId: body.sensorId, gateway };
            device.subdevices = [
                { room: body.room, type: body.rfxType, name: 'channel1', commands: [], statusMethod: 'push', statusUnit: 'A' },
                { room: body.room, type: body.rfxType, name: 'channel2', commands: [], statusMethod: 'push', statusUnit: 'A' },
                { room: body.room, type: body.rfxType, name: 'channel3', commands: [], statusMethod: 'push', statusUnit: 'A' },
                { room: body.room, type: body.rfxType, name: 'battery', commands: [], statusMethod: 'push', statusUnit: '%' },
                { room: body.room, type: body.rfxType, name: 'signal', commands: [], statusMethod: 'push', statusUnit: '%' },
            ];
            gateway.on('CURRENT_ENERGY', state =>
            {
                container.dispatch('pushStatus', { device: device.name + '.channel1', state: state.channel1 })
                container.dispatch('pushStatus', { device: device.name + '.channel2', state: state.channel2 })
                container.dispatch('pushStatus', { device: device.name + '.channel3', state: state.channel3 })
                container.dispatch('pushStatus', { device: device.name + '.battery', state: state.batteryLevel * 6.25 })
                container.dispatch('pushStatus', { device: device.name + '.signal', state: state.rssi * 6.25 })
            })
            break;
        default:
            console.error(`rfx: ${type} (${body.rfxType}) is not supported`);
            throw new Error(`${type} (${body.rfxType}) is not supported`);
    }
    body.gateway = gateway;
    return device;
}