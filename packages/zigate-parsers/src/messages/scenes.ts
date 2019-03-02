import { StatusMessage } from './status';
import { Message, MessageType, uint8, uint16, Protocol } from './common';
import { ShortAddressRequest } from './descriptors';
import { CommandMessage } from './move';
import { AddGroupRequest, GroupResponse } from './group';

Protocol.register<SceneRequest>('type', MessageType.ViewScene, [
    { name: 'addressMode', type: 'uint8' },
    { name: 'targetShortAddress', type: 'uint16' },
    { name: 'sourceEndpoint', type: 'uint8' },
    { name: 'destinationEndpoint', type: 'uint8' },
    { name: 'groupId', type: 'uint16' },
    { name: 'sceneId', type: 'uint8' },
]);

Protocol.register<AddSceneRequest>('type', MessageType.AddScene, [
    { name: 'addressMode', type: 'uint8' },
    { name: 'targetShortAddress', type: 'uint16' },
    { name: 'sourceEndpoint', type: 'uint8' },
    { name: 'destinationEndpoint', type: 'uint8' },
    { name: 'groupId', type: 'uint16' },
    { name: 'sceneId', type: 'uint8' },
    { name: 'transitionTime', type: 'uint8' },
    { name: 'nameLength', type: 'uint8' },
    { name: 'nameMaxLength', type: 'uint8' },
    { name: 'name', type: 'string', length: 7 },
]);

Protocol.register<SceneRequest>('type', MessageType.RemoveScene, [
    { name: 'addressMode', type: 'uint8' },
    { name: 'targetShortAddress', type: 'uint16' },
    { name: 'sourceEndpoint', type: 'uint8' },
    { name: 'destinationEndpoint', type: 'uint8' },
    { name: 'groupId', type: 'uint16' },
    { name: 'sceneId', type: 'uint8' },
]);

Protocol.register<SceneRequest>('type', MessageType.RemoveAllScene, [
    { name: 'addressMode', type: 'uint8' },
    { name: 'targetShortAddress', type: 'uint16' },
    { name: 'sourceEndpoint', type: 'uint8' },
    { name: 'destinationEndpoint', type: 'uint8' },
    { name: 'groupId', type: 'uint16' },
]);

Protocol.register<SceneRequest>('type', MessageType.StoreScene, [
    { name: 'addressMode', type: 'uint8' },
    { name: 'targetShortAddress', type: 'uint16' },
    { name: 'sourceEndpoint', type: 'uint8' },
    { name: 'destinationEndpoint', type: 'uint8' },
    { name: 'groupId', type: 'uint16' },
    { name: 'sceneId', type: 'uint8' },
]);

Protocol.register<SceneRequest>('type', MessageType.RecallScene, [
    { name: 'addressMode', type: 'uint8' },
    { name: 'targetShortAddress', type: 'uint16' },
    { name: 'sourceEndpoint', type: 'uint8' },
    { name: 'destinationEndpoint', type: 'uint8' },
    { name: 'groupId', type: 'uint16' },
    { name: 'sceneId', type: 'uint8' },
]);

Protocol.register<SceneRequest>('type', MessageType.SceneMembership, [
    { name: 'addressMode', type: 'uint8' },
    { name: 'targetShortAddress', type: 'uint16' },
    { name: 'sourceEndpoint', type: 'uint8' },
    { name: 'destinationEndpoint', type: 'uint8' },
    { name: 'groupId', type: 'uint16' },
]);

Protocol.register<AddSceneRequest>('type', MessageType.AddEnhancedScene, [
    { name: 'addressMode', type: 'uint8' },
    { name: 'targetShortAddress', type: 'uint16' },
    { name: 'sourceEndpoint', type: 'uint8' },
    { name: 'destinationEndpoint', type: 'uint8' },
    { name: 'groupId', type: 'uint16' },
    { name: 'sceneId', type: 'uint8' },
    { name: 'transitionTime', type: 'uint8' },
    { name: 'nameLength', type: 'uint8' },
    { name: 'nameMaxLength', type: 'uint8' },
    { name: 'name', type: 'string', length: 7 },
]);

Protocol.register<SceneRequest>('type', MessageType.ViewEnhancedHost_NodeScene, [
    { name: 'addressMode', type: 'uint8' },
    { name: 'targetShortAddress', type: 'uint16' },
    { name: 'sourceEndpoint', type: 'uint8' },
    { name: 'destinationEndpoint', type: 'uint8' },
    { name: 'groupId', type: 'uint16' },
    { name: 'sceneId', type: 'uint8' },
]);

Protocol.register<CopyScene>('type', MessageType.CopyScene, [
    { name: 'addressMode', type: 'uint8' },
    { name: 'targetShortAddress', type: 'uint16' },
    { name: 'sourceEndpoint', type: 'uint8' },
    { name: 'destinationEndpoint', type: 'uint8' },
    { name: 'mode', type: 'uint8' },
    { name: 'groupId', type: 'uint16' },
    { name: 'sceneId', type: 'uint8' },
    { name: 'toGroupId', type: 'uint16' },
    { name: 'toSceneId', type: 'uint8' },
]);

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

Protocol.register<ViewSceneResponse>('type', MessageType.ViewScene | MessageType.Response, [
    { name: 'sequenceNumber', type: 'uint8' },
    { name: 'endpoint', type: 'uint8' },
    { name: 'clusterId', type: 'uint16' },
    { name: 'status', type: 'uint8' },
    { name: 'groupId', type: 'uint8' },
    { name: 'sceneId', type: 'uint8' },
    { name: 'transitionTime', type: 'uint16' },
    { name: 'nameLength', type: 'uint8' },
    { name: 'nameMaxLength', type: 'uint8' },
    { name: 'name', type: 'string', length: 7 },
    { name: 'extensionLength', type: 'uint8' },
    { name: 'extensionMaxLength', type: 'uint8' },
    { name: 'extension', type: 'uint8[]', length: 10 },
])

export interface ViewSceneResponse extends GroupResponse
{
    groupId: uint8;
    sceneId: uint8;
    transitionTime: uint16;
    name: string;
    nameMaxLength: uint8;
    nameLength: uint8;
    extension: string;
    extensionMaxLength: uint8;
    extensionLength: uint8;
}

Protocol.register<SceneResponse>('type', MessageType.AddScene | MessageType.Response, [
    { name: 'sequenceNumber', type: 'uint8' },
    { name: 'endpoint', type: 'uint8' },
    { name: 'clusterId', type: 'uint16' },
    { name: 'status', type: 'uint8' },
    { name: 'groupId', type: 'uint16' },
    { name: 'sceneId', type: 'uint8' },
])

Protocol.register<SceneResponse>('type', MessageType.RemoveScene | MessageType.Response, [
    { name: 'sequenceNumber', type: 'uint8' },
    { name: 'endpoint', type: 'uint8' },
    { name: 'clusterId', type: 'uint16' },
    { name: 'status', type: 'uint8' },
    { name: 'groupId', type: 'uint16' },
    { name: 'sceneId', type: 'uint8' },
])

Protocol.register<SceneResponse>('type', MessageType.RemoveAllScene | MessageType.Response, [
    { name: 'sequenceNumber', type: 'uint8' },
    { name: 'endpoint', type: 'uint8' },
    { name: 'clusterId', type: 'uint16' },
    { name: 'status', type: 'uint8' },
    { name: 'groupId', type: 'uint16' },
])

Protocol.register<SceneResponse>('type', MessageType.StoreScene | MessageType.Response, [
    { name: 'sequenceNumber', type: 'uint8' },
    { name: 'endpoint', type: 'uint8' },
    { name: 'clusterId', type: 'uint16' },
    { name: 'status', type: 'uint8' },
    { name: 'groupId', type: 'uint16' },
    { name: 'sceneId', type: 'uint8' },
])

export interface SceneResponse extends GroupResponse
{
    groupId: uint8;
    sceneId: uint8;
}

Protocol.register<SceneMembershipResponse>('type', MessageType.SceneMembership | MessageType.Response, [
    { name: 'sequenceNumber', type: 'uint8' },
    { name: 'endpoint', type: 'uint8' },
    { name: 'clusterId', type: 'uint16' },
    { name: 'status', type: 'uint8' },
    { name: 'groupId', type: 'uint16' },
    { name: 'scenes', type: 'uint8[]', length: 'uint8' },
])

export interface SceneMembershipResponse extends StatusMessage
{
    endpoint: uint8;
    clusterId: uint16;
    status: uint8;
    capacity: uint8;
    groupId: uint16;
    scenes: uint8[];
}