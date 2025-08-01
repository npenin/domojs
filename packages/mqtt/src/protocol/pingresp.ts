import { parsers } from '@akala/protocol-parser';
import { header } from './_protocol.js';
import { ControlPacketType, Message as CoreMessage } from './_shared.js';

export interface Message extends CoreMessage<ControlPacketType.PINGRESP>
{
    // No additional fields for PINGRESP
}

header.register(ControlPacketType.PINGRESP, parsers.object<Message>() as parsers.ParserWithMessage<CoreMessage, CoreMessage>);