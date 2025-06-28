import { parsers } from '@akala/protocol-parser';
import { header, Message as CoreMessage } from './_protocol.js'
import { ControlPacketType, Properties, propertiesParser, ReasonCodes } from './_shared.js';


export interface Message extends CoreMessage
{
    packetId: number;
    properties: Properties;
    reasonCode: ReasonCodes
}

header.register(ControlPacketType.SUBACK, parsers.series<Message>(
    parsers.property('packetId', parsers.uint16),
    parsers.property('properties', propertiesParser),
    parsers.property('reasonCode', parsers.uint8),
));