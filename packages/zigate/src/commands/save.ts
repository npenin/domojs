import { State } from "../state.js";
import { Cluster, MessageType, MessageTypes, Zigate, network, attributes } from "@domojs/zigate-parsers";
import net from 'net';
import * as akala from '@akala/core';
import { punch } from "http-punch-hole";
import { DeviceClass, IDevice, ISaveDevice } from "@domojs/devices";
const log = akala.logger('domojs:zigate');

export default async function save(this: State, body: any, device: ISaveDevice & Partial<IDevice>): Promise<IDevice>
{
    if (!body)
        return device as IDevice;

    if (Object.keys(this.devices).length == 0 && !body.IP && !body.port)
        throw new Error('A gateway first need to be registered');

    if (body.mode) //gateway
    {
        let p: Promise<Zigate>;
        switch (body.mode)
        {
            case 'http':
                const socket: net.Socket = await punch(body.path, 'raw')
                socket.setKeepAlive(true, 60000);
                const gateway = new Zigate(socket);
                async function reopen()
                {
                    if (gateway.isOpen)
                    {
                        const socket = await punch(body.path, 'raw');
                        socket.on('close', reopen);
                        gateway.replaceClosedSocket(socket);
                        await gateway.start();
                    }
                }
                socket.on('close', reopen);

                p = this.setGateway(gateway);
                break;
            case 'tcp':
                p = new Promise<Zigate>((resolve, reject) =>
                {
                    const socket = net.connect(body, () =>
                    {
                        this.setGateway(new Zigate(socket)).then(resolve, reject);
                    });
                    socket.setKeepAlive(true, 60000);
                });
                break;
            case 'usb':
                p = this.setGateway(await Zigate.getSerial(body.path));
                break;
        }
        await p;

        device.class = DeviceClass.Gateway;
        device.commands = [
            { name: 'GetVersion', config: { "": { inject: [] }, "@domojs/devicetype": { type: 'button' } } },
            { name: 'Reset', config: { "": { inject: [] }, "@domojs/devicetype": { type: 'button' } } },
            { name: 'ErasePersistentData', config: { "": { inject: [] }, "@domojs/devicetype": { type: 'button' } } },
            { name: 'ZLO_ZLL_FactoryNew_Reset', config: { "": { inject: [] }, "@domojs/devicetype": { type: 'button' } } },
            { name: 'PermitJoin', config: { "": { inject: [] }, "@domojs/devicetype": { type: 'button' } } },
            { name: 'GetDevicesList', config: { "": { inject: [] }, "@domojs/devicetype": { type: 'button' } } },
            { name: 'SetSecurityStateAndKey', config: { "": { inject: [] }, "@domojs/devicetype": { type: 'button' } } },
            { name: 'StartNetworkScan', config: { "": { inject: [] }, "@domojs/devicetype": { type: 'button' } } },
            { name: 'RemoveDevice', config: { "": { inject: [] }, "@domojs/devicetype": { type: 'button' } } },
            { name: 'EnablePermissionsControlJoin', config: { "": { inject: [] }, "@domojs/devicetype": { type: 'button' } } },
            { name: 'AuthenticateDevice', config: { "": { inject: [] }, "@domojs/devicetype": { type: 'button' } } },
            { name: 'Bind', config: { "": { inject: [] }, "@domojs/devicetype": { type: 'button' } } },
            { name: 'Unbind', config: { "": { inject: [] }, "@domojs/devicetype": { type: 'button' } } },
            { name: 'ManagementLeave', config: { "": { inject: [] }, "@domojs/devicetype": { type: 'button' } } },
            { name: 'PermitJoining', config: { "": { inject: [] }, "@domojs/devicetype": { type: 'button' } } },
        ];

        this.devices[device.name] = {
            type: 'gateway',
            gateway: this.gateway,
            room: 'house'
        };

        this.gateway.then(zigate => zigate.on(MessageType.ReportIndividualAttribute, async (attribute: MessageTypes.ReportIndividualAttribute) =>
        {

            if (attribute.clusterId == Cluster.Basic && attribute.attributeEnum == 0x05)
            {
                this.devicesByAddress[attribute.sourceAddress].internalName = attribute.value.toString('utf8');
            }

            if (attribute.clusterId == 0 && attribute.attributeEnum != 0)
            {
                attribute.clusterId = attribute.attributeEnum;
            }

            if (!(attribute.sourceAddress in this.devicesByAddress))
            {
                this.devicesByAddress[attribute.sourceAddress] = {
                    type: 'device',
                    gateway: this.gateway,
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

                    await this.pubsub?.emit('/device/discovered',
                        {
                            type: 'zigate',
                            class: DeviceClass.SingleValueSensor,
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
                        this.devicesByAddress[attribute.sourceAddress].attributes[attribute.clusterId] = attribute.value.toString('utf8');
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
        }));

        return device as IDevice;
    }
    else //ZDevice
    {
        if (device.name.indexOf('.') > 0)
            return device as IDevice;
        device.subdevices = [];
        if (!(body.zdevice.address in this.devicesByAddress))
        {
            if (body.zdevice.address in this.devicesByAddress && this.devicesByAddress[body.zdevice.address].registered)
                return device as IDevice;

            this.devices[device.name] = this.devicesByAddress[body.zdevice.address] = {
                type: 'device',
                address: body.zdevice.address,
                category: device.category,
                name: device.name,
                room: device.room,
                attributes: {},
                clusters: [],
                gateway: this.gateway,
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
                    class: DeviceClass.SingleValueSensor,
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

            device.class = DeviceClass.SingleValueSensor;
            return device as IDevice;
        }
        this.devicesByAddress[body.zdevice.address].name = device.name;
        this.devices[device.name] = this.devicesByAddress[body.zdevice.address];
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
                class: DeviceClass.SingleValueSensor,
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

    return device as IDevice;

}