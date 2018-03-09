import { StatusMessage } from './status';
import { Message, MessageType, uint8, uint16, Protocol } from './common';
import { ShortAddressRequest } from 'zigate/src/messages/descriptors';
import { CommandMessage } from 'zigate/src/messages/move';



Protocol.register<MoveToHue>('type', MessageType.MoveToHue, [
    { name: 'addressMode', type: 'uint8' },
    { name: 'targetShortAddress', type: 'uint16' },
    { name: 'sourceEndpoint', type: 'uint8' },
    { name: 'destinationEndpoint', type: 'uint8' },
    { name: 'hue', type: 'uint8' },
    { name: 'direction', type: 'uint8' },
    { name: 'transitionTime', type: 'uint16' },
]);

Protocol.register<MoveToHue>('type', MessageType.EnhancedMoveToHue, [
    { name: 'addressMode', type: 'uint8' },
    { name: 'targetShortAddress', type: 'uint16' },
    { name: 'sourceEndpoint', type: 'uint8' },
    { name: 'destinationEndpoint', type: 'uint8' },
    { name: 'direction', type: 'uint8' },
    { name: 'hue', type: 'uint16' },
    { name: 'transitionTime', type: 'uint16' },
]);

Protocol.register<MoveHue>('type', MessageType.MoveHue, [
    { name: 'addressMode', type: 'uint8' },
    { name: 'targetShortAddress', type: 'uint16' },
    { name: 'sourceEndpoint', type: 'uint8' },
    { name: 'destinationEndpoint', type: 'uint8' },
    { name: 'mode', type: 'uint8' },
    { name: 'rate', type: 'uint8' },
]);

Protocol.register<MoveHue>('type', MessageType.EnhancedMoveHue, [
    { name: 'addressMode', type: 'uint8' },
    { name: 'targetShortAddress', type: 'uint16' },
    { name: 'sourceEndpoint', type: 'uint8' },
    { name: 'destinationEndpoint', type: 'uint8' },
    { name: 'mode', type: 'uint8' },
    { name: 'rate', type: 'uint8' },
]);

Protocol.register<StepHue>('type', MessageType.StepHue, [
    { name: 'addressMode', type: 'uint8' },
    { name: 'targetShortAddress', type: 'uint16' },
    { name: 'sourceEndpoint', type: 'uint8' },
    { name: 'destinationEndpoint', type: 'uint8' },
    { name: 'mode', type: 'uint8' },
    { name: 'stepSize', type: 'uint8' },
    { name: 'transitionTime', type: 'uint8' },
]);

Protocol.register<StepHue>('type', MessageType.EnhancedStepHue, [
    { name: 'addressMode', type: 'uint8' },
    { name: 'targetShortAddress', type: 'uint16' },
    { name: 'sourceEndpoint', type: 'uint8' },
    { name: 'destinationEndpoint', type: 'uint8' },
    { name: 'mode', type: 'uint8' },
    { name: 'stepSize', type: 'uint8' },
    { name: 'transitionTime', type: 'uint8' },
]);

Protocol.register<MoveToSaturation>('type', MessageType.MoveToSaturation, [
    { name: 'addressMode', type: 'uint8' },
    { name: 'targetShortAddress', type: 'uint16' },
    { name: 'sourceEndpoint', type: 'uint8' },
    { name: 'destinationEndpoint', type: 'uint8' },
    { name: 'saturation', type: 'uint8' },
    { name: 'transitionTime', type: 'uint16' },
]);

Protocol.register<MoveSaturation>('type', MessageType.MoveSaturation, [
    { name: 'addressMode', type: 'uint8' },
    { name: 'targetShortAddress', type: 'uint16' },
    { name: 'sourceEndpoint', type: 'uint8' },
    { name: 'destinationEndpoint', type: 'uint8' },
    { name: 'mode', type: 'uint8' },
    { name: 'rate', type: 'uint8' },
]);

Protocol.register<StepSaturation>('type', MessageType.StepSaturation, [
    { name: 'addressMode', type: 'uint8' },
    { name: 'targetShortAddress', type: 'uint16' },
    { name: 'sourceEndpoint', type: 'uint8' },
    { name: 'destinationEndpoint', type: 'uint8' },
    { name: 'mode', type: 'uint8' },
    { name: 'stepSize', type: 'uint8' },
    { name: 'transitionTime', type: 'uint8' },
]);

Protocol.register<MoveToHueAndSaturation>('type', MessageType.MoveToHueAndSaturation, [
    { name: 'addressMode', type: 'uint8' },
    { name: 'targetShortAddress', type: 'uint16' },
    { name: 'sourceEndpoint', type: 'uint8' },
    { name: 'destinationEndpoint', type: 'uint8' },
    { name: 'hue', type: 'uint8' },
    { name: 'saturation', type: 'uint8' },
    { name: 'transitionTime', type: 'uint16' },
]);

Protocol.register<MoveToHueAndSaturation>('type', MessageType.EnhancedMoveToHueAndSaturation, [
    { name: 'addressMode', type: 'uint8' },
    { name: 'targetShortAddress', type: 'uint16' },
    { name: 'sourceEndpoint', type: 'uint8' },
    { name: 'destinationEndpoint', type: 'uint8' },
    { name: 'hue', type: 'uint32' },
    { name: 'saturation', type: 'uint32' },
    { name: 'transitionTime', type: 'uint16' },
]);

Protocol.register<MoveToColor>('type', MessageType.MoveToColor, [
    { name: 'addressMode', type: 'uint8' },
    { name: 'targetShortAddress', type: 'uint16' },
    { name: 'sourceEndpoint', type: 'uint8' },
    { name: 'destinationEndpoint', type: 'uint8' },
    { name: 'colorX', type: 'uint16' },
    { name: 'colorY', type: 'uint16' },
    { name: 'transitionTime', type: 'uint16' },
]);

Protocol.register<MoveToColor>('type', MessageType.MoveColor, [
    { name: 'addressMode', type: 'uint8' },
    { name: 'targetShortAddress', type: 'uint16' },
    { name: 'sourceEndpoint', type: 'uint8' },
    { name: 'destinationEndpoint', type: 'uint8' },
    { name: 'colorX', type: 'uint16' },
    { name: 'colorY', type: 'uint16' },
]);
Protocol.register<StepColor>('type', MessageType.StepColor, [
    { name: 'addressMode', type: 'uint8' },
    { name: 'targetShortAddress', type: 'uint16' },
    { name: 'sourceEndpoint', type: 'uint8' },
    { name: 'destinationEndpoint', type: 'uint8' },
    { name: 'stepX', type: 'uint16' },
    { name: 'stepY', type: 'uint16' },
    { name: 'transitionTime', type: 'uint16' },
]);

Protocol.register<ColorLoopSet>('type', MessageType.ColorLoopSet, [
    { name: 'addressMode', type: 'uint8' },
    { name: 'targetShortAddress', type: 'uint16' },
    { name: 'sourceEndpoint', type: 'uint8' },
    { name: 'destinationEndpoint', type: 'uint8' },
    { name: 'updateFlags', type: 'uint8' },
    { name: 'action', type: 'uint8' },
    { name: 'direction', type: 'uint8' },
    { name: 'time', type: 'uint8' },
    { name: 'startHue', type: 'uint32' },
]);

Protocol.register<CommandMessage>('type', MessageType.StopMoveStep, [
    { name: 'addressMode', type: 'uint8' },
    { name: 'targetShortAddress', type: 'uint16' },
    { name: 'sourceEndpoint', type: 'uint8' },
    { name: 'destinationEndpoint', type: 'uint8' },
])

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