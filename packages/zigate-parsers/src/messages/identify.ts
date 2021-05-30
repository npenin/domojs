import { MessageType, messages } from './_common';
import { CommandMessage } from './move';
import { parsers, uint16 } from '@domojs/protocol-parser';

messages.register(MessageType.IdentifySend, parsers.object<IdentifySendRequest>(
    parsers.property('addressMode', parsers.uint8),
    parsers.property('targetShortAddress', parsers.uint16),
    parsers.property('sourceEndpoint', parsers.uint8),
    parsers.property('destinationEndpoint', parsers.uint8),
    parsers.property('time', parsers.uint16),
))
messages.register(MessageType.IdentifyQuery, parsers.object<CommandMessage>(
    parsers.property('addressMode', parsers.uint8),
    parsers.property('targetShortAddress', parsers.uint16),
    parsers.property('sourceEndpoint', parsers.uint8),
    parsers.property('destinationEndpoint', parsers.uint8),
))

export interface IdentifySendRequest extends CommandMessage
{
    time: uint16;
}