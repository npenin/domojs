import { StatusMessage } from './status';
import { Message, MessageType, uint8, uint16, Protocol } from './common';
import { ShortAddressRequest } from './descriptors';
import { CommandMessage } from './move';

Protocol.register<APSRequest>('type', MessageType.RawAPSData, [
    { name: 'addressMode', type: 'uint8' },
    { name: 'targetShortAddress', type: 'uint16' },
    { name: 'sourceEndpoint', type: 'uint8' },
    { name: 'destinationEndpoint', type: 'uint8' },
    { name: 'profileId', type: 'uint16' },
    { name: 'clusterId', type: 'uint16' },
    { name: 'securityMode', type: 'uint8' },
    { name: 'radius', type: 'uint8' },
    { name: 'raw', type: 'uint8[]', length: 'uint8' },
])

export interface APSRequest extends CommandMessage
{
    profileId: uint16;
    clusterId: uint16;
    securityMode: uint8;
    radius: uint8;
    raw: uint8[];
}

Protocol.register<APSDataConfirmFail>('type', MessageType.APSDataConfirmFail, [
    { name: 'status', type: 'uint8' },
    { name: 'sourceEndpoint', type: 'uint8' },
    { name: 'destinationEndpoint', type: 'uint8' },
    { name: 'addressMode', type: 'uint8' },
    { name: 'destinationAddress', type: 'uint64' },
    { name: 'sequenceNumber', type: 'uint8' },
])

export interface APSDataConfirmFail extends CommandMessage, StatusMessage
{
    destinationAddress: 'uint64';
}
