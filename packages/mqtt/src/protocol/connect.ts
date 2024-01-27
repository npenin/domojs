import { parsers, uint16, uint8 } from '@akala/protocol-parser';
import { header, Message as CoreMessage, payload } from './_protocol.js'
import { ControlPacketType, Properties, propertiesParser } from './_shared.js';

export interface Header
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
}

export interface Payload
{
    clientId: string,
    willProperties?: Properties,
    willTopic?: string,
    willPayload?: Buffer,
    userName: string,
    password: Buffer,
}

export type Message = { header: Header, payload: Payload };

header.register(ControlPacketType.CONNECT,
    parsers.prepare(m =>
    {
        m.header.hasPassword = typeof m.payload.password != 'undefined';
        m.header.hasUserName = typeof m.payload.userName != 'undefined';
        m.header.hasWill = typeof m.payload.willTopic != 'undefined' || typeof m.payload.willPayload != 'undefined' || typeof m.payload.willProperties != 'undefined'
        if (m.header.hasWill && (typeof m.payload.willTopic == 'undefined' || typeof m.payload.willPayload == 'undefined' || typeof m.payload.willProperties === 'undefined'))
            throw new Error('Invalid will');
    },
        parsers.object<Message>(
            parsers.complexProperty<Message, 'header'>('header', parsers.object<Header>(
                parsers.property('protocol', parsers.string(parsers.uint16)),
                parsers.prefixedSeries<Header>(parsers.vuint,
                    parsers.property('version', parsers.uint8),
                    parsers.property('hasUserName', parsers.boolean()),
                    parsers.property('hasPassword', parsers.boolean()),
                    parsers.property('willRetain', parsers.boolean()),
                    parsers.property('willQoS', parsers.uint2),
                    parsers.property('hasWill', parsers.boolean()),
                    parsers.property('cleanStart', parsers.boolean()),
                    parsers.property('reservedConnectFlag', parsers.boolean()),
                    parsers.property('keepAlive', parsers.uint16)
                )
            ))
        ))
);

payload.register(ControlPacketType.CONNECT,
    parsers.object<Message>(
        parsers.complexProperty<Message, 'payload'>('payload', parsers.object<Payload>(parsers.property('clientId', parsers.string(parsers.vuint)))),
        parsers.condition(m => m.header.hasWill, parsers.complexProperty<Message, 'payload'>('payload', parsers.object<Payload>(parsers.property('willProperties', propertiesParser)))),
        parsers.condition(m => m.header.hasWill, parsers.complexProperty<Message, 'payload'>('payload', parsers.object<Payload>(parsers.property('willTopic', parsers.string(parsers.uint16))))),
        parsers.condition(m => m.header.hasWill, parsers.complexProperty<Message, 'payload'>('payload', parsers.object<Payload>(parsers.property('willPayload', parsers.buffer(parsers.uint16))))),
        parsers.condition(m => m.header.hasUserName, parsers.complexProperty<Message, 'payload'>('payload', parsers.object<Payload>(parsers.property('userName', parsers.string(parsers.uint16))))),
        parsers.condition(m => m.header.hasPassword, parsers.complexProperty<Message, 'payload'>('payload', parsers.object<Payload>(parsers.property('password', parsers.buffer(parsers.uint16)))))
    )
);