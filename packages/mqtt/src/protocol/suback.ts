import { parsers } from '@akala/protocol-parser';
import { ControlPacketType, Properties, propertiesFrame, Protocol, Message as CoreMessage } from './_protocol.js'


export default interface Message extends CoreMessage
{
    packetId: number;
    properties: Properties;
}

Protocol.register(ControlPacketType.SUBACK, parsers.object<Message>(
    parsers.property('packetId', parsers.uint16),
    parsers.property('properties', propertiesFrame)
));