import { StatusMessage } from './status';
import { messages, MessageType, } from './_common';
import { ShortAddressRequest, Mask } from './descriptors';
import { parsers, uint16, uint32, uint64, uint8 } from '@domojs/protocol-parser';

messages.register(MessageType.StartNetwork, parsers.object<{}>());
messages.register(MessageType.StartNetworkScan, parsers.object<{}>());
messages.register(MessageType.StartNetworkScan | MessageType.Response, parsers.object<NetworkResponse>(
    parsers.property('isNewNetwork', parsers.boolean(parsers.uint8)),
    parsers.property('targetShortAddress', parsers.uint16),
    parsers.property('extendedAddress', parsers.uint64),
    parsers.property('channel', parsers.uint8)
));

messages.register(MessageType.ManagementNetworkUpdate, parsers.object<ManagementNetworkUpdateRequest>(
    parsers.property('targetShortAddress', parsers.uint16),
    parsers.property('channelMask', parsers.uint32),
    parsers.property('scanDuration', parsers.uint8),
    parsers.property('scanCount', parsers.uint8),
    parsers.property('networkUpdateId', parsers.uint8),
    parsers.property('networkManagerShortAddress', parsers.uint8)
));

messages.register(MessageType.ManagementNetworkUpdate | MessageType.Response, parsers.object<ManagementNetworkUpdateResponse>(
    parsers.property('sequenceNumber', parsers.uint8),
    parsers.property('status', parsers.uint8),
    parsers.property('totalTransmission', parsers.uint16),
    parsers.property('transmissionFailures', parsers.uint16),
    parsers.property('scannedChannels', parsers.uint32),
    parsers.property('channels', parsers.buffer(parsers.uint8))
));

export interface NetworkResponse extends ShortAddressRequest
{
    isNewNetwork: boolean;
    extendedAddress: uint64;
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

messages.register(MessageType.SystemServerDiscovery, parsers.object<SystemServerDiscoveryRequest>(
    parsers.property('targetShortAddress', parsers.uint16),
    parsers.property('mask', parsers.uint16),
));

messages.register(MessageType.SystemServerDiscovery | MessageType.Response, parsers.object<SystemServerDiscoveryResponse>(
    parsers.property('sequenceNumber', parsers.uint8),
    parsers.property('status', parsers.uint8),
    parsers.property('mask', parsers.uint16),
));

export interface SystemServerDiscoveryRequest extends ShortAddressRequest
{
    mask: Mask;
}

export interface SystemServerDiscoveryResponse extends StatusMessage
{
    mask: Mask;
}

messages.register(MessageType.ManagementLQI, parsers.object<ManagementLQIRequest>(
    parsers.property('targetAddress', parsers.uint16),
    parsers.property('startIndex', parsers.uint8),
));

messages.register(MessageType.ManagementLQI | MessageType.Response, parsers.object<ManagementLQIResponse>(
    parsers.property('sequenceNumber', parsers.uint8),
    parsers.property('status', parsers.uint8),
    parsers.property('neighboursCount', parsers.uint8),
    parsers.property('neighboursListCount', parsers.uint8),
    parsers.property('startIndex', parsers.uint8),
    parsers.property('neighbours',
        parsers.array<Neighbour, ManagementLQIResponse>('neighboursListCount', parsers.object<Neighbour>(
            parsers.property('networkAddress', parsers.uint16),
            parsers.property('extendedPanId', parsers.uint64),
            parsers.property('IEEEAddress', parsers.uint64),
            parsers.property('depth', parsers.uint8),
            parsers.property('linkQuality', parsers.uint8),
            parsers.property('information', parsers.uint8),
        ))
    ),
));

export interface ManagementLQIRequest 
{
    targetAddress: uint16;
    startIndex: uint8;
}

export interface Neighbour
{
    networkAddress: uint16;
    extendedPanId: uint64;
    IEEEAddress: uint64;
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
    neighboursCount: uint8;
    neighboursListCount: uint8;
    neighbours: Neighbour[];
    startIndex: number;
}

messages.register(MessageType.ZoneStatusChangeNotification, parsers.object<ZoneStatusChangeNotification>(
    parsers.property('sequenceNumber', parsers.uint8),
    parsers.property('endpoint', parsers.uint8),
    parsers.property('clusterId', parsers.uint16),
    parsers.property('sourceAddressMode', parsers.uint8),
    parsers.chooseProperty<ZoneStatusChangeNotification>('sourceAddress', 'sourceAddressMode', {
        1: parsers.uint16,
        2: parsers.uint64
    }),
    parsers.property('zoneStatus', parsers.uint16),
    parsers.property('extendedStatus', parsers.uint8),
    parsers.property('zoneId', parsers.uint8),
    parsers.property('delay', parsers.array(-1, parsers.uint16)),
))

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

messages.register(MessageType.RouterDiscoveryConfirm, parsers.object<RouterDiscoveryConfirm>(
    parsers.property('status', parsers.uint8),
    parsers.property('networkStatus', parsers.uint8),
))

export interface RouterDiscoveryConfirm extends StatusMessage
{
    networkStatus: uint8;
}