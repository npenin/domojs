import { StatusMessage } from './status';
import { Message, MessageType, uint8, Protocol } from './common';
import { ShortAddressRequest } from './descriptors';

Protocol.register('type', MessageType.PermitJoin, []);
Protocol.register<PermitJoinResponse>('type', MessageType.PermitJoin | MessageType.Response, [{ name: 'status', type: 'uint8' }]);
Protocol.register<PermitJoiningRequest>('type', MessageType.PermitJoining | MessageType.Response, [
    { name: 'targetShortAddress', type: 'uint16' },
    { name: 'interval', type: 'uint8' },
    { name: 'TCSignificance', type: 'uint8' },
]);

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