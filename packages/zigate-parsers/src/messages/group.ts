import { StatusMessage } from './status';
import { messages, MessageType } from './_common';
import { CommandMessage } from './move';
import { parsers, uint16, uint8 } from '@domojs/protocol-parser';

messages.register(MessageType.AddGroup, parsers.object<AddGroupRequest>(
    parsers.property('addressMode', parsers.uint8),
    parsers.property('targetShortAddress', parsers.uint16),
    parsers.property('sourceEndpoint', parsers.uint8),
    parsers.property('destinationEndpoint', parsers.uint8),
    parsers.property('groupAddress', parsers.uint16),
));

messages.register(MessageType.ViewGroup, parsers.object<ViewGroupRequest>(
    parsers.property('addressMode', parsers.uint8),
    parsers.property('targetShortAddress', parsers.uint16),
    parsers.property('sourceEndpoint', parsers.uint8),
    parsers.property('destinationEndpoint', parsers.uint8),
    parsers.property('groupAddress', parsers.uint16),
));
messages.register(MessageType.GetGroupMembership, parsers.object<GetGroupMembershipRequest>(
    parsers.property('addressMode', parsers.uint8),
    parsers.property('targetShortAddress', parsers.uint16),
    parsers.property('sourceEndpoint', parsers.uint8),
    parsers.property('destinationEndpoint', parsers.uint8),
    parsers.property('groupList', parsers.array(parsers.uint8, parsers.uint8)),
));
messages.register(MessageType.RemoveGroup, parsers.object<RemoveGroupRequest>(
    parsers.property('addressMode', parsers.uint8),
    parsers.property('targetShortAddress', parsers.uint16),
    parsers.property('sourceEndpoint', parsers.uint8),
    parsers.property('destinationEndpoint', parsers.uint8),
    parsers.property('groupAddress', parsers.uint16),
));
messages.register(MessageType.RemoveAllGroup, parsers.object<CommandMessage>(
    parsers.property('addressMode', parsers.uint8),
    parsers.property('targetShortAddress', parsers.uint16),
    parsers.property('sourceEndpoint', parsers.uint8),
    parsers.property('destinationEndpoint', parsers.uint8),
));
messages.register(MessageType.AddGroupIfIdentify, parsers.object<AddGroupRequest>(
    parsers.property('addressMode', parsers.uint8),
    parsers.property('targetShortAddress', parsers.uint16),
    parsers.property('sourceEndpoint', parsers.uint8),
    parsers.property('destinationEndpoint', parsers.uint8),
    parsers.property('groupAddress', parsers.uint16),
));

messages.register(MessageType.AddGroup | MessageType.Response, parsers.object<GroupResponse>(
    parsers.property('sequenceNumber', parsers.uint8),
    parsers.property('endpoint', parsers.uint8),
    parsers.property('clusterId', parsers.uint16)
))

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

messages.register(MessageType.ViewGroup | MessageType.Response, parsers.object<ViewGroupResponse>(
    parsers.property('sequenceNumber', parsers.uint8),
    parsers.property('endpoint', parsers.uint8),
    parsers.property('clusterId', parsers.uint16),
    parsers.property('status', parsers.uint8),
    parsers.property('groupId', parsers.uint16)
))

export interface ViewGroupResponse extends GroupResponse
{
    groupId: number;
}

export interface GetGroupMembershipRequest extends CommandMessage
{
    groupList: uint8[];
}

messages.register(MessageType.GetGroupMembership | MessageType.Response, parsers.object<GetGroupMembershipResponse>(
    parsers.property('sequenceNumber', parsers.uint8),
    parsers.property('endpoint', parsers.uint8),
    parsers.property('clusterId', parsers.uint16),
    parsers.property('capacity', parsers.uint8),
    parsers.property('groupIds', parsers.array(parsers.uint8, parsers.uint16)),
))

export interface GetGroupMembershipResponse extends GroupResponse
{
    capacity: uint8;
    groupIds: uint16[];
}

export interface RemoveGroupRequest extends CommandMessage
{
    groupAddress: uint16;
}

messages.register(MessageType.RemoveGroup | MessageType.Response, parsers.object<RemoveGroupResponse>(
    parsers.property('sequenceNumber', parsers.uint8),
    parsers.property('endpoint', parsers.uint8),
    parsers.property('clusterId', parsers.uint16),
    parsers.property('capacity', parsers.uint8),
    parsers.property('groupId', parsers.uint16),
))

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