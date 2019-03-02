import { StatusMessage } from './status';
import { Message, MessageType, uint8, uint16, Protocol } from './common';
import { ShortAddressRequest } from './descriptors';
import { CommandMessage } from './move';

export enum OnOffToggleCommand
{
    Off = 0,
    On = 1,
    Toggle = 2
}

Protocol.register<OnOffWithEffectsMessage>('type', MessageType.OnOffWithEffectsSend, [
    { name: 'addressMode', type: 'uint8' },
    { name: 'targetShortAddress', type: 'uint16' },
    { name: 'sourceEndpoint', type: 'uint8' },
    { name: 'destinationEndpoint', type: 'uint8' },
    { name: 'effectId', type: 'uint8' },
    { name: 'effectGradient', type: 'uint8' },
]);

Protocol.register<OnOffWithNoEffectsMessage>('type', MessageType.OnOffWithNoEffect, [
    { name: 'addressMode', type: 'uint8' },
    { name: 'targetShortAddress', type: 'uint16' },
    { name: 'sourceEndpoint', type: 'uint8' },
    { name: 'destinationEndpoint', type: 'uint8' },
    { name: 'command', type: 'uint8' },
]);

Protocol.register<OnOffTimedSendMessage>('type', MessageType.OnOffTimedSend, [
    { name: 'addressMode', type: 'uint8' },
    { name: 'targetShortAddress', type: 'uint16' },
    { name: 'sourceEndpoint', type: 'uint8' },
    { name: 'destinationEndpoint', type: 'uint8' },
    { name: 'command', type: 'uint8' },
    { name: 'onTime', type: 'uint16' },
    { name: 'offTime', type: 'uint16' },
]);

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