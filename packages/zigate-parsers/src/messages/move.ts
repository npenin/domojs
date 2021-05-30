import { StatusMessage } from './status';
import { MessageType, messages } from './_common';
import { ShortAddressRequest } from './descriptors';
import { parsers, uint16, uint8 } from '@domojs/protocol-parser';

messages.register(MessageType.MoveToLevel, parsers.object<MoveToLevel>(
    parsers.property('addressMode', parsers.uint8),
    parsers.property('targetShortAddress', parsers.uint16),
    parsers.property('sourceEndpoint', parsers.uint8),
    parsers.property('destinationEndpoint', parsers.uint8),
    parsers.property('onoff', parsers.uint8),
    parsers.property('mode', parsers.uint8),
    parsers.property('rate', parsers.uint8),
));

messages.register(MessageType.MoveToLevelWithWithoutOnOff, parsers.object<MoveToLevelWithWithoutOnOff>(
    parsers.property('addressMode', parsers.uint8),
    parsers.property('targetShortAddress', parsers.uint16),
    parsers.property('sourceEndpoint', parsers.uint8),
    parsers.property('destinationEndpoint', parsers.uint8),
    parsers.property('onoff', parsers.uint8),
    parsers.property('level', parsers.uint8),
    parsers.property('transitionTime', parsers.uint16),
));

messages.register(MessageType.MoveStep, parsers.object<MoveStep>(
    parsers.property('addressMode', parsers.uint8),
    parsers.property('targetShortAddress', parsers.uint16),
    parsers.property('sourceEndpoint', parsers.uint8),
    parsers.property('destinationEndpoint', parsers.uint8),
    parsers.property('onoff', parsers.uint8),
    parsers.property('stepMode', parsers.uint8),
    parsers.property('stepSize', parsers.uint8),
    parsers.property('transitionTime', parsers.uint16),
));

messages.register(MessageType.MoveStopMove, parsers.object<CommandMessage>(
    parsers.property('addressMode', parsers.uint8),
    parsers.property('targetShortAddress', parsers.uint16),
    parsers.property('sourceEndpoint', parsers.uint8),
    parsers.property('destinationEndpoint', parsers.uint8),
));

messages.register(MessageType.MoveStopWithOnOff, parsers.object<CommandMessage>(
    parsers.property('addressMode', parsers.uint8),
    parsers.property('targetShortAddress', parsers.uint16),
    parsers.property('sourceEndpoint', parsers.uint8),
    parsers.property('destinationEndpoint', parsers.uint8),
));

messages.register(MessageType.ObjectCommandsList, parsers.object<CommandList>(
    parsers.property('sourceEndpoint', parsers.uint8),
    parsers.property('profileId', parsers.uint16),
    parsers.property('clusterId', parsers.uint16),
    parsers.property('commands', parsers.array(-1, parsers.uint8)),
))

export interface CommandMessage extends ShortAddressRequest
{
    addressMode: uint8;
    sourceEndpoint: uint8;
    destinationEndpoint: uint8;
}

export interface CommandResponse extends StatusMessage
{
    endpoint: uint8;
    clusterId: uint16;
    commandId: uint8;
}

export interface CommandList
{
    sourceEndpoint: uint8;
    profileId: uint16;
    clusterId: uint16;
    commands: uint8[];
}

export interface MoveToLevel extends CommandMessage
{
    onoff: uint8;
    mode: uint8;
    rate: uint8;
}

export interface MoveToLevelWithWithoutOnOff extends CommandMessage
{
    onoff: uint8;
    level: uint8;
    transitionTime: uint16;
}

export interface MoveStep extends CommandMessage
{
    onoff: uint8;
    stepMode: uint8;
    stepSize: uint8;
    transitionTime: uint16;
}
