import { ShortAddressRequest } from './descriptors';
import { Message, MessageType, Protocol } from './common';
import { StatusMessage } from './status';

Protocol.register<ManagementLeave>('type', MessageType.ManagementLeave, [
    { name: 'targetShortAddress', type: 'uint16' },
    { name: 'extendedAddress', type: 'uint64' },
    { name: 'rejoin', type: 'uint8' },
    { name: 'keepChildren', type: 'uint8' },
]);

export interface ManagementLeave extends ShortAddressRequest
{
    type: MessageType.ManagementLeave;
    extendedAddress: number;
    rejoin: boolean;
    keepChildren: boolean;
}

Protocol.register<LeaveIndicationResponse>('type', MessageType.ManagementLeave | MessageType.Response, [
    { name: 'extendedAddress', type: 'uint64' },
    { name: 'rejoinStatus', type: 'uint8' },
])

export interface LeaveIndicationResponse
{
    extendedAddress: string;
    rejoinStatus: number;
}