import { ShortAddressRequest } from './descriptors.js';
import { messages, MessageType } from './_common.js';
import { parsers, uint64 } from '@akala/protocol-parser';

messages.register(MessageType.ManagementLeave, parsers.object<ManagementLeave>(
    parsers.property('targetShortAddress', parsers.uint16),
    parsers.property('extendedAddress', parsers.uint64),
    parsers.property('rejoin', parsers.boolean(parsers.uint8)),
    parsers.property('keepChildren', parsers.boolean(parsers.uint8)),
));

export interface ManagementLeave extends ShortAddressRequest
{
    type: MessageType.ManagementLeave;
    extendedAddress: uint64;
    rejoin: boolean;
    keepChildren: boolean;
}

messages.register(MessageType.LeaveIndication, parsers.object<LeaveIndicationResponse>(
    parsers.property('extendedAddress', parsers.uint64),
    parsers.property('rejoinStatus', parsers.uint8),
))

export interface LeaveIndicationResponse
{
    extendedAddress: uint64;
    rejoinStatus: number;
}