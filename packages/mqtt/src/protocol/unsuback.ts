import { parsers } from '@akala/protocol-parser';
import { header, Message as CoreMessage } from './_protocol.js'
import { ControlPacketType, Properties, propertiesParser } from './_shared.js';

export interface Message extends CoreMessage
{
    properties: Properties;
    packetId: number;
    topics: string[]
}


header.register(ControlPacketType.UNSUBACK, parsers.series<Message>(
    parsers.property('properties', propertiesParser),
    parsers.property('topics', parsers.array<string, Message>(-1, parsers.string(parsers.uint16)))
));