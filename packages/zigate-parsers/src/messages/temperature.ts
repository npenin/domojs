import { StatusMessage } from './status';
import { Message, MessageType, uint8, uint16, Protocol } from './common';
import { ShortAddressRequest } from './descriptors';
import { CommandMessage } from './move';

Protocol.register<MoveToColorTemperature>('type', MessageType.MoveToColorTemperature, [
    { name: 'addressMode', type: 'uint8' },
    { name: 'targetShortAddress', type: 'uint16' },
    { name: 'sourceEndpoint', type: 'uint8' },
    { name: 'destinationEndpoint', type: 'uint8' },
    { name: 'temperature', type: 'uint16' },
    { name: 'transitionTime', type: 'uint16' },
]);

Protocol.register<MoveColorTemperature>('type', MessageType.MoveColorTemperature, [
    { name: 'addressMode', type: 'uint8' },
    { name: 'targetShortAddress', type: 'uint16' },
    { name: 'sourceEndpoint', type: 'uint8' },
    { name: 'destinationEndpoint', type: 'uint8' },
    { name: 'mode', type: 'uint8' },
    { name: 'rate', type: 'uint16' },
    { name: 'minTemperature', type: 'uint16' },
    { name: 'maxTemperature', type: 'uint16' },
    { name: 'optionsMask', type: 'uint8' },
    { name: 'optionsOverride', type: 'uint8' },
]);

Protocol.register<StepColorTemperature>('type', MessageType.StepColorTemperature, [
    { name: 'addressMode', type: 'uint8' },
    { name: 'targetShortAddress', type: 'uint16' },
    { name: 'sourceEndpoint', type: 'uint8' },
    { name: 'destinationEndpoint', type: 'uint8' },
    { name: 'mode', type: 'uint8' },
    { name: 'stepSize', type: 'uint16' },
    { name: 'transitionTime', type: 'uint16' },
    { name: 'minTemperature', type: 'uint16' },
    { name: 'maxTemperature', type: 'uint16' },
]);

export interface MoveToColorTemperature extends CommandMessage
{
    temperature: uint16;
    transitionTime: uint16;
}

export interface MoveColorTemperature extends CommandMessage
{
    mode: uint8;
    rate: uint16;
    minTemperature: uint16;
    maxTemperature: uint16;
    optionsMask: uint8;
    optionsOverride: uint8;
}


export interface StepColorTemperature extends CommandMessage
{
    mode: uint8;
    stepSize: uint16;
    minTemperature: uint16;
    maxTemperature: uint16;
    transitionTime: uint16;
}
