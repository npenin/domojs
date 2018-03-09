import { MessageType, Protocol, uint8 } from './common';

export interface StatusMessage
{
    status: Status;
    subType?: MessageType;
    message: string;
    sequenceNumber: uint8;
}

Protocol.register<StatusMessage>('type', MessageType.Status, [
    { name: 'status', type: 'uint8' },
    { name: 'sequenceNumber', type: 'uint8' },
    { name: 'subType', type: 'uint16', optional: true },
    { name: 'message', type: 'string', optional: true, length: 'uint8' }
]);

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

Protocol.register<DefaultResponse>('type', MessageType.DefaultResponse, [
    { name: 'sequenceNumber', type: 'uint8' },
    { name: 'endpoint', type: 'uint8' },
    { name: 'clusterId', type: 'uint8' },
    { name: 'commandId', type: 'uint8' },
    { name: 'statusCode', type: 'uint8' },
])

export interface DefaultResponse extends StatusMessage
{
    endpoint: uint8;
    clusterId: uint8;
    commandId: uint8;
    statusCode: uint8;
}