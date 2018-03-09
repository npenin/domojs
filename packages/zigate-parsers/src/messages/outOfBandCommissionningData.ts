import { StatusMessage } from './status';
import { Message, MessageType, uint64, Protocol, uint32, uint8, uint16 } from './common';
import { complexFrameType } from '../../../@domojs/protocol-parser/dist/index';

Protocol.register<OutOfBandCommissionningDataRequest>('type', MessageType.OutOfBandCommissionningData, [
    { name: 'addressOfInterest', type: 'uint64' },
    { name: 'key', type: <complexFrameType>'uint8[16]' }
])

export interface OutOfBandCommissionningDataRequest extends Message
{
    addressOfInterest: uint64;
    key: Buffer;
}

Protocol.register<OutOfBandCommissionningDataResponse>('type', MessageType.OutOfBandCommissionningData | MessageType.Response, [
    { name: 'deviceExtendedAddress', type: 'uint64' },
    { name: 'key', type: <complexFrameType>'buffer[16]' },
    { name: 'mic', type: 'uint32' },
    { name: 'hostExtendedAddress', type: 'uint64' },
    { name: 'activeKeySequenceNumber', type: 'uint8' },
    { name: 'channel', type: 'uint64' },
    { name: 'panId', type: 'uint64' },
    { name: 'extendedPanId', type: 'uint64' },
    { name: 'shortAddress', type: 'uint16' },
    { name: 'deviceId', type: 'uint16' },
    { name: 'status', type: 'uint8' },
])

export interface OutOfBandCommissionningDataResponse extends StatusMessage
{
    deviceExtendedAddress: uint64;
    key: Buffer;
    mic: uint32;
    hostExtendedAddress: uint64;
    activeKeySequenceNumber: uint8;
    channel: uint8;
    panId: uint16;
    extendedPanId: uint64;
    shortAddress: uint16;
    deviceId: uint16;
}