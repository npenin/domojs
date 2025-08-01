import { parsers } from '@akala/protocol-parser';
import { header } from './_protocol.js'
import { ControlPacketType, Properties, propertiesParser, ReasonCodes, Message as CoreMessage } from './_shared.js';


export interface Message extends CoreMessage<ControlPacketType.SUBACK>
{
    packetId: number;
    properties: Properties;
    reason: ReasonCodes
}

header.register(ControlPacketType.SUBACK, parsers.series<Message>(
    parsers.property('packetId', parsers.uint16),
    parsers.property('properties', propertiesParser),
    parsers.property('reason', parsers.uint8),
) as parsers.ParserWithMessage<CoreMessage, CoreMessage>);