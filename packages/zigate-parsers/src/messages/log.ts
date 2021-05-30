import { MessageType, messages } from './_common';
import { parsers } from '@domojs/protocol-parser';

export enum LogLevel
{
    Emergency = 0,
    Alert = 1,
    Critical = 2,
    Error = 3,
    Warning = 4,
    Notice = 5,
    Information = 6,
    Debug = 7
}

export interface LogMessage
{
    level: LogLevel;
    message: string
}

messages.register(MessageType.LogMessage, parsers.object<LogMessage>(
    parsers.property('level', parsers.uint8),
    parsers.property('message', parsers.string(-1))
));