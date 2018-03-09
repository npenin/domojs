import { StatusMessage } from './status';
import { Message, MessageType, uint8, uint16, Protocol } from './common';
import { ShortAddressRequest } from 'zigate/src/messages/descriptors';
import { CommandMessage } from './move';

Protocol.register<AddGroupRequest>('type', MessageType.AddGroup, [
    { name: 'addressMode', type: 'uint8' },
    { name: 'targetShortAddress', type: 'uint16' },
    { name: 'sourceEndpoint', type: 'uint8' },
    { name: 'destinationEndpoint', type: 'uint8' },
    { name: 'groupAddress', type: 'uint16' },
]);

Protocol.register<ViewGroupRequest>('type', MessageType.ViewGroup, [
    { name: 'addressMode', type: 'uint8' },
    { name: 'targetShortAddress', type: 'uint16' },
    { name: 'sourceEndpoint', type: 'uint8' },
    { name: 'destinationEndpoint', type: 'uint8' },
    { name: 'groupAddress', type: 'uint16' },
]);
Protocol.register<GetGroupMembershipRequest>('type', MessageType.GetGroupMembership, [
    { name: 'addressMode', type: 'uint8' },
    { name: 'targetShortAddress', type: 'uint16' },
    { name: 'sourceEndpoint', type: 'uint8' },
    { name: 'destinationEndpoint', type: 'uint8' },
    { name: 'groupList', type: 'uint8[]', length: 'uint8' },
]);
Protocol.register<RemoveGroupRequest>('type', MessageType.RemoveGroup, [
    { name: 'addressMode', type: 'uint8' },
    { name: 'targetShortAddress', type: 'uint16' },
    { name: 'sourceEndpoint', type: 'uint8' },
    { name: 'destinationEndpoint', type: 'uint8' },
    { name: 'groupAddress', type: 'uint16' },
]);
Protocol.register<CommandMessage>('type', MessageType.RemoveAllGroup, [
    { name: 'addressMode', type: 'uint8' },
    { name: 'targetShortAddress', type: 'uint16' },
    { name: 'sourceEndpoint', type: 'uint8' },
    { name: 'destinationEndpoint', type: 'uint8' },
]);
Protocol.register<AddGroupRequest>('type', MessageType.AddGroupIfIdentify, [
    { name: 'addressMode', type: 'uint8' },
    { name: 'targetShortAddress', type: 'uint16' },
    { name: 'sourceEndpoint', type: 'uint8' },
    { name: 'destinationEndpoint', type: 'uint8' },
    { name: 'groupAddress', type: 'uint16' },
]);

Protocol.register<GroupResponse>('type', MessageType.AddGroup | MessageType.Response, [
    { name: 'sequenceNumber', type: 'uint8' },
    { name: 'endpoint', type: 'uint8' },
    { name: 'clusterId', type: 'uint16' }
])

export interface GroupResponse extends StatusMessage
{
    endpoint: uint8;
    clusterId: uint16;
}

export interface AddGroupRequest extends CommandMessage
{
    groupAddress: uint16;
}

export interface ViewGroupRequest extends CommandMessage
{
    groupAddress: uint16;
}

Protocol.register<ViewGroupResponse>('type', MessageType.ViewGroup | MessageType.Response, [
    { name: 'sequenceNumber', type: 'uint8' },
    { name: 'endpoint', type: 'uint8' },
    { name: 'clusterId', type: 'uint16' },
    { name: 'status', type: 'uint8' },
    { name: 'groupId', type: 'uint16' }
])

export interface ViewGroupResponse extends GroupResponse
{
    groupId: number;
}

export interface GetGroupMembershipRequest extends CommandMessage
{
    groupList: uint8[];
}

Protocol.register<GetGroupMembershipResponse>('type', MessageType.GetGroupMembership | MessageType.Response, [
    { name: 'sequenceNumber', type: 'uint8' },
    { name: 'endpoint', type: 'uint8' },
    { name: 'clusterId', type: 'uint16' },
    { name: 'capacity', type: 'uint8' },
    { name: 'groupIds', type: 'uint16[]', length: 'uint8' },
])

export interface GetGroupMembershipResponse extends GroupResponse
{
    capacity: uint8;
    groupIds: uint16[];
}

export interface RemoveGroupRequest extends CommandMessage
{
    groupAddress: uint16;
}

Protocol.register<RemoveGroupResponse>('type', MessageType.RemoveGroup | MessageType.Response, [
    { name: 'sequenceNumber', type: 'uint8' },
    { name: 'endpoint', type: 'uint8' },
    { name: 'clusterId', type: 'uint16' },
    { name: 'capacity', type: 'uint8' },
    { name: 'groupId', type: 'uint16' },
])

export interface RemoveGroupResponse extends GroupResponse
{
    capacity: uint8;
    groupId: uint16;
}

export interface RemoveAllGroupsMessage extends CommandMessage
{
}

export interface AddGroupIfIdentifyMessage extends CommandMessage
{
    groupAddress: uint16;
}