import { Rfxtrx, PacketType, Rfy, InterfaceControl } from "@domojs/rfx-parsers";
import { devices } from "@domojs/devices";
import { State } from "../state";
import * as ac from '@akala/commands'
import * as pm from '@akala/pm'
import * as http from 'http'
import * as https from 'https'
import * as net from 'net'


export default async function save(this: State, body: any, device: devices.IDevice, container: ac.Container<any>)
{
    if (!body)
        return device;
    if (typeof body.rfxType == 'undefined')
        throw new pm.InteractError('please provide an rfxType', 'body.rfxType');
    var type: PacketType = (body.rfxType & 0xff00) >> 8;
    if (type !== PacketType.INTERFACE_CONTROL)
        var gateway = await this.gateway;
    switch (type)
    {
        case PacketType.INTERFACE_CONTROL: //hack to add a gateway
            let p: Promise<Rfxtrx>;
            switch (body.mode)
            {
                case 'http':
                    const url = new URL(body.path);
                    let req: http.ClientRequest;
                    switch (url.protocol)
                    {
                        case 'http':
                            p = new Promise<Rfxtrx>((resolve, reject) =>
                            {
                                req = http.request(url, { headers: { connection: 'Upgrade', upgrade: 'raw' } }, async res =>
                                {
                                    if (res.statusCode == 101)
                                    {
                                        const socket = res.socket;
                                        socket.once('error', reject);
                                        this.setGateway(new Rfxtrx(socket)).then(resolve, reject);
                                    }
                                    else
                                    {
                                        res.socket.end();
                                        reject(new Error(`unable to connect over http: ${res.statusCode} ${res.statusMessage}`));
                                    }
                                });
                            });
                            break;
                        case 'https':
                            p = new Promise<Rfxtrx>((resolve, reject) =>
                            {
                                req = https.request(url, { headers: { connection: 'Upgrade', upgrade: 'raw' } }, async res =>
                                {
                                    if (res.statusCode == 101)
                                    {
                                        const socket = res.socket;
                                        socket.once('error', reject);
                                        this.setGateway(new Rfxtrx(socket)).then(resolve, reject);
                                    }
                                    else
                                    {
                                        res.socket.end();
                                        reject(new Error(`unable to connect over http: ${res.statusCode} ${res.statusMessage}`));
                                    }
                                });
                            });
                            break;
                    }
                    req.flushHeaders();
                    break;
                case 'tcp':
                    p = new Promise<Rfxtrx>((resolve, reject) =>
                    {
                        const socket = net.connect(body, async () =>
                        {
                            this.setGateway(new Rfxtrx(socket)).then(resolve, reject);
                        });
                    });
                    break;
                case 'usb':
                    p = this.setGateway(await Rfxtrx.getSerial(body.path));
                    break;
            }
            gateway = await p;
            this.devices[device.name] = { type: PacketType.INTERFACE_CONTROL, gateway };
            device.commands = Object.fromEntries([
                ...Object.keys(InterfaceControl.protocols_msg3).filter(k => typeof (k) == 'string').map<[string, devices.Command]>((k: keyof InterfaceControl.protocols_msg3) => [k, { type: "toggle" }]),
                ...Object.keys(InterfaceControl.protocols_msg4).filter(k => typeof (k) == 'string').map<[string, devices.Command]>((k: keyof InterfaceControl.protocols_msg4) => [k, { type: "toggle" }]),
                ...Object.keys(InterfaceControl.protocols_msg5).filter(k => typeof (k) == 'string').map<[string, devices.Command]>((k: keyof InterfaceControl.protocols_msg5) => [k, { type: "toggle" }]),
                ...Object.keys(InterfaceControl.protocols_msg6).filter(k => typeof (k) == 'string').map<[string, devices.Command]>((k: keyof InterfaceControl.protocols_msg6) => [k, { type: "toggle" }]),
            ]);
            break;
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