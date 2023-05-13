import { MessageType, messages } from './_common.js';
import { CommandMessage } from './move.js';
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
