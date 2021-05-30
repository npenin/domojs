import { MessageType, messages } from './_common';
import { CommandMessage } from './move';
import { parsers, uint16, uint8 } from '@domojs/protocol-parser';



messages.register(MessageType.MoveToHue, parsers.object<MoveToHue>(
    parsers.property('addressMode', parsers.uint8),
    parsers.property('targetShortAddress', parsers.uint16),
    parsers.property('sourceEndpoint', parsers.uint8),
    parsers.property('destinationEndpoint', parsers.uint8),
    parsers.property('hue', parsers.uint8),
    parsers.property('direction', parsers.uint8),
    parsers.property('transitionTime', parsers.uint16),
));

messages.register(MessageType.EnhancedMoveToHue, parsers.object<MoveToHue>(
    parsers.property('addressMode', parsers.uint8),
    parsers.property('targetShortAddress', parsers.uint16),
    parsers.property('sourceEndpoint', parsers.uint8),
    parsers.property('destinationEndpoint', parsers.uint8),
    parsers.property('direction', parsers.uint8),
    parsers.property('hue', parsers.uint16),
    parsers.property('transitionTime', parsers.uint16),
));

messages.register(MessageType.MoveHue, parsers.object<MoveHue>(
    parsers.property('addressMode', parsers.uint8),
    parsers.property('targetShortAddress', parsers.uint16),
    parsers.property('sourceEndpoint', parsers.uint8),
    parsers.property('destinationEndpoint', parsers.uint8),
    parsers.property('mode', parsers.uint8),
    parsers.property('rate', parsers.uint8),
));

messages.register(MessageType.EnhancedMoveHue, parsers.object<MoveHue>(
    parsers.property('addressMode', parsers.uint8),
    parsers.property('targetShortAddress', parsers.uint16),
    parsers.property('sourceEndpoint', parsers.uint8),
    parsers.property('destinationEndpoint', parsers.uint8),
    parsers.property('mode', parsers.uint8),
    parsers.property('rate', parsers.uint8),
));

messages.register(MessageType.StepHue, parsers.object<StepHue>(
    parsers.property('addressMode', parsers.uint8),
    parsers.property('targetShortAddress', parsers.uint16),
    parsers.property('sourceEndpoint', parsers.uint8),
    parsers.property('destinationEndpoint', parsers.uint8),
    parsers.property('mode', parsers.uint8),
    parsers.property('stepSize', parsers.uint8),
    parsers.property('transitionTime', parsers.uint8),
));

messages.register(MessageType.EnhancedStepHue, parsers.object<StepHue>(
    parsers.property('addressMode', parsers.uint8),
    parsers.property('targetShortAddress', parsers.uint16),
    parsers.property('sourceEndpoint', parsers.uint8),
    parsers.property('destinationEndpoint', parsers.uint8),
    parsers.property('mode', parsers.uint8),
    parsers.property('stepSize', parsers.uint8),
    parsers.property('transitionTime', parsers.uint8),
));

messages.register(MessageType.MoveToSaturation, parsers.object<MoveToSaturation>(
    parsers.property('addressMode', parsers.uint8),
    parsers.property('targetShortAddress', parsers.uint16),
    parsers.property('sourceEndpoint', parsers.uint8),
    parsers.property('destinationEndpoint', parsers.uint8),
    parsers.property('saturation', parsers.uint8),
    parsers.property('transitionTime', parsers.uint16),
));

messages.register(MessageType.MoveSaturation, parsers.object<MoveSaturation>(
    parsers.property('addressMode', parsers.uint8),
    parsers.property('targetShortAddress', parsers.uint16),
    parsers.property('sourceEndpoint', parsers.uint8),
    parsers.property('destinationEndpoint', parsers.uint8),
    parsers.property('mode', parsers.uint8),
    parsers.property('rate', parsers.uint8),
));

messages.register(MessageType.StepSaturation, parsers.object<StepSaturation>(
    parsers.property('addressMode', parsers.uint8),
    parsers.property('targetShortAddress', parsers.uint16),
    parsers.property('sourceEndpoint', parsers.uint8),
    parsers.property('destinationEndpoint', parsers.uint8),
    parsers.property('mode', parsers.uint8),
    parsers.property('stepSize', parsers.uint8),
    parsers.property('transitionTime', parsers.uint8),
));

messages.register(MessageType.MoveToHueAndSaturation, parsers.object<MoveToHueAndSaturation>(
    parsers.property('addressMode', parsers.uint8),
    parsers.property('targetShortAddress', parsers.uint16),
    parsers.property('sourceEndpoint', parsers.uint8),
    parsers.property('destinationEndpoint', parsers.uint8),
    parsers.property('hue', parsers.uint8),
    parsers.property('saturation', parsers.uint8),
    parsers.property('transitionTime', parsers.uint16),
));

messages.register(MessageType.EnhancedMoveToHueAndSaturation, parsers.object<MoveToHueAndSaturation>(
    parsers.property('addressMode', parsers.uint8),
    parsers.property('targetShortAddress', parsers.uint16),
    parsers.property('sourceEndpoint', parsers.uint8),
    parsers.property('destinationEndpoint', parsers.uint8),
    parsers.property('hue', parsers.uint32),
    parsers.property('saturation', parsers.uint32),
    parsers.property('transitionTime', parsers.uint16),
));

messages.register(MessageType.MoveToColor, parsers.object<MoveToColor>(
    parsers.property('addressMode', parsers.uint8),
    parsers.property('targetShortAddress', parsers.uint16),
    parsers.property('sourceEndpoint', parsers.uint8),
    parsers.property('destinationEndpoint', parsers.uint8),
    parsers.property('colorX', parsers.uint16),
    parsers.property('colorY', parsers.uint16),
    parsers.property('transitionTime', parsers.uint16),
));

messages.register(MessageType.MoveColor, parsers.object<MoveToColor>(
    parsers.property('addressMode', parsers.uint8),
    parsers.property('targetShortAddress', parsers.uint16),
    parsers.property('sourceEndpoint', parsers.uint8),
    parsers.property('destinationEndpoint', parsers.uint8),
    parsers.property('colorX', parsers.uint16),
    parsers.property('colorY', parsers.uint16),
));
messages.register(MessageType.StepColor, parsers.object<StepColor>(
    parsers.property('addressMode', parsers.uint8),
    parsers.property('targetShortAddress', parsers.uint16),
    parsers.property('sourceEndpoint', parsers.uint8),
    parsers.property('destinationEndpoint', parsers.uint8),
    parsers.property('stepX', parsers.uint16),
    parsers.property('stepY', parsers.uint16),
    parsers.property('transitionTime', parsers.uint16),
));

messages.register(MessageType.ColorLoopSet, parsers.object<ColorLoopSet>(
    parsers.property('addressMode', parsers.uint8),
    parsers.property('targetShortAddress', parsers.uint16),
    parsers.property('sourceEndpoint', parsers.uint8),
    parsers.property('destinationEndpoint', parsers.uint8),
    parsers.property('updateFlags', parsers.uint8),
    parsers.property('action', parsers.uint8),
    parsers.property('direction', parsers.uint8),
    parsers.property('time', parsers.uint8),
    parsers.property('startHue', parsers.uint32),
));

messages.register(MessageType.StopMoveStep, parsers.object<CommandMessage>(
    parsers.property('addressMode', parsers.uint8),
    parsers.property('targetShortAddress', parsers.uint16),
    parsers.property('sourceEndpoint', parsers.uint8),
    parsers.property('destinationEndpoint', parsers.uint8),
));

export interface MoveToHue extends CommandMessage
{
    hue: uint8;
    direction: uint8;
    transitionTime: uint16;
}

export interface MoveHue extends CommandMessage
{
    mode: uint8;
    rate: uint8;
}

export interface StepHue extends CommandMessage
{
    mode: uint8;
    stepSize: uint8;
    transitionTime: uint8;
}

export interface MoveToSaturation extends CommandMessage
{
    saturation: uint8;
    transitionTime: uint8;
}

export interface MoveSaturation extends CommandMessage
{
    mode: uint8;
    rate: uint8;
}

export interface StepSaturation extends CommandMessage
{
    mode: uint8;
    stepSize: uint8;
    transitionTime: uint8;
}

export interface MoveToHueAndSaturation extends CommandMessage
{
    hue: uint8;
    saturation: uint8;
    transitionTime: uint8;
}

export interface MoveToColor extends CommandMessage
{
    colorX: uint16;
    colorY: uint16;
    transitionTime: uint16;
}

export interface StepColor extends CommandMessage
{
    stepX: uint16;
    stepY: uint16;
    transitionTime: uint16;
}

export interface EnhancedMoveToHue extends CommandMessage
{
    enhancedHue: uint16;
    direction: uint8;
    transitionTime: uint16;
}

export interface EnhancedMoveHue extends CommandMessage
{
    mode: uint8;
    rate: uint8;
}

export interface EnhancedStepHue extends CommandMessage
{
    mode: uint8;
    stepSize: uint8;
    transitionTime: uint8;
}

export interface EnhancedMoveToHueAndSaturation extends CommandMessage
{
    enhancedHue: uint16;
    saturation: uint16;
    transitionTime: uint8;
}

export interface ColorLoopSet extends CommandMessage
{
    updateFlags: uint8;
    action: uint8;
    direction: uint8;
    time: uint8;
    startHue: number;
}