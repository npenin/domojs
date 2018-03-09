import { StatusMessage } from './status';
import { Message, MessageType, Protocol } from './common';
import { uint16, uint64, uint8 } from '@domojs/protocol-parser/dist/index';

export enum AddressRequestType
{
    Single = 0,
    Extended = 1
}

Protocol.register<SingleNetworkAddressRequest | ExtendedNetworkAddressRequest>('type', MessageType.NetworkAddress, [
    {
        name: 'target', type: function (instance)
        {
            switch (instance.requestType)
            {
                case AddressRequestType.Single:
                    return 'uint16';
                case AddressRequestType.Extended:
                    return 'uint64';
            }
        }
    },
    { name: 'requestType', type: 'uint8' },
    { name: 'startIndex', type: 'uint8' }
])

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

Protocol.register<NetworkAddressResponse>('type', MessageType.NetworkAddress | MessageType.Response, [
    { name: 'sequenceNumber', type: 'uint8' },
    { name: 'status', type: 'uint8' },
    { name: 'IEEEAddress', type: 'uint64' },
    { name: 'shortAddress', type: 'uint16' },
    { name: 'numberOfDevices', type: 'uint8' },
    { name: 'startIndex', type: 'uint8' },
    { name: 'deviceList', type: 'uint16[]', length: 4 },
])

export interface NetworkAddressResponse extends StatusMessage
{
    IEEEAddress: uint64;
    shortAddress: uint16;
    numberOfDevices: uint8;
    startIndex: uint8;
    deviceList: uint16[];
}

Protocol.register<NetworkAddressResponse>('type', MessageType.IEEEAddress | MessageType.Response, [
    { name: 'sequenceNumber', type: 'uint8' },
    { name: 'status', type: 'uint8' },
    { name: 'IEEEAddress', type: 'uint64' },
    { name: 'shortAddress', type: 'uint16' },
    { name: 'numberOfDevices', type: 'uint8' },
    { name: 'startIndex', type: 'uint8' },
    { name: 'deviceList', type: 'uint16[]', length: 4 },
])