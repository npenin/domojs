import { parsers } from '@akala/protocol-parser';
import { header, Message as CoreMessage } from './_protocol.js';
import { ControlPacketType, Properties, ReasonCodes, propertiesParser } from './_shared.js';

export interface Message extends CoreMessage
{
    reason?: ReasonCodes;
    properties: Properties;
}

header.register(ControlPacketType.AUTH, parsers.object<Message>(
    parsers.property('reason', parsers.uint8),
    parsers.property('properties', propertiesParser),
));