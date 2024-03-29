import { messages, MessageType } from './_common.js';
import { parsers } from '@akala/protocol-parser';

messages.register(MessageType.EnablePermissionsControlJoin, parsers.object<EnablePermissionsControlJoin>(
    parsers.property('state', parsers.uint8 as parsers.Parser<1 | 2>)
))

export type EnablePermissionsControlJoin = { state: 1 | 2 };