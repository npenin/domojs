import { StatusMessage } from './status';
import { Message, MessageType, messages } from './_common';
import { ShortAddressRequest } from './descriptors';
import { parsers, uint16, uint64, uint8 } from '@domojs/protocol-parser';

messages.register(MessageType.RemoveDevice, parsers.object<RemoveDevice>(
    parsers.property('targetShortAddress', parsers.uint16),
    parsers.property('extendedAddress', parsers.uint64)
));

messages.register(MessageType.DeviceAnnounce, parsers.object<DeviceAnnounce>(
    parsers.property('shortAddress', parsers.uint16),
    parsers.property('IEEEAddress', parsers.uint64),
    parsers.property('MacCapability', parsers.uint8)
));

export interface DeviceAnnounce
{
    shortAddress: uint16;
    IEEEAddress: uint64;
    MacCapability: uint8;
}

export interface RemoveDevice extends ShortAddressRequest
{
    extendedAddress: uint64;
}

export interface Device
{
    id?: uint8;
    shortAddress: uint16;
    IEEEAddress: uint64;
    powerLined: boolean;
    linkQuality: uint8;
}

messages.register(MessageType.AuthenticateDevice, parsers.object<AuthenticateDevice>(
    parsers.property('IEEEAddress', parsers.uint64),
    parsers.property('key', parsers.buffer(16)),
))

export interface AuthenticateDevice extends Message
{
    IEEEAddress: uint64;
    key: Buffer;
}

messages.register(MessageType.AuthenticateDevice | MessageType.Response, parsers.object<AuthenticateResponse>(
    parsers.property('IEEEAddress', parsers.uint64),
    parsers.property('encryptedKey', parsers.buffer(16)),
    parsers.property('mic', parsers.buffer(4)),
    parsers.property('initiatingNodeIEEEAddress', parsers.uint64),
    parsers.property('activeKeySequenceNumber', parsers.uint8),
    parsers.property('channel', parsers.uint8),
    parsers.property('shortPanId', parsers.uint16),
    parsers.property('extendedPanId', parsers.uint64),
))

export interface AuthenticateResponse extends StatusMessage
{
    activeKeySequenceNumber: number;
    channel: number;
    shortPanId: number;
    extendedPanId: uint64;
    initiatingNodeIEEEAddress: uint64;
    mic: Buffer;
    IEEEAddress: uint64;
    encryptedKey: Buffer;
}