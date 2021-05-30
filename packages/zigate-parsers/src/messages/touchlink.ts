import { MessageType, messages } from './_common';
import { parsers } from '@domojs/protocol-parser';

messages.register(MessageType.InitiateTouchlink, parsers.object<{}>());
messages.register(MessageType.TouchlinkFactoryResetTarget, parsers.object<{}>());

export interface TouchlinkStatus
{
    failed: boolean;
    joinedNodeShortAddress: number;
}

messages.register(MessageType.TouchlinkFactoryResetTarget | MessageType.Response, parsers.object<TouchlinkStatus>(
    parsers.property('failed', parsers.boolean(parsers.uint8)),
    parsers.property('joinedNodeShortAddress', parsers.uint16),
))