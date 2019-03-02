import { StatusMessage } from './status';
import { Message, MessageType, uint16, uint8, Protocol, uint64 } from './common';
import { ShortAddressRequest } from './descriptors';
import { complexFrameType } from '@domojs/protocol-parser';

Protocol.register<RemoveDevice>('type', MessageType.RemoveDevice, [
    { name: 'targetShortAddress', type: 'uint64' },
    { name: 'extendedAddress', type: 'uint64' }
]);

Protocol.register<DeviceAnnounce>('type', MessageType.DeviceAnnounce, [
    { name: 'shortAddress', type: 'uint16' },
    { name: 'IEEEAddress', type: 'uint64' },
    { name: 'MacCapability', type: 'uint8' }
]);

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
    IEEEAddress: number;
    powerLined: boolean;
    linkQuality: uint8;
}

Protocol.register<AuthenticateDevice>('type', MessageType.AuthenticateDevice, [
    { name: 'IEEEAddress', type: 'uint64' },
    { name: 'key', type: <complexFrameType>'uint8[16]' },
])

export interface AuthenticateDevice extends Message
{
    IEEEAddress: string;
    key: Buffer;
}

Protocol.register<AuthenticateResponse>('type', MessageType.AuthenticateDevice | MessageType.Response, [
    { name: 'IEEEAddress', type: 'uint64' },
    { name: 'encryptedKey', type: <complexFrameType>'uint8[16]' },
    { name: 'mic', type: <complexFrameType>'uint8[4]' },
    { name: 'initiatingNodeIEEEAddress', type: 'uint64' },
    { name: 'activeKeySequenceNumber', type: 'uint8' },
    { name: 'channel', type: 'uint8' },
    { name: 'shortPanId', type: 'uint16' },
    { name: 'extendedPanId', type: 'uint64' },
])

export interface AuthenticateResponse extends StatusMessage
{
    activeKeySequenceNumber: number;
    channel: number;
    shortPanId: number;
    extendedPanId: string;
    initiatingNodeIEEEAddress: string;
    mic: Buffer;
    IEEEAddress: uint64;
    encryptedKey: Buffer;
}