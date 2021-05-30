import { parsers, uint8 } from '@domojs/protocol-parser';
import { messages, MessageType } from './_common';

export interface StatusMessage
{
    status: Status;
    subType?: MessageType;
    message: string;
    sequenceNumber: uint8;
}

messages.register(MessageType.Status, parsers.object<StatusMessage>(
    parsers.property('status', parsers.uint8),
    parsers.property('sequenceNumber', parsers.uint8),
    parsers.optional(parsers.property('subType', parsers.uint16)),
    parsers.optional(parsers.property('message', parsers.string(parsers.uint8)))
));

export enum Status
{
    Success = 0,
    IncorrectParameters = 1,
    UnhandledCommand = 2,
    CommandFailed = 3,
    // Node is carrying out a lengthy operation and is currently unable to handle the incoming command
    Busy = 4,
    StackAlreadyStarted = 5
}

messages.register(MessageType.DefaultResponse, parsers.object<DefaultResponse>(
    parsers.property('sequenceNumber', parsers.uint8),
    parsers.property('endpoint', parsers.uint8),
    parsers.property('clusterId', parsers.uint8),
    parsers.property('commandId', parsers.uint8),
    parsers.property('statusCode', parsers.uint8),
))

export interface DefaultResponse extends StatusMessage
{
    endpoint: uint8;
    clusterId: uint8;
    commandId: uint8;
    statusCode: uint8;
}