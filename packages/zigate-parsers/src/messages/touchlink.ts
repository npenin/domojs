import { StatusMessage } from './status';
import { Message, MessageType, uint8, uint16, Protocol } from './common';
import { ShortAddressRequest } from './descriptors';

Protocol.register<{}>('type', MessageType.InitiateTouchlink, []);
Protocol.register<{}>('type', MessageType.TouchlinkFactoryResetTarget, []);

export interface TouchlinkStatus
{
    failed: boolean;
    joinedNodeShortAddress: uint16;
}

Protocol.register<TouchlinkStatus>('type', MessageType.TouchlinkFactoryResetTarget | MessageType.Response, [
    { name: 'failed', type: 'uint8' },
    { name: 'joinedNodeShortAddress', type: 'uint16' },
])