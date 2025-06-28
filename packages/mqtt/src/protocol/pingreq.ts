import { parsers } from '@akala/protocol-parser';
import { header, Message as CoreMessage } from './_protocol.js';
import { ControlPacketType } from './_shared.js';

export interface Message extends CoreMessage
{
    // No additional fields for PINGREQ
}

header.register(ControlPacketType.PINGREQ, parsers.object<Message>());