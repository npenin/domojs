import { uint16, uint8 } from '@domojs/protocol-parser';
import { ControlPacketType, Properties, propertiesFrame, Protocol, Message as CoreMessage } from './protocol'

export default interface Message extends CoreMessage
{
    protocol: string;
    version: uint8;
    hasUserName?: boolean;
    hasPassword?: boolean;
    willRetain?: boolean;
    willQoS?: number;
    hasWill?: boolean;
    cleanStart?: boolean;
    reservedConnectFlag: false;
    keepAlive: uint16;
    properties: Properties,
    clientId: string,
    willProperties?: boolean,
    willTopic?: string,
    willPayload?: boolean,
    userName: string,
    password: string,
}

messages.register(ControlPacketType.CONNECT, parsers.object<Message>(
    { name: 'protocol', type: 'string', length: 'uint16' },
    parsers.property('version', parsers.uint8),
    parsers.property('hasUserName', parsers.bit),
    parsers.property('hasPassword', parsers.bit),
    parsers.property('willRetain', parsers.bit),
    parsers.property('willQoS', parsers.uint2),
    parsers.property('hasWill', parsers.bit),
    parsers.property('cleanStart', parsers.bit),
    parsers.property('reservedConnectFlag', parsers.bit),
    parsers.property('keepAlive', parsers.uint16),
    parsers.property('clientId', parsers.string),
    Object.assign({}, propertiesFrame, { name: 'willProperties' }),
    { name: 'willTopic', optional: 'hasWill', type: 'string', length: 'uint16' },
    { name: 'willPayload', optional: 'hasWill', type: 'buffer', length: 'uint16' },
    { name: 'userName', optional: 'hasUserName', type: 'string', length: 'uint16' },
    { name: 'password', optional: 'hasPassword', type: 'buffer', length: 'uint16' },
], m =>
    {
        m.hasPassword = typeof m.password != 'undefined';
        m.hasUserName = typeof m.userName != 'undefined';
        m.hasWill = typeof m.willTopic != 'undefined' || typeof m.willPayload != 'undefined' || typeof m.willProperties != 'undefined'
        if (m.hasWill && (typeof m.willTopic == 'undefined' || typeof m.willPayload == 'undefined' || typeof m.willProperties === 'undefined'))
            throw new Error('Invalid will');
    });