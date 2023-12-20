import { parsers, uint16 } from '@akala/protocol-parser';
import { ControlPacketType, Properties, propertiesFrame, Protocol, Message as CoreMessage, ReasonCodes } from './_protocol.js'


export default interface Message extends CoreMessage
{
    packetId: uint16;
    reason: ReasonCodes;
    properties: Properties;
}

Protocol.register(ControlPacketType.PUBACK, parsers.object<Message>(
    parsers.property('packetId', parsers.uint16),
    parsers.property('reason', parsers.uint8),
    parsers.property('properties', propertiesFrame),
));