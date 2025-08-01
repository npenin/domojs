import { parsers, uint16 } from '@akala/protocol-parser';
import { header } from './_protocol.js'
import { ControlPacketType, Properties, propertiesParser, Message as CoreMessage, ReasonCodes } from './_shared.js';

export interface Message extends CoreMessage<ControlPacketType.UNSUBACK>
{
    properties: Properties;
    reason: ReasonCodes
    packetId: uint16;
}


header.register(ControlPacketType.UNSUBACK, parsers.series<Message>(
    parsers.property('packetId', parsers.uint16),
    parsers.property('properties', propertiesParser),
    parsers.property('reason', parsers.uint8),

) as parsers.ParserWithMessage<CoreMessage, CoreMessage>);
