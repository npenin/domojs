import { StatusMessage } from './status';
import { Message, MessageType, uint8, uint16, Protocol, Cluster } from './common';
import { ShortAddressRequest } from 'zigate/src/messages/descriptors';
import { CommandMessage } from './move';

export enum Direction 
{
    FromServerToClient = 0,
    FromClientToServer = 1,
}

Protocol.register<ReadAttributeMessage>('type', MessageType.ReadAttribute, [
    { name: 'addressMode', type: 'uint8' },
    { name: 'targetShortAddress', type: 'uint16' },
    { name: 'sourceEndpoint', type: 'uint8' },
    { name: 'destinationEndpoint', type: 'uint8' },
    { name: 'clusterId', type: 'uint16' },
    { name: 'direction', type: 'uint8' },
    { name: 'manufacturerSpecific', type: 'uint8' },
    { name: 'manufacturerId', type: 'uint16' },
    { name: 'attributes', type: 'uint16[]', length: 'uint8' },
]);

export interface AttributeMessage extends CommandMessage
{
    clusterId: uint16;
    direction: Direction;
    manufacturerSpecific: boolean;
    manufacturerId: uint16;
}

export interface ReadAttributeMessage extends AttributeMessage
{
    attributes: uint16[];

}

Protocol.register<WriteAttributeMessage>('type', MessageType.WriteAttribute, [
    { name: 'addressMode', type: 'uint8' },
    { name: 'targetShortAddress', type: 'uint16' },
    { name: 'sourceEndpoint', type: 'uint8' },
    { name: 'destinationEndpoint', type: 'uint8' },
    { name: 'clusterId', type: 'uint16' },
    { name: 'direction', type: 'uint8' },
    { name: 'manufacturerSpecific', type: 'uint8' },
    { name: 'manufacturerId', type: 'uint16' },
    { name: 'attributes', type: 'uint16[]', length: 'uint8' },
])

export interface WriteAttributeMessage extends AttributeMessage
{
    attributes: uint16[];
}

Protocol.register<ConfigureReportingRequest>('type', MessageType.ConfigureReporting, [
    { name: 'addressMode', type: 'uint8' },
    { name: 'targetShortAddress', type: 'uint16' },
    { name: 'sourceEndpoint', type: 'uint8' },
    { name: 'destinationEndpoint', type: 'uint8' },
    { name: 'clusterId', type: 'uint16' },
    { name: 'direction', type: 'uint8' },
    { name: 'manufacturerSpecific', type: 'uint8' },
    { name: 'manufacturerId', type: 'uint16' },
    { name: 'attributes', type: 'uint16[]', length: 'uint8' },
    { name: 'attributeDirection', type: 'uint8' },
    { name: 'attributeType', type: 'uint8' },
    { name: 'attributeId', type: 'uint16' },
    { name: 'minInterval', type: 'uint16' },
    { name: 'maxInterval', type: 'uint16' },
    { name: 'timeout', type: 'uint16' },
    { name: 'change', type: 'uint8' },
]);

Protocol.register<AttributeList>('type', MessageType.ObjectAttributesList, [
    { name: 'sourceEndpoint', type: 'uint8' },
    { name: 'profileId', type: 'uint16' },
    { name: 'clusterId', type: 'uint16' },
    { name: 'attributes', type: 'uint16[]' },
])

export interface ConfigureReportingRequest extends AttributeMessage
{
    attributeDirection: uint8;
    attributeType: uint8;
    attributeId: uint16;
    minInterval: uint16;
    maxInterval: uint16;
    timeout: uint16;
    change: uint8;
    attributes: uint16[];
}

Protocol.register<ConfigureReportingResponse>('type', MessageType.ConfigureReporting | MessageType.Response, [
    { name: 'sequenceNumber', type: 'uint8' },
    { name: 'srcAddress', type: 'uint16' },
    { name: 'endpoint', type: 'uint8' },
    { name: 'clusterId', type: 'uint16' },
    { name: 'status', type: 'uint8' },
])
export interface ConfigureReportingResponse extends StatusMessage
{
    srcAddress: uint16;
    endpoint: uint8;
    clusterId: uint16;
}

Protocol.register<AttributeDiscoveryRequest>('type', MessageType.AttributeDiscovery, [
    { name: 'addressMode', type: 'uint8' },
    { name: 'targetShortAddress', type: 'uint16' },
    { name: 'sourceEndpoint', type: 'uint8' },
    { name: 'destinationEndpoint', type: 'uint8' },
    { name: 'clusterId', type: 'uint16' },
    { name: 'attributeId', type: 'uint16' },
    { name: 'direction', type: 'uint8' },
    { name: 'manufacturerSpecific', type: 'uint8' },
    { name: 'manufacturerId', type: 'uint16' },
    { name: 'maxNumberOfIdentifiers', type: 'uint8' },

])
export interface AttributeDiscoveryRequest extends AttributeMessage
{
    attributeId: uint16;
    maxNumberOfIdentifiers: uint8;
}

export enum AttributeType
{
    null = 0x00,
    bool = 0x10,
    bitmap = 0x18,
    uint8 = 0x20,
    uint16 = 0x21,
    uint32 = 0x22,
    uint48 = 0x25,
    int8 = 0x28,
    int16 = 0x29,
    int32 = 0x2a,
    enum = 0x30,
    string = 0x42,
}

Protocol.register<AttributeDiscoveryResponse>('type', MessageType.AttributeDiscovery | MessageType.Response, [
    { name: 'complete', type: 'uint8' },
    { name: 'attributeType', type: 'uint8' },
    { name: 'attributeId', type: 'uint16' }
])

export interface AttributeDiscoveryResponse 
{
    complete: boolean;
    attributeType: AttributeType;
    attributeId: uint16;
}

export interface AttributeList
{
    sourceEndpoint: uint8;
    profileId: uint16;
    clusterId: Cluster;
    attributes: uint8[];
}

Protocol.register<AttributeResponse>('type', MessageType.ReadAttribute | MessageType.Response, [
    { name: 'sequenceNumber', type: 'uint8' },
    { name: 'sourceAddress', type: 'uint16' },
    { name: 'endpoint', type: 'uint8' },
    { name: 'clusterId', type: 'uint8' },
    { name: 'attributeEnum', type: 'uint8' },
    { name: 'status', type: 'uint8' },
    { name: 'dataType', type: 'uint8' },
    { name: 'value', type: 'buffer', length: 'uint16' },
])

Protocol.register<AttributeResponse>('type', MessageType.WriteAttribute | MessageType.Response, [
    { name: 'sequenceNumber', type: 'uint8' },
    { name: 'sourceAddress', type: 'uint16' },
    { name: 'endpoint', type: 'uint8' },
    { name: 'clusterId', type: 'uint8' },
    { name: 'attributeEnum', type: 'uint8' },
    { name: 'status', type: 'uint8' },
    { name: 'dataType', type: 'uint8' },
    { name: 'value', type: 'buffer', length: 'uint16' },
])

Protocol.register<AttributeResponse>('type', MessageType.ReportIndividualAttribute | MessageType.Response, [
    { name: 'sequenceNumber', type: 'uint8' },
    { name: 'sourceAddress', type: 'uint16' },
    { name: 'endpoint', type: 'uint8' },
    { name: 'clusterId', type: 'uint8' },
    { name: 'attributeEnum', type: 'uint8' },
    { name: 'status', type: 'uint8' },
    { name: 'dataType', type: 'uint8' },
    { name: 'value', type: 'buffer', length: 'uint16' },
])

export interface AttributeResponse extends StatusMessage
{
    sourceAddress: uint16;
    endpoint: uint8;
    clusterId: Cluster;
    attributeEnum: uint16;
    status: uint8;
    dataType: uint8;
    attributes: uint16[];
    value: Buffer;
}