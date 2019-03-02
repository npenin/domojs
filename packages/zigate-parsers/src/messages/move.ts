import { StatusMessage } from './status';
import { Message, MessageType, uint8, uint16, Protocol } from './common';
import { ShortAddressRequest } from './descriptors';
import { MoveToSaturation } from './hue';

Protocol.register<MoveToLevel>('type', MessageType.MoveToLevel, [
    { name: 'addressMode', type: 'uint8' },
    { name: 'targetShortAddress', type: 'uint16' },
    { name: 'sourceEndpoint', type: 'uint8' },
    { name: 'destinationEndpoint', type: 'uint8' },
    { name: 'onoff', type: 'uint8' },
    { name: 'mode', type: 'uint8' },
    { name: 'rate', type: 'uint8' },
]);

Protocol.register<MoveToLevelWithWithoutOnOff>('type', MessageType.MoveToLevelWithWithoutOnOff, [
    { name: 'addressMode', type: 'uint8' },
    { name: 'targetShortAddress', type: 'uint16' },
    { name: 'sourceEndpoint', type: 'uint8' },
    { name: 'destinationEndpoint', type: 'uint8' },
    { name: 'onoff', type: 'uint8' },
    { name: 'level', type: 'uint8' },
    { name: 'transitionTime', type: 'uint16' },
]);

Protocol.register<MoveStep>('type', MessageType.MoveStep, [
    { name: 'addressMode', type: 'uint8' },
    { name: 'targetShortAddress', type: 'uint16' },
    { name: 'sourceEndpoint', type: 'uint8' },
    { name: 'destinationEndpoint', type: 'uint8' },
    { name: 'onoff', type: 'uint8' },
    { name: 'stepMode', type: 'uint8' },
    { name: 'stepSize', type: 'uint8' },
    { name: 'transitionTime', type: 'uint16' },
]);

Protocol.register<CommandMessage>('type', MessageType.MoveStopMove, [
    { name: 'addressMode', type: 'uint8' },
    { name: 'targetShortAddress', type: 'uint16' },
    { name: 'sourceEndpoint', type: 'uint8' },
    { name: 'destinationEndpoint', type: 'uint8' },
]);

Protocol.register<CommandMessage>('type', MessageType.MoveStopWithOnOff, [
    { name: 'addressMode', type: 'uint8' },
    { name: 'targetShortAddress', type: 'uint16' },
    { name: 'sourceEndpoint', type: 'uint8' },
    { name: 'destinationEndpoint', type: 'uint8' },
]);

Protocol.register<CommandList>('type', MessageType.ObjectCommandsList, [
    { name: 'sourceEndpoint', type: 'uint8' },
    { name: 'profileId', type: 'uint16' },
    { name: 'clusterId', type: 'uint16' },
    { name: 'commands', type: 'uint8[]' },
])

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
