import { StatusMessage } from './status';
import { Message, MessageType, uint8, uint16, Protocol } from './common';
import { ShortAddressRequest } from './descriptors';

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

Protocol.register<LogMessage>('type', MessageType.LogMessage, [{ name: 'level', type: 'uint8' }, { name: 'message', type: 'string' }]);