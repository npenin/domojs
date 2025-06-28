import { parsers, uint16, uint8 } from '@akala/protocol-parser';
import { header } from './_protocol.js'
import { ControlPacketType, Properties, propertiesParser, Message as CoreMessage, stringParser } from './_shared.js';
import { IsomorphicBuffer } from '@akala/core';

export interface Header
{
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
    payload: Payload
}

export interface Payload
{
    clientId: string,
    willProperties?: Properties,
    willTopic?: string,
    willPayload?: IsomorphicBuffer,
    userName: string,
    password: IsomorphicBuffer,
}

export interface Message extends CoreMessage, Header
{
    protocol: string;

}

header.register(ControlPacketType.CONNECT,
    parsers.prepare(m =>
    {
        if (!m.protocol)
            m.protocol = 'MQTT';
        if (!m.version)
            m.version = 5;
        if (!m.properties)
            m.properties = [];
        m.hasPassword = typeof m.payload?.password != 'undefined';
        m.hasUserName = typeof m.payload?.userName != 'undefined';
        m.hasWill = typeof m.payload?.willTopic != 'undefined' || typeof m.payload?.willPayload != 'undefined' || typeof m.payload?.willProperties != 'undefined'
        if (m.hasWill && (typeof m.payload?.willTopic == 'undefined' || typeof m.payload?.willPayload == 'undefined' || typeof m.payload?.willProperties === 'undefined'))
            throw new Error('Invalid will');
    },
        parsers.series<Message>(
            parsers.property('protocol', parsers.string(parsers.uint16)),
            parsers.property('version', parsers.uint8),
            parsers.property('reservedConnectFlag', parsers.boolean()),
            parsers.property('cleanStart', parsers.boolean()),
            parsers.property('hasWill', parsers.boolean()),
            parsers.property('willQoS', parsers.uint2),
            parsers.property('willRetain', parsers.boolean()),
            parsers.property('hasPassword', parsers.boolean()),
            parsers.property('hasUserName', parsers.boolean()),
            parsers.property('keepAlive', parsers.uint16),
            parsers.property('properties', propertiesParser),
            parsers.complexProperty<Message, 'payload'>('payload', parsers.object<Payload>(parsers.property('clientId', stringParser))),
            parsers.condition(m => m.hasWill, parsers.complexProperty<Message, 'payload'>('payload', parsers.object<Payload>(parsers.property('willProperties', propertiesParser)))),
            parsers.condition(m => m.hasWill, parsers.complexProperty<Message, 'payload'>('payload', parsers.object<Payload>(parsers.property('willTopic', stringParser)))),
            parsers.condition(m => m.hasWill, parsers.complexProperty<Message, 'payload'>('payload', parsers.object<Payload>(parsers.property('willPayload', parsers.buffer(parsers.uint16))))),
            parsers.condition(m => m.hasUserName, parsers.complexProperty<Message, 'payload'>('payload', parsers.object<Payload>(parsers.property('userName', stringParser)))),
            parsers.condition(m => m.hasPassword, parsers.complexProperty<Message, 'payload'>('payload', parsers.object<Payload>(parsers.property('password', parsers.buffer(parsers.uint16)))))
        ))
)