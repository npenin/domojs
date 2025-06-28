import { parsers, uint16 } from '@akala/protocol-parser';
import { header, Message as CoreMessage } from './_protocol.js'
import { ControlPacketType, Properties, ReasonCodes, propertiesParser } from './_shared.js';


export interface Message extends CoreMessage
{
    packetId: uint16;
    reason: ReasonCodes;
    properties: Properties;
}

header.register(ControlPacketType.PUBREL, parsers.series<Message>(
    parsers.property('packetId', parsers.uint16),
    parsers.property('reason', parsers.uint8),
    parsers.property('properties', propertiesParser),
));