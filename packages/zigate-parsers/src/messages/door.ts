import { StatusMessage } from './status';
import { Message, MessageType, uint8, uint16, Protocol } from './common';
import { ShortAddressRequest } from 'zigate/src/messages/descriptors';
import { CommandMessage } from './move';

Protocol.register<LockUnlockMessage>('type', MessageType.LockUnlockDoor, [
    { name: 'addressMode', type: 'uint8' },
    { name: 'targetShortAddress', type: 'uint16' },
    { name: 'sourceEndpoint', type: 'uint8' },
    { name: 'destinationEndpoint', type: 'uint8' },
    { name: 'unlock', type: 'uint8' },
])

export interface LockUnlockMessage extends CommandMessage
{
    unlock: boolean;
}
