import { parsers, uint16, uint8 } from '@domojs/protocol-parser';
import { ControlPacketType, Properties, propertiesFrame, Protocol, Message as CoreMessage, ReasonCodes } from './_protocol'


export default interface Message extends CoreMessage
{
    properties: Properties;
    packetId: number;
    topics: string[]
}

Protocol.register(ControlPacketType.UNSUBSCRIBE, parsers.object<Message>(
    parsers.property('packetId', parsers.uint16),
    parsers.property('properties', propertiesFrame),
    parsers.property('topics', parsers.array<string, Message>(-1, parsers.string(parsers.uint16)))
));