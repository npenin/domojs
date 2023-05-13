import { parsers } from '@domojs/protocol-parser';
import { ControlPacketType, Properties, propertiesFrame, Protocol, Message as CoreMessage } from './_protocol.js'


export default interface Message extends CoreMessage
{
    properties: Properties;
    packetId: number;
    topics: string[]
}

Protocol.register(ControlPacketType.UNSUBACK, parsers.object<Message>(
    parsers.property('properties', propertiesFrame),
    parsers.property('topics', parsers.array<string, Message>(-1, parsers.string(parsers.uint16)))
));