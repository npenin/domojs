import { devices } from "@domojs/devices";
import { State } from "../state";
import { Cluster, MessageType, MessageTypes, Zigate, network, attributes } from "@domojs/zigate-parsers";
import net from 'net';
import * as akala from '@akala/core';
import { punch } from "http-punch-hole";
const log = akala.logger('domojs:zigate');

export default async function save(this: State, body: any, device: devices.IDevice)
{
    if (!body)
        return device;

    if (Object.keys(devices).length == 0 && !body.IP && !body.port)
        throw new Error('A gateway first need to be registered');

    if (body.mode) //gateway
    {
        let p: Promise<Zigate>;
        switch (body.mode)
        {
            case 'http':
                const socket: net.Socket = await punch(body.path, 'raw')
                const gateway = new Zigate(socket);
                p = this.setGateway(gateway);
                break;
            case 'tcp':
                p = new Promise<Zigate>((resolve, reject) =>
                {
                    const socket = net.connect(body, async () =>
                    {
                        this.setGateway(new Zigate(socket)).then(resolve, reject);
                    });
                });
                break;
            case 'usb':
                p = this.setGateway(await Zigate.getSerial(body.path));
                break;
        }
        await p;
        var zigate = await this.gateway;
        device.commands = {
            'GetVersion': { type: 'button' },
            'Reset': { type: 'button' },
            'ErasePersistentData': { type: 'button' },
            'ZLO_ZLL_FactoryNew_Reset': { type: 'button' },
            'PermitJoin': { type: 'button' },
            'GetDevicesList': { type: 'button' },
            'SetSecurityStateAndKey': { type: 'button' },
            'StartNetworkScan': { type: 'button' },
            'RemoveDevice': { type: 'button' },
            'EnablePermissionsControlJoin': { type: 'button' },
            'AuthenticateDevice': { type: 'button' },
            'Bind': { type: 'button' },
            'Unbind': { type: 'button' },
            'ManagementLeave': { type: 'button' },
            'PermitJoining': { type: 'button' },
        };

        zigate.send<MessageTypes.SetChannelMaskRequest>(MessageType.SetChannelMask, { mask: 11 })
        zigate.once(MessageType.Status, (response: MessageTypes.SetChannelMaskResponse) =>
        {
            zigate.send<MessageTypes.SetDeviceTypeRequest>(MessageType.SetDeviceType, { type: network.DeviceType.Coordinator });
            zigate.once(MessageType.Status, (response: MessageTypes.SetDeviceTypeResponse) =>
            {
                zigate.send<MessageTypes.StartNetworkRequest>(MessageType.StartNetwork);
                zigate.once(MessageType.StartNetwork, (response: MessageTypes.StartNetworkResponse) =>
                {

                })
            })
        });

        zigate.on<MessageTypes.ReportIndividualAttribute>(MessageType.ReportIndividualAttribute, async (attribute) =>
        {

            if (attribute.clusterId == Cluster.Basic && attribute.attributeEnum == 0x05)
            {
                this.devicesByAddress[attribute.sourceAddress].internalName = attribute.value.toString();
            }

            if (attribute.clusterId == 0 && attribute.attributeEnum != 0)
            {
                attribute.clusterId = attribute.attributeEnum;
            }

            if (!(attribute.sourceAddress in this.devicesByAddress))
            {
                this.devicesByAddress[attribute.sourceAddress] = {
                    type: 'device',
                    gateway: zigate,
                    room: undefined,
                    address: attribute.sourceAddress,
                    category: null,
                    clusters: [],
                    attributes: {}
                }
                this.logger.info('new device with address: ' + attribute.sourceAddress);
            }

            if (this.devicesByAddress[attribute.sourceAddress].clusters.indexOf(attribute.clusterId) == -1)
            {
                this.devicesByAddress[attribute.sourceAddress].clusters.push(attribute.clusterId);
                if (this.devicesByAddress[attribute.sourceAddress].registered && attribute.clusterId != Cluster.Basic && attribute.clusterId != Cluster.XiaomiPrivate1)
                {
                    let statusUnit: string;

                    switch (attribute.clusterId)
                    {
                        case Cluster.Temperature:
                            statusUnit = '°C';
                            break;
                        case Cluster.Pressure:
                            statusUnit = 'b';
                            break;
                        case Cluster.Humidity:
                            statusUnit = '%';
                            break;
                    }

                    await this.pubsub?.publish('/device/discovered',
                        {
                            type: 'zigate',
                            class: devices.DeviceClass.SingleValueSensor,
                            category: this.devicesByAddress[attribute.sourceAddress].category,
                            room: this.devicesByAddress[attribute.sourceAddress].room,
                            name: this.devicesByAddress[attribute.sourceAddress].name + '.' + Cluster[attribute.clusterId],
                            statusMethod: 'push',
                            commands: [],
                            statusUnit: statusUnit
                        }
                    );
                }
            }
            try
            {
                if (attribute.clusterId == 0 && attribute.attributeEnum != 0)
                {
                    attribute.clusterId = attribute.attributeEnum;
                }

                switch (attribute.dataType)
                {
                    case attributes.AttributeType.bitmap:
                        break;
                    case attributes.AttributeType.bool:
                        this.devicesByAddress[attribute.sourceAddress].attributes[attribute.clusterId] = attribute.value.readUInt8(0);
                        break;
                    case attributes.AttributeType.enum:
                        this.devicesByAddress[attribute.sourceAddress].attributes[attribute.clusterId] = attribute.value.readUInt8(0);
                        break;
                    case attributes.AttributeType.int16:
                        this.devicesByAddress[attribute.sourceAddress].attributes[attribute.clusterId] = attribute.value.readInt16BE(0);
                        break;
                    case attributes.AttributeType.int32:
                        this.devicesByAddress[attribute.sourceAddress].attributes[attribute.clusterId] = attribute.value.readInt32BE(0);
                        break;
                    case attributes.AttributeType.int8:
                        this.devicesByAddress[attribute.sourceAddress].attributes[attribute.clusterId] = attribute.value.readInt8(0);
                        break;
                    case attributes.AttributeType.null:
                        this.devicesByAddress[attribute.sourceAddress].attributes[attribute.clusterId] = null;
                        break;
                    case attributes.AttributeType.string:
                        this.devicesByAddress[attribute.sourceAddress].attributes[attribute.clusterId] = attribute.value.toString();
                        break;
                    case attributes.AttributeType.uint16:
                        this.devicesByAddress[attribute.sourceAddress].attributes[attribute.clusterId] = attribute.value.readUInt16BE(0);
                        break;
                    case attributes.AttributeType.uint32:
                        this.devicesByAddress[attribute.sourceAddress].attributes[attribute.clusterId] = attribute.value.readUInt32BE(0);
                        break;
                    case attributes.AttributeType.uint48:
                        this.devicesByAddress[attribute.sourceAddress].attributes[attribute.clusterId] = attribute.value.readUIntBE(0, 6);
                        break;
                    case attributes.AttributeType.uint8:
                        this.devicesByAddress[attribute.sourceAddress].attributes[attribute.clusterId] = attribute.value.readUInt8(0);
                        break;
                    default:
                        throw new Error(`Unsupported attribute type (${attribute.dataType})`);
                }
                switch (attribute.clusterId)
                {
                    case Cluster.Pressure:
                        this.devicesByAddress[attribute.sourceAddress].attributes[attribute.clusterId] = (this.devicesByAddress[attribute.sourceAddress].attributes[attribute.clusterId] as number) / 10000;
                        break;
                    case Cluster.Temperature:
                    case Cluster.Humidity:
                        this.devicesByAddress[attribute.sourceAddress].attributes[attribute.clusterId] = (this.devicesByAddress[attribute.sourceAddress].attributes[attribute.clusterId] as number) / 100;
                        break;
                }
                // if (this.devicesByAddress[attribute.sourceAddress].registered)
                //     await this.server.dispatch('pushStatus', { device: this.devicesByAddress[attribute.sourceAddress].name + '.' + Cluster[attribute.clusterId], state: this.devicesByAddress[attribute.sourceAddress].attributes[attribute.clusterId] });
                log.debug({ address: attribute.sourceAddress, attributes: this.devicesByAddress[attribute.sourceAddress] });
            }
            catch (e)
            {
                log.error(e);
            }
        })

        devices[device.name] = {
            type: 'gateway',
            gateway: zigate
        };

        return device;
    }
    else //ZDevice
    {
        if (device.name.indexOf('.') > 0)
            return device;
        device.subdevices = [];
        if (!(body.zdevice.address in this.devicesByAddress))
        {
            var zigate = await this.gateway;
            if (body.zdevice.address in this.devicesByAddress && this.devicesByAddress[body.zdevice.address].registered)
                return device;

            devices[device.name] = this.devicesByAddress[body.zdevice.address] = {
                type: 'device',
                address: body.zdevice.address,
                category: device.category,
                name: device.name,
                room: device.room,
                attributes: {},
                clusters: [],
                gateway: zigate,
                registered: true
            };
            for (let cluster of this.devicesByAddress[body.zdevice.address].clusters)
            {
                console.log('useless ?');
                let statusUnit: string;
                if (cluster == Cluster.Basic) //Typescript bug
                    continue;
                switch (cluster)
                {
                    case Cluster.Temperature:
                        statusUnit = '°C';
                    case Cluster.Pressure:
                        statusUnit = 'b';
                    case Cluster.Humidity:
                        statusUnit = '%';
                }

                device.subdevices.push({
                    name: Cluster[cluster],
                    commands: [],
                    class: devices.DeviceClass.SingleValueSensor,
                    room: device.room,
                    statusUnit: statusUnit,
                    category: device.category,
                    type: device.type,
                    status: function ()
                    {
                        return Promise.resolve(this.devicesByAddress[body.zdevice.address].attributes[cluster].toString());
                    },
                    statusMethod: 'push'
                });
            }

            return device;
        }
        this.devicesByAddress[body.zdevice.address].name = device.name;
        devices[device.name] = this.devicesByAddress[body.zdevice.address];
        for (let cluster of this.devicesByAddress[body.zdevice.address].clusters)
        {
            let statusUnit: string;
            if (cluster == Cluster.Basic)
                continue;
            switch (cluster)
            {
                case Cluster.Temperature:
                    statusUnit = '°C';
                case Cluster.Pressure:
                    statusUnit = 'b';
                case Cluster.Humidity:
                    statusUnit = '%';
            }

            device.subdevices.push({
                name: Cluster[cluster],
                commands: [],
                class: devices.DeviceClass.SingleValueSensor,
                room: device.room,
                statusUnit: statusUnit,
                category: device.category,
                type: device.type,
                status: function ()
                {
                    return Promise.resolve(this.devicesByAddress[body.zdevice.address].attributes[cluster].toString());
                },
                statusMethod: 'push'
            });
        }
    }

    return device;

}