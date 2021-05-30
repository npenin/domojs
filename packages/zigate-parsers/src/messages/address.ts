import { StatusMessage } from './status';
import { messages, MessageType } from './_common';
import { parsers, uint16, uint64, uint8 } from '@domojs/protocol-parser/dist/index';

export enum AddressRequestType
{
    Single = 0,
    Extended = 1
}

messages.register(MessageType.NetworkAddress, parsers.object<SingleNetworkAddressRequest | ExtendedNetworkAddressRequest>(
    parsers.chooseProperty<SingleNetworkAddressRequest | ExtendedNetworkAddressRequest>('requestType', 'target', {
        [AddressRequestType.Single]: parsers.uint16,
        [AddressRequestType.Extended]: parsers.uint64
    }),
    parsers.property('requestType', parsers.uint8),
    parsers.property('startIndex', parsers.uint8)
));

export interface SingleNetworkAddressRequest
{
    target: uint16;
    requestType: AddressRequestType.Single;
    startIndex: number;
}
export interface ExtendedNetworkAddressRequest
{
    target: uint64;
    requestType: AddressRequestType.Extended;
    startIndex: uint8;
}

export interface IEEEAddressRequest 
{
    targetShortAddress: uint16;
    shortAddress: uint16;
    requestType: AddressRequestType;
    startIndex: uint8;
}

messages.register(MessageType.NetworkAddress | MessageType.Response, parsers.object<NetworkAddressResponse>(
    parsers.property('sequenceNumber', parsers.uint8),
    parsers.property('status', parsers.uint8),
    parsers.property('IEEEAddress', parsers.uint64),
    parsers.property('shortAddress', parsers.uint16),
    parsers.property('numberOfDevices', parsers.uint8),
    parsers.property('startIndex', parsers.uint8),
    parsers.property('deviceList', parsers.array<uint16, NetworkAddressResponse>('numberOfDevices', parsers.uint16)),
));

export interface NetworkAddressResponse extends StatusMessage
{
    IEEEAddress: uint64;
    shortAddress: uint16;
    numberOfDevices: uint8;
    startIndex: uint8;
    deviceList: uint16[];
}

messages.register(MessageType.IEEEAddress | MessageType.Response, parsers.object<NetworkAddressResponse>(
    parsers.property('sequenceNumber', parsers.uint8),
    parsers.property('status', parsers.uint8),
    parsers.property('IEEEAddress', parsers.uint64),
    parsers.property('shortAddress', parsers.uint16),
    parsers.property('numberOfDevices', parsers.uint8),
    parsers.property('startIndex', parsers.uint8),
    parsers.property('deviceList', parsers.array(-1, parsers.uint16)),
))