import { parsers, uint16, uint8 } from '@akala/protocol-parser';
import { header } from './_protocol.js'
import { ControlPacketType, Properties, propertiesParser, Message as CoreMessage, PropertyKeys } from './_shared.js';
import { IsomorphicBuffer } from '@akala/core';

export interface Message extends CoreMessage<ControlPacketType.PUBLISH>
{
    topic: string;
    packetId: uint16;
    properties: Properties;
    binaryPayload?: IsomorphicBuffer;
    stringPayload?: string;
}

header.register(ControlPacketType.PUBLISH,
    parsers.series<Message>(
        parsers.property('topic', parsers.string(parsers.uint16)),
        parsers.condition<Message['packetId'], Message>(m => m.qos > 0, parsers.property('packetId', parsers.uint16)),
        parsers.property('properties', propertiesParser),
        parsers.choose<Message, number, IsomorphicBuffer | string>((m: Message) => m.properties?.find(p => p.property == PropertyKeys.payloadFormat)?.value as uint8 ?? 0, {
            0: parsers.property<Message, 'binaryPayload', parsers.AnyParser<Message['binaryPayload'], Message>>('binaryPayload', parsers.buffer(-1, false)),
            1: parsers.property<Message, 'stringPayload', parsers.AnyParser<Message['stringPayload'], Message>>('stringPayload', parsers.string(-1, 'utf-8'))
        })
    ) as parsers.ParserWithMessage<CoreMessage, CoreMessage>
);