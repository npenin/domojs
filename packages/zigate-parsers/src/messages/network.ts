import { StatusMessage } from './status';
import { Message, MessageType, Protocol, uint8, uint16, uint32, uint64 } from './common';
import { ShortAddressRequest, Mask } from './descriptors';
import { Device } from './devices';
import { Frame } from '@domojs/protocol-parser';

Protocol.register('type', MessageType.StartNetwork, []);
Protocol.register('type', MessageType.StartNetworkScan, []);
Protocol.register<NetworkResponse>('type', MessageType.StartNetworkScan | MessageType.Response, [
    { name: 'isNewNetwork', type: 'uint8' },
    { name: 'targetShortAddress', type: 'uint16' },
    { name: 'extendedAddress', type: 'uint64' },
    { name: 'channel', type: 'uint8' }
]);

Protocol.register<ManagementNetworkUpdateRequest>('type', MessageType.ManagementNetworkUpdate, [
    { name: 'targetShortAddress', type: 'uint16' },
    { name: 'channelMask', type: 'uint32' },
    { name: 'scanDuration', type: 'uint8' },
    { name: 'scanCount', type: 'uint8' },
    { name: 'networkUpdateId', type: 'uint8' },
    { name: 'networkManagerShortAddress', type: 'uint8' }
]);

Protocol.register<ManagementNetworkUpdateResponse>('type', MessageType.ManagementNetworkUpdate | MessageType.Response, [
    { name: 'sequenceNumber', type: 'uint8' },
    { name: 'status', type: 'uint8' },
    { name: 'totalTransmission', type: 'uint16' },
    { name: 'transmissionFailures', type: 'uint16' },
    { name: 'scannedChannels', type: 'uint32' },
    { name: 'channels', type: 'uint8[]', length: 'uint8' }
]);

export interface NetworkResponse extends ShortAddressRequest
{
    isNewNetwork: boolean;
    extendedAddress: string;
    channel: uint8;
}

export interface ManagementNetworkUpdateRequest extends ShortAddressRequest
{
    channelMask: uint32;
    scanDuration: uint8;
    scanCount: uint8;
    networkUpdateId: uint8;
    networkManagerShortAddress: uint16;
}

export interface ManagementNetworkUpdateResponse extends StatusMessage
{
    totalTransmission: uint16;
    transmissionFailures: uint16;
    scannedChannels: uint32;
    channels: Buffer;
}

Protocol.register<SystemServerDiscoveryRequest>('type', MessageType.SystemServerDiscovery, [
    { name: 'targetShortAddress', type: 'uint16' },
    { name: 'mask', type: 'uint16' },
]);

Protocol.register<SystemServerDiscoveryResponse>('type', MessageType.SystemServerDiscovery | MessageType.Response, [
    { name: 'sequenceNumber', type: 'uint8' },
    { name: 'status', type: 'uint8' },
    { name: 'mask', type: 'uint16' },
]);

export interface SystemServerDiscoveryRequest extends ShortAddressRequest
{
    mask: Mask;
}

export interface SystemServerDiscoveryResponse extends StatusMessage
{
    mask: Mask;
}

Protocol.register<ManagementLQIRequest>('type', MessageType.ManagementLQI, [
    { name: 'targetAddress', type: 'uint16' },
    { name: 'startIndex', type: 'uint8' },
]);

Protocol.register<ManagementLQIResponse>('type', MessageType.ManagementLQI | MessageType.Response, [
    { name: 'sequenceNumber', type: 'uint8' },
    { name: 'status', type: 'uint8' },
    { name: 'neighboursCount', type: 'uint8' },
    { name: 'neighboursListCount', type: 'uint8' },
    { name: 'startIndex', type: 'uint8' },
    {
        name: 'neighbours', type: 'subFrame[]', length: 3, frame: new Frame<Neighbour>([
            { name: 'networkAddress', type: 'uint16' },
            { name: 'extendedPanId', type: 'uint64' },
            { name: 'IEEEAddress', type: 'uint64' },
            { name: 'depth', type: 'uint8' },
            { name: 'linkQuality', type: 'uint8' },
            { name: 'information', type: 'uint8' },
        ])
    },
]);

export interface ManagementLQIRequest 
{
    targetAddress: uint16;
    startIndex: uint8;
}

export interface Neighbour
{
    networkAddress: uint16;
    extendedPanId: string; IEEEAddress: string;
    depth: uint8;
    linkQuality: uint8;
    type?: DeviceType;
    information: NeighbourInformation;
}

export enum DeviceType
{
    Coordinator = 0,
    Router = 1,
    EndDevice = 2
}

export enum RelationShip
{
    Parent = 0,
    Child = 1,
    Sibling = 2
}


export enum NeighbourInformation
{
    Coordinator = DeviceType.Coordinator,
    Router = DeviceType.Router,
    EndDevice = DeviceType.EndDevice,
    PermitJoin = 0x4,
    Parent = 0x0,
    Child = 0x10,
    Sibling = 0x20,
    RxOnWhenIdleStatus = 0x0,
}

export interface ManagementLQIResponse extends StatusMessage
{
    neighboursCount: Neighbour[];
    neighboursListCount: Neighbour[];
    neighbours: Neighbour[];
    startIndex: number;
}

Protocol.register<ZoneStatusChangeNotification>('type', MessageType.ZoneStatusChangeNotification, [
    { name: 'sequenceNumber', type: 'uint8' },
    { name: 'endpoint', type: 'uint8' },
    { name: 'clusterId', type: 'uint16' },
    { name: 'sourceAddressMode', type: 'uint8' },
    {
        name: 'sourceAddress', type: function (instance)
        {
            switch (instance.sourceAddressMode)
            {
                default:
                    return 'uint8';
            }
        }
    },
    { name: 'zoneStatus', type: 'uint16' },
    { name: 'extendedStatus', type: 'uint8' },
    { name: 'zoneId', type: 'uint8' },
    { name: 'delay', type: 'uint16[]' },
])

export interface ZoneStatusChangeNotification extends StatusMessage
{
    sequenceNumber: uint8;
    endpoint: uint8;
    clusterId: uint16;
    sourceAddressMode: uint8;
    sourceAddress: uint16 | uint64;
    zoneStatus: uint16;
    extendedStatus: uint8;
    zoneId: uint8;
    delay: uint16[];
}

Protocol.register<RouterDiscoveryConfirm>('type', MessageType.RouterDiscoveryConfirm, [
    { name: 'status', type: 'uint8' },
    { name: 'networkStatus', type: 'uint8' },
])

export interface RouterDiscoveryConfirm extends StatusMessage
{
    networkStatus: uint8;
}