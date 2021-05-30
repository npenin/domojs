import { StatusMessage } from './status';
import { Message, MessageType, Cluster, messages } from './_common';
import { ShortAddressRequest } from './descriptors';
import { CommandMessage } from './move';
import { parsers, uint16, uint8 } from '@domojs/protocol-parser';

export enum Direction 
{
    FromServerToClient = 0,
    FromClientToServer = 1,
}

messages.register(MessageType.ReadAttribute, parsers.object<ReadAttributeMessage>(
    parsers.property('addressMode', parsers.uint8),
    parsers.property('targetShortAddress', parsers.uint16),
    parsers.property('sourceEndpoint', parsers.uint8),
    parsers.property('destinationEndpoint', parsers.uint8),
    parsers.property('clusterId', parsers.uint16),
    parsers.property('direction', parsers.uint8),
    parsers.property('manufacturerSpecific', parsers.boolean(parsers.uint8)),
    parsers.property('manufacturerId', parsers.uint16),
    parsers.property('attributes', parsers.array(parsers.uint8, parsers.uint16)),
));

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

messages.register(MessageType.WriteAttribute, parsers.object<WriteAttributeMessage>(
    parsers.property('addressMode', parsers.uint8),
    parsers.property('targetShortAddress', parsers.uint16),
    parsers.property('sourceEndpoint', parsers.uint8),
    parsers.property('destinationEndpoint', parsers.uint8),
    parsers.property('clusterId', parsers.uint16),
    parsers.property('direction', parsers.uint8),
    parsers.property('manufacturerSpecific', parsers.boolean(parsers.uint8)),
    parsers.property('manufacturerId', parsers.uint16),
    parsers.property('attributes', parsers.array(parsers.uint8, parsers.uint16)),
))

export interface WriteAttributeMessage extends AttributeMessage
{
    attributes: uint16[];
}

messages.register(MessageType.ConfigureReporting, parsers.object<ConfigureReportingRequest>(
    parsers.property('addressMode', parsers.uint8),
    parsers.property('targetShortAddress', parsers.uint16),
    parsers.property('sourceEndpoint', parsers.uint8),
    parsers.property('destinationEndpoint', parsers.uint8),
    parsers.property('clusterId', parsers.uint16),
    parsers.property('direction', parsers.uint8),
    parsers.property('manufacturerSpecific', parsers.boolean(parsers.uint8)),
    parsers.property('manufacturerId', parsers.uint16),
    parsers.property('attributes', parsers.array(parsers.uint8, parsers.uint16)),
    parsers.property('attributeDirection', parsers.uint8),
    parsers.property('attributeType', parsers.uint8),
    parsers.property('attributeId', parsers.uint16),
    parsers.property('minInterval', parsers.uint16),
    parsers.property('maxInterval', parsers.uint16),
    parsers.property('timeout', parsers.uint16),
    parsers.property('change', parsers.uint8),
));

messages.register(MessageType.ObjectAttributesList, parsers.object<AttributeList>(
    parsers.property('sourceEndpoint', parsers.uint8),
    parsers.property('profileId', parsers.uint16),
    parsers.property('clusterId', parsers.uint16),
    parsers.property('attributes', parsers.array(-1, parsers.uint16)),
))

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

messages.register(MessageType.ConfigureReporting | MessageType.Response, parsers.object<ConfigureReportingResponse>(
    parsers.property('sequenceNumber', parsers.uint8),
    parsers.property('srcAddress', parsers.uint16),
    parsers.property('endpoint', parsers.uint8),
    parsers.property('clusterId', parsers.uint16),
    parsers.property('status', parsers.uint8),
))
export interface ConfigureReportingResponse extends StatusMessage
{
    srcAddress: uint16;
    endpoint: uint8;
    clusterId: uint16;
}

messages.register(MessageType.AttributeDiscovery, parsers.object<AttributeDiscoveryRequest>(
    parsers.property('addressMode', parsers.uint8),
    parsers.property('targetShortAddress', parsers.uint16),
    parsers.property('sourceEndpoint', parsers.uint8),
    parsers.property('destinationEndpoint', parsers.uint8),
    parsers.property('clusterId', parsers.uint16),
    parsers.property('attributeId', parsers.uint16),
    parsers.property('direction', parsers.uint8),
    parsers.property('manufacturerSpecific', parsers.boolean(parsers.uint8)),
    parsers.property('manufacturerId', parsers.uint16),
    parsers.property('maxNumberOfIdentifiers', parsers.uint8),
))
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

messages.register(MessageType.AttributeDiscovery | MessageType.Response, parsers.object<AttributeDiscoveryResponse>(
    parsers.property('complete', parsers.boolean(parsers.uint8)),
    parsers.property('attributeType', parsers.uint8),
    parsers.property('attributeId', parsers.uint16)
))

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

messages.register(MessageType.ReadAttribute | MessageType.Response, parsers.object<AttributeResponse>(
    parsers.property('sequenceNumber', parsers.uint8),
    parsers.property('sourceAddress', parsers.uint16),
    parsers.property('endpoint', parsers.uint8),
    parsers.property('clusterId', parsers.uint8),
    parsers.property('attributeEnum', parsers.uint8),
    parsers.property('status', parsers.uint8),
    parsers.property('dataType', parsers.uint8),
    parsers.property('value', parsers.buffer(parsers.uint16)),
))

messages.register(MessageType.WriteAttribute | MessageType.Response, parsers.object<AttributeResponse>(
    parsers.property('sequenceNumber', parsers.uint8),
    parsers.property('sourceAddress', parsers.uint16),
    parsers.property('endpoint', parsers.uint8),
    parsers.property('clusterId', parsers.uint8),
    parsers.property('attributeEnum', parsers.uint8),
    parsers.property('status', parsers.uint8),
    parsers.property('dataType', parsers.uint8),
    parsers.property('value', parsers.buffer(parsers.uint16)),
))

messages.register(MessageType.ReportIndividualAttribute | MessageType.Response, parsers.object<AttributeResponse>(
    parsers.property('sequenceNumber', parsers.uint8),
    parsers.property('sourceAddress', parsers.uint16),
    parsers.property('endpoint', parsers.uint8),
    parsers.property('clusterId', parsers.uint16),
    parsers.property('attributeEnum', parsers.uint16),
    parsers.property('status', parsers.uint8),
    parsers.property('dataType', parsers.uint8),
    parsers.property('value', parsers.buffer(parsers.uint16)),
))

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