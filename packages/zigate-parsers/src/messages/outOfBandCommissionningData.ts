import { StatusMessage } from './status';
import { Message, MessageType, messages } from './_common';
import { parsers, uint16, uint32, uint64, uint8 } from '@domojs/protocol-parser';

messages.register(MessageType.OutOfBandCommissionningData, parsers.object<OutOfBandCommissionningDataRequest>(
    parsers.property('addressOfInterest', parsers.uint64),
    parsers.property('key', parsers.array(-1, parsers.buffer(16)))
));

export interface OutOfBandCommissionningDataRequest extends Message
{
    addressOfInterest: uint64;
    key: Buffer[];
}

messages.register(MessageType.OutOfBandCommissionningData | MessageType.Response, parsers.object<OutOfBandCommissionningDataResponse>(
    parsers.property('deviceExtendedAddress', parsers.uint64),
    parsers.property('key', parsers.buffer(16)),
    parsers.property('mic', parsers.uint32),
    parsers.property('hostExtendedAddress', parsers.uint64),
    parsers.property('activeKeySequenceNumber', parsers.uint8),
    parsers.property('channel', parsers.uint8),
    parsers.property('panId', parsers.uint16),
    parsers.property('extendedPanId', parsers.uint64),
    parsers.property('shortAddress', parsers.uint16),
    parsers.property('deviceId', parsers.uint16),
    parsers.property('status', parsers.uint8),
))

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