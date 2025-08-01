import { parsers } from '@akala/protocol-parser';
import { header, MessageParser } from './_protocol.js'
import { ControlPacketType, Properties, propertiesParser, Message as CoreMessage } from './_shared.js';

export interface Message extends CoreMessage<ControlPacketType.UNSUBSCRIBE>
{
    properties: Properties;
    packetId: number;
    topics: string[]
}


header.register(ControlPacketType.UNSUBSCRIBE, parsers.series<Message>(
    parsers.property('packetId', parsers.uint16),
    parsers.property('properties', propertiesParser),
    parsers.property('topics', parsers.array<string, Message>(-1, parsers.string(parsers.uint16)))
) as parsers.ParserWithMessage<CoreMessage, CoreMessage>);


export const UnsubscribeParser =
    parsers.object<Message>(
        parsers.prepare<Message, Message>(m =>
        {
            m.qos = 1;
            m.type = ControlPacketType.UNSUBSCRIBE
        },
            parsers.series<Message>(
                MessageParser as any,
                parsers.sub(parsers.unsignedLEB128, header) as any
            )
        )
    );