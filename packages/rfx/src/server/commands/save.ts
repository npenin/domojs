import { Rfxtrx, PacketType, Rfy, InterfaceControl, TemperatureHumidity } from "@domojs/rfx-parsers";
import { devices } from "@domojs/devices";
import { State } from "../state.js";
import * as net from 'net'
import { punch } from "http-punch-hole";
import { logger } from '@akala/core'
import { Container, Metadata } from "@akala/commands";
import { InteractError } from "@akala/cli";

const log = logger('domojs:rfx')

export default async function save(this: State, body: any, device: devices.IDevice, container: Container<any>): Promise<Metadata.Container>
{
    if (!body)
        return device;
    if (typeof body.rfxType == 'undefined')
        throw new InteractError('please provide an rfxType', 'body.rfxType');
    var type: PacketType = (body.rfxType & 0xff00) >> 8;
    switch (type)
    {
        case PacketType.INTERFACE_CONTROL: //hack to add a gateway
            let p: Promise<Rfxtrx>;
            switch (body.mode)
            {
                case 'http':
                    const socket: net.Socket = await punch(body.path, 'raw')
                    socket.setKeepAlive(true, 60000);
                    const gateway = new Rfxtrx(socket, socket.readyState == "open");
                    async function reopen()
                    {
                        if (gateway.isOpen)
                        {
                            const socket = await punch(body.path, 'raw');
                            socket.on('close', reopen);
                            socket.on('error', e =>
                            {
                                if (e && e['code'] == 'EPIPE')
                                    socket.end();
                            })
                            gateway.replaceClosedSocket(socket, socket.readyState == 'open');
                            await gateway.start()
                        }
                    }
                    socket.on('close', reopen);
                    socket.on('error', e =>
                    {
                        if (e && e['code'] == 'EPIPE')
                            socket.end();
                    })
                    p = Promise.resolve(this.gateways['http://' + body.path] = gateway);
                    break;
                case 'tcp':
                    p = new Promise<Rfxtrx>((resolve, reject) =>
                    {
                        const socket = net.connect(body, async () =>
                        {
                            socket.on('error', e => log.error(e));
                            if (body.path)
                                resolve(this.gateways['tcp://' + body.path] = new Rfxtrx(socket, true));
                            else if (body.host && body.port)
                                resolve(this.gateways['tcp://' + body.host + ':' + body.port] = new Rfxtrx(socket, true));
                            else if (body.host)
                                resolve(this.gateways['tcp://' + body.host] = new Rfxtrx(socket, true));
                            else if (body.port)
                                resolve(this.gateways['tcp://0.0.0.0:' + body.port] = new Rfxtrx(socket, true));
                            else
                                reject(new Error('Invalid socket config'))

                            // this.setGateway(new Rfxtrx(socket, true)).then(resolve, reject);
                        });
                        socket.setKeepAlive(true, 60000);

                    });
                    break;
                case 'usb':
                    this.gateways['usb://' + body.path] = gateway;
                    break;
            }
            this.devices[device.name] = { type: PacketType.INTERFACE_CONTROL, gateway: p };
            device.commands = [
                ...Object.keys(InterfaceControl.protocols_msg3).filter(k => typeof (k) == 'string').map<Metadata.Command>((k: keyof typeof InterfaceControl.protocols_msg3) => ({ name: k, config: { "": { inject: [] }, "@domojs/devicetype": { type: "toggle" } } })),
                ...Object.keys(InterfaceControl.protocols_msg4).filter(k => typeof (k) == 'string').map<Metadata.Command>((k: keyof typeof InterfaceControl.protocols_msg4) => ({ name: k, config: { "": { inject: [] }, "@domojs/devicetype": { type: "toggle" } } })),
                ...Object.keys(InterfaceControl.protocols_msg5).filter(k => typeof (k) == 'string').map<Metadata.Command>((k: keyof typeof InterfaceControl.protocols_msg5) => ({ name: k, config: { "": { inject: [] }, "@domojs/devicetype": { type: "toggle" } } })),
                ...Object.keys(InterfaceControl.protocols_msg6).filter(k => typeof (k) == 'string').map<Metadata.Command>((k: keyof typeof InterfaceControl.protocols_msg6) => ({ name: k, config: { "": { inject: [] }, "@domojs/devicetype": { type: "toggle" } } })),
            ];
            break;
        case PacketType.RFY:
            this.devices[device.name] = { type: body.rfxType, id1: body.id1, id2: body.id2, id3: body.id3, unitCode: body.unitCode, gateway: this.gateways[body.gateway] && this.devices[body.gateway].gateway };
            device.commands = Object.keys(Rfy.Commands).filter(v => isNaN(Number(v))).map(cmd => ({ name: cmd, config: { "": { inject: [] }, "@domojs/devicetype": { type: "toggle" } } }));
            break;
        case PacketType.TEMPERATURE_HUMIDITY:
            this.devices[device.name] = { type: body.rfxType, id: body.rfxType, gateway: this.devices[body.gateway] && this.devices[body.gateway].gateway };
            device.subdevices = [
                { room: body.room, class: devices.DeviceClass.SingleValueSensor, type: body.rfxType, name: 'temperature', commands: [], statusMethod: 'push', statusUnit: '°C' },
                { room: body.room, class: devices.DeviceClass.SingleValueSensor, type: body.rfxType, name: 'humidity', commands: [], statusMethod: 'push', statusUnit: '%' },
                { room: body.room, class: devices.DeviceClass.SingleValueSensor, type: body.rfxType, name: 'battery', commands: [], statusMethod: 'push', statusUnit: '%' },
                { room: body.room, class: devices.DeviceClass.SingleValueSensor, type: body.rfxType, name: 'signal', commands: [], statusMethod: 'push', statusUnit: '%' },
            ];

            (await this.devices[device.name].gateway).on('TEMPERATURE_HUMIDITY', (state: TemperatureHumidity.Device) =>
            {
                container.dispatch('pushStatus', { device: device.name + '.temperature', state: state.temperature / 10 })
                if (state.humidity !== 0)
                    container.dispatch('pushStatus', { device: device.name + '.humidity', state: state.humidity })
                container.dispatch('pushStatus', { device: device.name + '.battery', state: state.batteryLevel * 6.25 })
                container.dispatch('pushStatus', { device: device.name + '.signal', state: state.rssi * 6.25 })
            })
            break;
        case PacketType.ENERGY:
            this.devices[device.name] = { type: body.rfxType, sensorId: body.sensorId, gateway: this.devices[body.gateway] && this.devices[body.gateway].gateway };
            device.subdevices = [
                { room: body.room, class: devices.DeviceClass.SingleValueSensor, type: body.rfxType, name: 'instant', commands: [], statusMethod: 'push', statusUnit: 'W' },
                { room: body.room, class: devices.DeviceClass.SingleValueSensor, type: body.rfxType, name: 'total', commands: [], statusMethod: 'push', statusUnit: 'Wh' },
                { room: body.room, class: devices.DeviceClass.SingleValueSensor, type: body.rfxType, name: 'battery', commands: [], statusMethod: 'push', statusUnit: '%' },
                { room: body.room, class: devices.DeviceClass.SingleValueSensor, type: body.rfxType, name: 'signal', commands: [], statusMethod: 'push', statusUnit: '%' },
            ];
            (await this.devices[device.name].gateway).on('ENERGY', state =>
            {
                container.dispatch('pushStatus', { device: device.name + '.instant', state: state.instant })
                if (!state.count)
                    container.dispatch('pushStatus', { device: device.name + '.total', state: state.total / 223.666 })
                container.dispatch('pushStatus', { device: device.name + '.battery', state: state.batteryLevel * 6.25 })
                container.dispatch('pushStatus', { device: device.name + '.signal', state: state.rssi * 6.25 })
            })
            break;
        case PacketType.CURRENT_ENERGY:
            this.devices[device.name] = { type: body.rfxType, sensorId: body.sensorId, gateway: this.devices[body.gateway] && this.devices[body.gateway].gateway };
            device.subdevices = [
                { room: body.room, class: devices.DeviceClass.SingleValueSensor, type: body.rfxType, name: 'channel1', commands: [], statusMethod: 'push', statusUnit: 'A' },
                { room: body.room, class: devices.DeviceClass.SingleValueSensor, type: body.rfxType, name: 'channel2', commands: [], statusMethod: 'push', statusUnit: 'A' },
                { room: body.room, class: devices.DeviceClass.SingleValueSensor, type: body.rfxType, name: 'channel3', commands: [], statusMethod: 'push', statusUnit: 'A' },
                { room: body.room, class: devices.DeviceClass.SingleValueSensor, type: body.rfxType, name: 'battery', commands: [], statusMethod: 'push', statusUnit: '%' },
                { room: body.room, class: devices.DeviceClass.SingleValueSensor, type: body.rfxType, name: 'signal', commands: [], statusMethod: 'push', statusUnit: '%' },
            ];
            (await this.devices[device.name].gateway).on('CURRENT_ENERGY', state =>
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
    return device;
}