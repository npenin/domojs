import { parsers } from '@akala/protocol-parser';
import { header } from './_protocol.js';
import { ControlPacketType, Properties, ReasonCodes, propertiesParser, Message as CoreMessage } from './_shared.js';

export interface Message extends CoreMessage<ControlPacketType.DISCONNECT>
{
    reason?: ReasonCodes;
    properties: Properties;
}

header.register(ControlPacketType.DISCONNECT, parsers.series<Message>(
    parsers.property('reason', parsers.uint8),
    parsers.property('properties', parsers.optional(propertiesParser)),
) as parsers.ParserWithMessage<CoreMessage, CoreMessage>);