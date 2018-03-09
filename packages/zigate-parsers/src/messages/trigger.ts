import { StatusMessage } from './status';
import { Message, MessageType, uint8, uint16, Protocol } from './common';
import { ShortAddressRequest } from 'zigate/src/messages/descriptors';
import { CommandMessage } from './move';

Protocol.register<IdentifyTriggerEffectMessage>('type', MessageType.IdentifyTriggerEffect, [
    { name: 'addressMode', type: 'uint8' },
    { name: 'targetShortAddress', type: 'uint16' },
    { name: 'sourceEndpoint', type: 'uint8' },
    { name: 'destinationEndpoint', type: 'uint8' },
    { name: 'effectId', type: 'uint8' },
    { name: 'effectGradient', type: 'uint8' },
])

export interface IdentifyTriggerEffectMessage extends CommandMessage
{
    effectId: uint8;
    effectGradient: uint8;
}
