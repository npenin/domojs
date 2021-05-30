import { MessageType, messages } from './_common';
import { CommandMessage } from './move';
import { parsers, uint16, uint8 } from '@domojs/protocol-parser';

export enum OnOffToggleCommand
{
    Off = 0,
    On = 1,
    Toggle = 2
}

messages.register(MessageType.OnOffWithEffectsSend, parsers.object<OnOffWithEffectsMessage>(
    parsers.property('addressMode', parsers.uint8),
    parsers.property('targetShortAddress', parsers.uint16),
    parsers.property('sourceEndpoint', parsers.uint8),
    parsers.property('destinationEndpoint', parsers.uint8),
    parsers.property('effectId', parsers.uint8),
    parsers.property('effectGradient', parsers.uint8),
));

messages.register(MessageType.OnOffWithNoEffect, parsers.object<OnOffWithNoEffectsMessage>(
    parsers.property('addressMode', parsers.uint8),
    parsers.property('targetShortAddress', parsers.uint16),
    parsers.property('sourceEndpoint', parsers.uint8),
    parsers.property('destinationEndpoint', parsers.uint8),
    parsers.property('command', parsers.uint8),
));

messages.register(MessageType.OnOffTimedSend, parsers.object<OnOffTimedSendMessage>(
    parsers.property('addressMode', parsers.uint8),
    parsers.property('targetShortAddress', parsers.uint16),
    parsers.property('sourceEndpoint', parsers.uint8),
    parsers.property('destinationEndpoint', parsers.uint8),
    parsers.property('command', parsers.uint8),
    parsers.property('onTime', parsers.uint16),
    parsers.property('offTime', parsers.uint16),
));

export interface OnOffWithEffectsMessage extends CommandMessage
{
    effectId: uint8;
    effectGradient: uint8;
}

export interface OnOffWithNoEffectsMessage extends CommandMessage
{
    command: OnOffToggleCommand;
}

export interface OnOffTimedSendMessage extends CommandMessage
{
    command: OnOffToggleCommand.Off | OnOffToggleCommand.On;
    onTime: uint16;
    offTime: uint16;
}