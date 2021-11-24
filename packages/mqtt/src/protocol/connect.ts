import { parsers, uint16, uint8 } from '@domojs/protocol-parser';
import { ControlPacketType, Properties, propertiesFrame, Protocol, Message as CoreMessage } from './_protocol'

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
    reservedConnectFlag?: boolean;
    keepAlive?: uint16;
    properties: Properties,
    clientId: string,
    willProperties?: Properties,
    willTopic?: string,
    willPayload?: Buffer,
    userName: string,
    password: Buffer,
}

Protocol.register(ControlPacketType.CONNECT, parsers.prepare(m =>
{
    m.hasPassword = typeof m.password != 'undefined';
    m.hasUserName = typeof m.userName != 'undefined';
    m.hasWill = typeof m.willTopic != 'undefined' || typeof m.willPayload != 'undefined' || typeof m.willProperties != 'undefined'
    if (m.hasWill && (typeof m.willTopic == 'undefined' || typeof m.willPayload == 'undefined' || typeof m.willProperties === 'undefined'))
        throw new Error('Invalid will');
}, parsers.object<Message>(
    parsers.property('protocol', parsers.string(parsers.uint16)),
    parsers.prefixedSeries<Message>(parsers.vuint,
        parsers.property('version', parsers.uint8),
        parsers.property('hasUserName', parsers.boolean()),
        parsers.property('hasPassword', parsers.boolean()),
        parsers.property('willRetain', parsers.boolean()),
        parsers.property('willQoS', parsers.uint2),
        parsers.property('hasWill', parsers.boolean()),
        parsers.property('cleanStart', parsers.boolean()),
        parsers.property('reservedConnectFlag', parsers.boolean()),
        parsers.property('keepAlive', parsers.uint16),
        parsers.property('clientId', parsers.string(parsers.vuint)),
        parsers.condition<Properties, Partial<Message>>(m => m.hasWill, parsers.property('willProperties', propertiesFrame)),
        parsers.condition<string, Partial<Message>>(m => m.hasWill, parsers.property('willTopic', parsers.string(parsers.uint16))),
        parsers.condition<Buffer, Partial<Message>>(m => m.hasWill, parsers.property('willPayload', parsers.buffer(parsers.uint16))),
        parsers.condition<string, Partial<Message>>(m => m.hasUserName, parsers.property('userName', parsers.string(parsers.uint16))),
        parsers.condition<Buffer, Partial<Message>>(m => m.hasPassword, parsers.property('password', parsers.buffer(parsers.uint16)))
    )
)
));