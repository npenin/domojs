import { Rfxtrx, PacketType, Rfy, InterfaceControl, TemperatureHumidity, Type } from "@domojs/rfx-parsers";
import { State } from "../state.js";
import * as net from 'net'
import { punch } from "http-punch-hole";
import { convertToMiddleware, logger } from '@akala/core'
import { Container, ICommandProcessor, Metadata } from "@akala/commands";
import { InteractError } from "@akala/cli";
import { CommandDescription, DeviceClass, IDevice, ISaveDevice } from '@domojs/devices'

const log = logger('domojs:rfx')

declare module '@akala/commands'
{
    interface ConfigurationMap
    {
        '@domojs/rfx': { cmd: number };
        '@domojs/devicetype': CommandDescription
    }
}

export default async function save(this: State, body: any, device: ISaveDevice & Partial<IDevice>, remote: Container<any>, self: Container<any>): Promise<IDevice>
{
    if (!body)
        return device as IDevice;
    if (typeof body.rfxType == 'undefined')
        throw new InteractError('please provide an rfxType', 'body.rfxType');
    var type: PacketType = (body.rfxType & 0xff00) >> 8;
    let gatewayUri: string;
    if (type !== PacketType.INTERFACE_CONTROL)
    {
        if (typeof body.gateway == 'undefined')
            throw new InteractError('please provide a gateway to use for this device', 'body.gateway');
        gatewayUri = new URL(body.gateway).toString();
    }
    let processor: ICommandProcessor;

    switch (type)
    {
        case PacketType.INTERFACE_CONTROL: //hack to add a gateway
            let gateway: Rfxtrx;
            switch (body.mode)
            {
                case 'http':
                    const socket: net.Socket = await punch(body.path, 'raw')
                    socket.setKeepAlive(true, 60000);
                    gateway = new Rfxtrx(socket, socket.readyState == "open");
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
                    gatewayUri = 'http://' + body.path;
                    break;
                case 'tcp':
                    if (body.path)
                        gatewayUri = 'tcp://' + body.path;
                    else if (body.host && body.port)
                        gatewayUri = 'tcp://' + body.host + ':' + body.port;
                    // resolve(this.gateways['tcp://' + body.host + ':' + body.port] = new Rfxtrx(socket, true));
                    else if (body.host)
                        gatewayUri = 'tcp://' + body.host;
                    // resolve(this.gateways['tcp://' + body.host] = new Rfxtrx(socket, true));
                    else if (body.port)
                        gatewayUri = 'tcp://0.0.0.0' + body.port;
                    // resolve(this.gateways['tcp://0.0.0.0:' + body.port] = new Rfxtrx(socket, true));
                    else
                        throw new Error('Invalid socket config');

                    gateway = new Rfxtrx(net.connect(body as net.TcpNetConnectOpts).setKeepAlive(true, 60000), true)
                    break;
                case 'usb':
                    gatewayUri = 'usb://' + body.path;
                    if (!this.gateways[gatewayUri])
                        gateway = await Rfxtrx.getSerial(body.path);
                    break;
            }
            if (!gateway)
                gateway = this.gateways[gatewayUri]
            else
                this.gateways[gatewayUri] = gateway;

            this.devices[device.name] = { type: PacketType.INTERFACE_CONTROL, gateway: gatewayUri };
            device.class = DeviceClass.Gateway;
            device.commands = [
                { name: 'status', config: { "": { inject: [] }, "@domojs/devicetype": { type: "button" }, "@domojs/rfx": { cmd: InterfaceControl.Commands.status } } },
                { name: 'save', config: { "": { inject: [] }, "@domojs/devicetype": { type: "button" }, "@domojs/rfx": { cmd: InterfaceControl.Commands.save } } },
                {
                    name: 'setMode', config: {
                        "": { inject: ["param.0"] },
                        "@domojs/devicetype": {
                            type: 'input', values: [].concat(
                                Object.keys(InterfaceControl.protocols_msg3).filter(k => typeof (k) == 'string').map(v => '+' + v),
                                Object.keys(InterfaceControl.protocols_msg3).filter(k => typeof (k) == 'string').map(v => '-' + v),
                                Object.keys(InterfaceControl.protocols_msg4).filter(k => typeof (k) == 'string').map(v => '+' + v),
                                Object.keys(InterfaceControl.protocols_msg4).filter(k => typeof (k) == 'string').map(v => '-' + v),
                                Object.keys(InterfaceControl.protocols_msg5).filter(k => typeof (k) == 'string').map(v => '+' + v),
                                Object.keys(InterfaceControl.protocols_msg5).filter(k => typeof (k) == 'string').map(v => '-' + v),
                                Object.keys(InterfaceControl.protocols_msg6).filter(k => typeof (k) == 'string').map(v => '+' + v),
                                Object.keys(InterfaceControl.protocols_msg6).filter(k => typeof (k) == 'string').map(v => '-' + v),
                            )
                        },
                        "@domojs/rfx": { cmd: InterfaceControl.Commands.setMode }
                    }
                }
            ];
            processor = convertToMiddleware((origin, cmd, param) =>
            {
                if (cmd.name == 'setMode')
                {
                    const value = param.param[0];
                    const modes = gateway.modes;
                    if (typeof value !== 'string')
                        throw new Error('Invalid value');
                    const protocol = value.substring(1);
                    if (protocol in InterfaceControl.protocols_msg3)
                    {
                        if (value[0] == '+')
                            modes.msg3 = modes.msg3 | InterfaceControl.protocols_msg3[protocol];
                        else if (value[0] == '-')
                            modes.msg3 = modes.msg3 & ~InterfaceControl.protocols_msg3[protocol];
                    }
                    if (protocol in InterfaceControl.protocols_msg4)
                    {
                        if (value[0] == '+')
                            modes.msg4 = modes.msg4 | InterfaceControl.protocols_msg4[protocol];
                        else if (value[0] == '-')
                            modes.msg4 = modes.msg4 & ~InterfaceControl.protocols_msg4[protocol];
                    }
                    if (protocol in InterfaceControl.protocols_msg5)
                    {
                        if (value[0] == '+')
                            modes.msg5 = modes.msg5 | InterfaceControl.protocols_msg5[protocol];
                        else if (value[0] == '-')
                            modes.msg5 = modes.msg5 & ~InterfaceControl.protocols_msg5[protocol];
                    }
                    if (protocol in InterfaceControl.protocols_msg6)
                    {
                        if (value[0] == '+')
                            modes.msg6 = modes.msg6 | InterfaceControl.protocols_msg6[protocol];
                        else if (value[0] == '-')
                            modes.msg6 = modes.msg6 & ~InterfaceControl.protocols_msg6[protocol];
                    }
                    return gateway.setModes(modes);
                }
                else
                    return gateway.send(PacketType.INTERFACE_CONTROL, { command: cmd.config['@domojs/rfx'].cmd })
            });

            break;
        case PacketType.RFY:
            this.devices[device.name] = { type: body.rfxType, id1: body.id1, id2: body.id2, id3: body.id3, unitCode: body.unitCode, gateway: body.gateway };
            device.commands = Object.keys(Rfy.Commands).filter(v => isNaN(Number(v))).map(cmd => ({ name: cmd, config: { "": { inject: [] }, "@domojs/devicetype": { type: "toggle" }, "@domojs/rfx": { cmd: Rfy.Commands[cmd] } } }));
            device.class = DeviceClass.Shutter;
            processor = convertToMiddleware((origin, cmd, param) =>
            {
                return this.gateways[body.gateway].send(body.rfxType as Type.RFY, { command: cmd.config["@domojs/rfx"].cmd, id1: body.id1, id2: body.id2, id3: body.id3, unitCode: body.unitCode });
            })
            break;
        case PacketType.TEMPERATURE_HUMIDITY:
            this.devices[device.name] = { type: body.rfxType, id: body.rfxType, gateway: body.gateway };
            device.class = DeviceClass.Multi;
            device.subdevices = [
                { room: body.room, class: DeviceClass.SingleValueSensor, type: body.rfxType, category: device.category, name: 'temperature', commands: [], statusMethod: 'push', statusUnit: '°C' },
                { room: body.room, class: DeviceClass.SingleValueSensor, type: body.rfxType, category: device.category, name: 'humidity', commands: [], statusMethod: 'push', statusUnit: '%' },
                { room: body.room, class: DeviceClass.SingleValueSensor, type: body.rfxType, category: device.category, name: 'battery', commands: [], statusMethod: 'push', statusUnit: '%' },
                { room: body.room, class: DeviceClass.SingleValueSensor, type: body.rfxType, category: device.category, name: 'signal', commands: [], statusMethod: 'push', statusUnit: '%' },
            ];

            this.gateways[this.devices[device.name].gateway].on('TEMPERATURE_HUMIDITY', (state: TemperatureHumidity.Device) =>
            {
                remote.dispatch('pushStatus', { device: device.name + '.temperature', state: state.temperature / 10 })
                if (state.humidity !== 0)
                    remote.dispatch('pushStatus', { device: device.name + '.humidity', state: state.humidity })
                remote.dispatch('pushStatus', { device: device.name + '.battery', state: state.batteryLevel * 6.25 })
                remote.dispatch('pushStatus', { device: device.name + '.signal', state: state.rssi * 6.25 })
            })
            break;
        case PacketType.ENERGY:
            this.devices[device.name] = { type: body.rfxType, sensorId: body.sensorId, gateway: body.gateway };
            device.class = DeviceClass.Multi;
            device.subdevices = [
                { room: body.room, class: DeviceClass.SingleValueSensor, category: device.category, type: body.rfxType, name: 'instant', commands: [], statusMethod: 'push', statusUnit: 'W' },
                { room: body.room, class: DeviceClass.SingleValueSensor, category: device.category, type: body.rfxType, name: 'total', commands: [], statusMethod: 'push', statusUnit: 'Wh' },
                { room: body.room, class: DeviceClass.SingleValueSensor, category: device.category, type: body.rfxType, name: 'battery', commands: [], statusMethod: 'push', statusUnit: '%' },
                { room: body.room, class: DeviceClass.SingleValueSensor, category: device.category, type: body.rfxType, name: 'signal', commands: [], statusMethod: 'push', statusUnit: '%' },
            ];
            this.gateways[this.devices[device.name].gateway].on('ENERGY', state =>
            {
                remote.dispatch('pushStatus', { device: device.name + '.instant', state: state.instant })
                if (!state.count)
                    remote.dispatch('pushStatus', { device: device.name + '.total', state: state.total / 223.666 })
                remote.dispatch('pushStatus', { device: device.name + '.battery', state: state.batteryLevel * 6.25 })
                remote.dispatch('pushStatus', { device: device.name + '.signal', state: state.rssi * 6.25 })
            })
            break;
        case PacketType.CURRENT_ENERGY:
            this.devices[device.name] = { type: body.rfxType, sensorId: body.sensorId, gateway: this.devices[body.gateway] && this.devices[body.gateway].gateway };
            device.class = DeviceClass.Multi;
            device.subdevices = [
                { room: body.room, class: DeviceClass.SingleValueSensor, category: device.category, type: body.rfxType, name: 'channel1', commands: [], statusMethod: 'push', statusUnit: 'A' },
                { room: body.room, class: DeviceClass.SingleValueSensor, category: device.category, type: body.rfxType, name: 'channel2', commands: [], statusMethod: 'push', statusUnit: 'A' },
                { room: body.room, class: DeviceClass.SingleValueSensor, category: device.category, type: body.rfxType, name: 'channel3', commands: [], statusMethod: 'push', statusUnit: 'A' },
                { room: body.room, class: DeviceClass.SingleValueSensor, category: device.category, type: body.rfxType, name: 'battery', commands: [], statusMethod: 'push', statusUnit: '%' },
                { room: body.room, class: DeviceClass.SingleValueSensor, category: device.category, type: body.rfxType, name: 'signal', commands: [], statusMethod: 'push', statusUnit: '%' },
            ];
            this.gateways[this.devices[device.name].gateway].on('CURRENT_ENERGY', state =>
            {
                remote.dispatch('pushStatus', { device: device.name + '.channel1', state: state.channel1 })
                remote.dispatch('pushStatus', { device: device.name + '.channel2', state: state.channel2 })
                remote.dispatch('pushStatus', { device: device.name + '.channel3', state: state.channel3 })
                remote.dispatch('pushStatus', { device: device.name + '.battery', state: state.batteryLevel * 6.25 })
                remote.dispatch('pushStatus', { device: device.name + '.signal', state: state.rssi * 6.25 })
            })
            break;
        default:
            console.error(`rfx: ${type} (${body.rfxType}) is not supported`);
            throw new Error(`${type} (${body.rfxType}) is not supported`);
    }
    const deviceContainer = new Container(device.name, null, processor);
    self.register(deviceContainer);

    return device as IDevice;
}