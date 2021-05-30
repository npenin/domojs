import { MessageType, messages } from './_common';
import { CommandMessage } from './move';
import { parsers } from '@domojs/protocol-parser';

messages.register(MessageType.LockUnlockDoor, parsers.object<LockUnlockMessage>(
    parsers.property('addressMode', parsers.uint8),
    parsers.property('targetShortAddress', parsers.uint16),
    parsers.property('sourceEndpoint', parsers.uint8),
    parsers.property('destinationEndpoint', parsers.uint8),
    parsers.property('unlock', parsers.boolean(parsers.uint8)),
));

export interface LockUnlockMessage extends CommandMessage
{
    unlock: boolean;
}
