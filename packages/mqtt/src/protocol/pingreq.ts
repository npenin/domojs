import { parsers } from '@akala/protocol-parser';
import { header } from './_protocol.js';
import { ControlPacketType, Message as CoreMessage } from './_shared.js';

export interface Message extends CoreMessage<ControlPacketType.PINGREQ>
{
    // No additional fields for PINGREQ
}

header.register(ControlPacketType.PINGREQ, parsers.object<Message>() as parsers.ParserWithMessage<CoreMessage, CoreMessage>);