import { StatusMessage } from './status';
import { MessageType, messages } from './_common';
import { CommandMessage } from './move';
import { GroupResponse } from './group';
import { parsers, uint16, uint8 } from '@domojs/protocol-parser';

messages.register(MessageType.ViewScene, parsers.object<SceneRequest>(
    parsers.property('addressMode', parsers.uint8),
    parsers.property('targetShortAddress', parsers.uint16),
    parsers.property('sourceEndpoint', parsers.uint8),
    parsers.property('destinationEndpoint', parsers.uint8),
    parsers.property('groupId', parsers.uint16),
    parsers.property('sceneId', parsers.uint8),
));

messages.register(MessageType.AddScene, parsers.object<AddSceneRequest>(
    parsers.property('addressMode', parsers.uint8),
    parsers.property('targetShortAddress', parsers.uint16),
    parsers.property('sourceEndpoint', parsers.uint8),
    parsers.property('destinationEndpoint', parsers.uint8),
    parsers.property('groupId', parsers.uint16),
    parsers.property('sceneId', parsers.uint8),
    parsers.property('transitionTime', parsers.uint8),
    parsers.property('nameLength', parsers.uint8),
    parsers.property('nameMaxLength', parsers.uint8),
    parsers.property('name', parsers.string<AddSceneRequest>('nameLength')),
));

messages.register(MessageType.RemoveScene, parsers.object<SceneRequest>(
    parsers.property('addressMode', parsers.uint8),
    parsers.property('targetShortAddress', parsers.uint16),
    parsers.property('sourceEndpoint', parsers.uint8),
    parsers.property('destinationEndpoint', parsers.uint8),
    parsers.property('groupId', parsers.uint16),
    parsers.property('sceneId', parsers.uint8),
));

messages.register(MessageType.RemoveAllScene, parsers.object<SceneRequest>(
    parsers.property('addressMode', parsers.uint8),
    parsers.property('targetShortAddress', parsers.uint16),
    parsers.property('sourceEndpoint', parsers.uint8),
    parsers.property('destinationEndpoint', parsers.uint8),
    parsers.property('groupId', parsers.uint16),
));

messages.register(MessageType.StoreScene, parsers.object<SceneRequest>(
    parsers.property('addressMode', parsers.uint8),
    parsers.property('targetShortAddress', parsers.uint16),
    parsers.property('sourceEndpoint', parsers.uint8),
    parsers.property('destinationEndpoint', parsers.uint8),
    parsers.property('groupId', parsers.uint16),
    parsers.property('sceneId', parsers.uint8),
));

messages.register(MessageType.RecallScene, parsers.object<SceneRequest>(
    parsers.property('addressMode', parsers.uint8),
    parsers.property('targetShortAddress', parsers.uint16),
    parsers.property('sourceEndpoint', parsers.uint8),
    parsers.property('destinationEndpoint', parsers.uint8),
    parsers.property('groupId', parsers.uint16),
    parsers.property('sceneId', parsers.uint8),
));

messages.register(MessageType.SceneMembership, parsers.object<SceneRequest>(
    parsers.property('addressMode', parsers.uint8),
    parsers.property('targetShortAddress', parsers.uint16),
    parsers.property('sourceEndpoint', parsers.uint8),
    parsers.property('destinationEndpoint', parsers.uint8),
    parsers.property('groupId', parsers.uint16),
));

messages.register(MessageType.AddEnhancedScene, parsers.object<AddSceneRequest>(
    parsers.property('addressMode', parsers.uint8),
    parsers.property('targetShortAddress', parsers.uint16),
    parsers.property('sourceEndpoint', parsers.uint8),
    parsers.property('destinationEndpoint', parsers.uint8),
    parsers.property('groupId', parsers.uint16),
    parsers.property('sceneId', parsers.uint8),
    parsers.property('transitionTime', parsers.uint8),
    parsers.property('nameLength', parsers.uint8),
    parsers.property('nameMaxLength', parsers.uint8),
    parsers.property('name', parsers.string<AddSceneRequest>('nameLength')),
));

messages.register(MessageType.ViewEnhancedHost_NodeScene, parsers.object<SceneRequest>(
    parsers.property('addressMode', parsers.uint8),
    parsers.property('targetShortAddress', parsers.uint16),
    parsers.property('sourceEndpoint', parsers.uint8),
    parsers.property('destinationEndpoint', parsers.uint8),
    parsers.property('groupId', parsers.uint16),
    parsers.property('sceneId', parsers.uint8),
));

messages.register(MessageType.CopyScene, parsers.object<CopyScene>(
    parsers.property('addressMode', parsers.uint8),
    parsers.property('targetShortAddress', parsers.uint16),
    parsers.property('sourceEndpoint', parsers.uint8),
    parsers.property('destinationEndpoint', parsers.uint8),
    parsers.property('mode', parsers.uint8),
    parsers.property('groupId', parsers.uint16),
    parsers.property('sceneId', parsers.uint8),
    parsers.property('toGroupId', parsers.uint16),
    parsers.property('toSceneId', parsers.uint8),
));

export interface SceneRequest extends CommandMessage
{
    groupId: uint16;
    sceneId: uint8;
}

export interface AddSceneRequest extends SceneRequest
{
    transitionTime: uint16;
    name: string;
    nameMaxLength: uint8;
    nameLength: uint8;
}
export interface CopyScene extends SceneRequest
{
    mode: uint8;
    toGroupId: uint16;
    toSceneId: uint8;
}

messages.register(MessageType.ViewScene | MessageType.Response, parsers.object<ViewSceneResponse>(
    parsers.property('sequenceNumber', parsers.uint8),
    parsers.property('endpoint', parsers.uint8),
    parsers.property('clusterId', parsers.uint16),
    parsers.property('status', parsers.uint8),
    parsers.property('groupId', parsers.uint8),
    parsers.property('sceneId', parsers.uint8),
    parsers.property('transitionTime', parsers.uint16),
    parsers.property('nameLength', parsers.uint8),
    parsers.property('nameMaxLength', parsers.uint8),
    parsers.property('name', parsers.string<ViewSceneResponse>('nameLength')),
    parsers.property('extensionLength', parsers.uint8),
    parsers.property('extensionMaxLength', parsers.uint8),
    parsers.property('extension', parsers.array<uint8, ViewSceneResponse>('extensionLength', parsers.uint8)),
))

export interface ViewSceneResponse extends GroupResponse
{
    groupId: uint8;
    sceneId: uint8;
    transitionTime: uint16;
    name: string;
    nameMaxLength: uint8;
    nameLength: uint8;
    extension: uint8[];
    extensionMaxLength: uint8;
    extensionLength: uint8;
}

messages.register(MessageType.AddScene | MessageType.Response, parsers.object<SceneResponse>(
    parsers.property('sequenceNumber', parsers.uint8),
    parsers.property('endpoint', parsers.uint8),
    parsers.property('clusterId', parsers.uint16),
    parsers.property('status', parsers.uint8),
    parsers.property('groupId', parsers.uint16),
    parsers.property('sceneId', parsers.uint8),
))

messages.register(MessageType.RemoveScene | MessageType.Response, parsers.object<SceneResponse>(
    parsers.property('sequenceNumber', parsers.uint8),
    parsers.property('endpoint', parsers.uint8),
    parsers.property('clusterId', parsers.uint16),
    parsers.property('status', parsers.uint8),
    parsers.property('groupId', parsers.uint16),
    parsers.property('sceneId', parsers.uint8),
))

messages.register(MessageType.RemoveAllScene | MessageType.Response, parsers.object<SceneResponse>(
    parsers.property('sequenceNumber', parsers.uint8),
    parsers.property('endpoint', parsers.uint8),
    parsers.property('clusterId', parsers.uint16),
    parsers.property('status', parsers.uint8),
    parsers.property('groupId', parsers.uint16),
))

messages.register(MessageType.StoreScene | MessageType.Response, parsers.object<SceneResponse>(
    parsers.property('sequenceNumber', parsers.uint8),
    parsers.property('endpoint', parsers.uint8),
    parsers.property('clusterId', parsers.uint16),
    parsers.property('status', parsers.uint8),
    parsers.property('groupId', parsers.uint16),
    parsers.property('sceneId', parsers.uint8),
))

export interface SceneResponse extends GroupResponse
{
    groupId: uint8;
    sceneId: uint8;
}

messages.register(MessageType.SceneMembership | MessageType.Response, parsers.object<SceneMembershipResponse>(
    parsers.property('sequenceNumber', parsers.uint8),
    parsers.property('endpoint', parsers.uint8),
    parsers.property('clusterId', parsers.uint16),
    parsers.property('status', parsers.uint8),
    parsers.property('groupId', parsers.uint16),
    parsers.property('scenes', parsers.array(parsers.uint8, parsers.uint8)),
))

export interface SceneMembershipResponse extends StatusMessage
{
    endpoint: uint8;
    clusterId: uint16;
    status: uint8;
    capacity: uint8;
    groupId: uint16;
    scenes: uint8[];
}