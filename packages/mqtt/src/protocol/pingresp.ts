import { parsers } from '@akala/protocol-parser';
import { header, Message as CoreMessage } from './_protocol.js';
import { ControlPacketType } from './_shared.js';

export interface Message extends CoreMessage
{
    // No additional fields for PINGRESP
}

header.register(ControlPacketType.PINGRESP, parsers.object<Message>());