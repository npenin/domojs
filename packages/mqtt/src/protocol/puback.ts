import { parsers, uint16 } from '@akala/protocol-parser';
import { header } from './_protocol.js'
import { ControlPacketType, Properties, ReasonCodes, propertiesParser, Message as CoreMessage } from './_shared.js';


export interface Message extends CoreMessage<ControlPacketType.PUBACK>
{
    packetId: uint16;
    reason: ReasonCodes;
    properties: Properties;
}

header.register(ControlPacketType.PUBACK, parsers.series<Message>(
    parsers.property('packetId', parsers.uint16),
    parsers.property('reason', parsers.optional(parsers.uint8)),
    parsers.property('properties', parsers.optional(propertiesParser)),
) as parsers.ParserWithMessage<CoreMessage, CoreMessage>);