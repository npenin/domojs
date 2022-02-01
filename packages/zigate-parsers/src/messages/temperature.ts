import { MessageType, messages } from './_common';
import { CommandMessage } from './move';
import { parsers, uint16, uint8 } from '@domojs/protocol-parser';

messages.register(MessageType.MoveToColorTemperature, parsers.object<MoveToColorTemperature>(
    parsers.property('addressMode', parsers.uint8),
    parsers.property('targetShortAddress', parsers.uint16),
    parsers.property('sourceEndpoint', parsers.uint8),
    parsers.property('destinationEndpoint', parsers.uint8),
    parsers.property('temperature', parsers.uint16),
    parsers.property('transitionTime', parsers.uint16),
));

messages.register(MessageType.MoveColorTemperature, parsers.object<MoveColorTemperature>(
    parsers.property('addressMode', parsers.uint8),
    parsers.property('targetShortAddress', parsers.uint16),
    parsers.property('sourceEndpoint', parsers.uint8),
    parsers.property('destinationEndpoint', parsers.uint8),
    parsers.property('mode', parsers.uint8),
    parsers.property('rate', parsers.uint16),
    parsers.property('minTemperature', parsers.uint16),
    parsers.property('maxTemperature', parsers.uint16),
    parsers.property('optionsMask', parsers.uint8),
    parsers.property('optionsOverride', parsers.uint8),
));

messages.register(MessageType.StepColorTemperature, parsers.object<StepColorTemperature>(
    parsers.property('addressMode', parsers.uint8),
    parsers.property('targetShortAddress', parsers.uint16),
    parsers.property('sourceEndpoint', parsers.uint8),
    parsers.property('destinationEndpoint', parsers.uint8),
    parsers.property('mode', parsers.uint8),
    parsers.property('stepSize', parsers.uint16),
    parsers.property('transitionTime', parsers.uint16),
    parsers.property('minTemperature', parsers.uint16),
    parsers.property('maxTemperature', parsers.uint16),
));

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
