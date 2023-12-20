import { MessageType, messages } from './_common.js';
import { ShortAddressRequest } from './descriptors.js';
import { parsers, uint8 } from '@akala/protocol-parser';

messages.register(MessageType.PermitJoin, parsers.object());
messages.register(MessageType.PermitJoin | MessageType.Response, parsers.object<PermitJoinResponse>(parsers.property('status', parsers.boolean(parsers.uint8))));
messages.register(MessageType.PermitJoining, parsers.object<PermitJoiningRequest>(
    parsers.property('targetShortAddress', parsers.uint16),
    parsers.property('interval', parsers.uint8),
    parsers.property('TCSignificance', parsers.uint8),
));

export interface PermitJoinResponse
{
    status: boolean
}

export enum TCSignificance
{
    NoChangeInAuthentication = 0,
    AuthenticationPolicyasSpec = 1,
}

export interface PermitJoiningRequest extends ShortAddressRequest
{
    interval: uint8;
    TCSignificance: TCSignificance;
}