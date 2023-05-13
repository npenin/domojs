import { parsers, uint16 } from '@domojs/protocol-parser';
import { ControlPacketType, Properties, propertiesFrame, Protocol, Message as CoreMessage } from './_protocol.js'

export default interface Message extends CoreMessage
{
    topic: string;
    packetId: uint16;
    properties: Properties;
}

Protocol.register(ControlPacketType.PUBLISH, parsers.object<Message>(
    parsers.property('topic', parsers.string(parsers.uint16)),
    parsers.property('packetId', parsers.condition<number, Message>(m => m.qos > 0, parsers.uint16)),
    parsers.property('properties', propertiesFrame),
));