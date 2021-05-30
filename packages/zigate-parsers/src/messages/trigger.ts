import { StatusMessage } from './status';
import { Message, MessageType, messages } from './_common';
import { ShortAddressRequest } from './descriptors';
import { CommandMessage } from './move';
import { parsers } from '@domojs/protocol-parser';

messages.register(MessageType.IdentifyTriggerEffect, parsers.object<IdentifyTriggerEffectMessage>(
    parsers.property('addressMode', parsers.uint8),
    parsers.property('targetShortAddress', parsers.uint16),
    parsers.property('sourceEndpoint', parsers.uint8),
    parsers.property('destinationEndpoint', parsers.uint8),
    parsers.property('effectId', parsers.uint8),
    parsers.property('effectGradient', parsers.uint8),
))

export interface IdentifyTriggerEffectMessage extends CommandMessage
{
    effectId: number;
    effectGradient: number;
}
