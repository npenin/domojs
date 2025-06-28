import { parsers } from '@akala/protocol-parser';
import { header } from './_protocol.js'
import { ControlPacketType, Properties, propertiesParser, Message as CoreMessage } from './_shared.js';

export interface Message extends CoreMessage
{
    properties: Properties;
    packetId: number;
    topics: string[]
}


header.register(ControlPacketType.UNSUBSCRIBE, parsers.series<Message>(
    parsers.property('packetId', parsers.uint16),
    parsers.property('properties', propertiesParser),
    parsers.property('topics', parsers.array<string, Message>(-1, parsers.string(parsers.uint16)))
));