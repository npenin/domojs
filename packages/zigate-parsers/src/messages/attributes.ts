import { StatusMessage } from './status.js';
import { MessageType, Cluster, messages } from './_common.js';
import { CommandMessage } from './move.js';
import { parsers, uint16, uint8 } from '@akala/protocol-parser';
import { IsomorphicBuffer } from '@akala/core';

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
    parsers.property('attribute', parsers.uint8),
    parsers.property('status', parsers.uint8),
    parsers.property('dataType', parsers.uint8),
    parsers.property('value', parsers.buffer(parsers.uint16)),
))

messages.register(MessageType.WriteAttribute | MessageType.Response, parsers.object<AttributeResponse>(
    parsers.property('sequenceNumber', parsers.uint8),
    parsers.property('sourceAddress', parsers.uint16),
    parsers.property('endpoint', parsers.uint8),
    parsers.property('clusterId', parsers.uint8),
    parsers.property('attribute', parsers.uint8),
    parsers.property('status', parsers.uint8),
    parsers.property('dataType', parsers.uint8),
    parsers.property('value', parsers.buffer(parsers.uint16)),
))

messages.register(MessageType.ReportIndividualAttribute | MessageType.Response, parsers.object<AttributeResponse>(
    parsers.property('sequenceNumber', parsers.uint8),
    parsers.property('sourceAddress', parsers.uint16),
    parsers.property('endpoint', parsers.uint8),
    parsers.property('clusterId', parsers.uint16),
    parsers.property('attribute', parsers.uint16),
    parsers.property('status', parsers.uint8),
    parsers.property('dataType', parsers.uint8),
    parsers.chooseProperty('dataType', 'value', {
        0x00: parsers.skip(0),
        0x08: parsers.int8,
        0x09: parsers.int16,
        0x0a: parsers.int24,
        0x0b: parsers.int32,
        // 0x0c: parsers.int40,
        // 0x0d: parsers.int48,
        // 0x0e: parsers.int56,
        0x0f: parsers.int64,
        0x10: parsers.boolean(parsers.uint8),

        0x18: parsers.buffer(1),
        0x19: parsers.buffer(2),
        0x1A: parsers.buffer(3),
        0x1B: parsers.buffer(4),

        0x20: parsers.uint8,
        0x21: parsers.uint16,
        0x22: parsers.uint24,
        0x23: parsers.uint32,
        // 0x24: parsers.uint40,
        // 0x25: parsers.uint48,
        // 0x26: parsers.uint56,
        0x27: parsers.uint64,


        0x28: parsers.uint8,
        0x29: parsers.uint16,
        0x2a: parsers.uint24,
        0x2b: parsers.uint32,
        // 0x2c: parsers.uint40,
        // 0x2d: parsers.uint48,
        // 0x2e: parsers.uint56,
        0x2f: parsers.uint64,

        0x30: parsers.uint8,
        0x31: parsers.uint16,
        //0x38: parsers.float,	Semi-precision float	2	IEEE-754 half-float
        0x39: parsers.float, //Single- precision float	4	IEEE - 754 float
        0x3A: parsers.double,//	Double-precision float	8	IEEE-754 double
        0x41: parsers.buffer(parsers.uint8),//	Octet string	variable	Length-prefixed (1 byte length)
        0x42: parsers.string(parsers.uint8, 'utf-8'),//	Character string	variable	UTF-8 or ASCII, 1-byte length
        0x43: parsers.buffer(parsers.uint16), // Long octet string	variable	2 - byte length prefix
        0x44: parsers.string(parsers.uint16, 'utf-8'), // Long character string	variable	2 - byte length prefix
        // 0x48	Array	variable	Complex type
        // 0x4C	Structure	variable	Complex type
        // 0xE0	Time of day	4	hh: mm: ss in BCD
        // 0xE1	Date	4	YYYY - MM - DD
        // 0xE2	UTC time	4	Seconds since 1 Jan 2000
        // 0xE8	Cluster ID	2	Cluster identifier
        // 0xE9	Attribute ID	2	Attribute identifier
        // 0xEA	BACnet OID	4	—
    } as Record<number, parsers.AnyParser<any, AttributeResponse>>),
))

export interface AttributeResponse extends StatusMessage
{
    sourceAddress: uint16;
    endpoint: uint8;
    clusterId: Cluster;
    attribute: uint16;
    status: uint8;
    dataType: uint8;
    value: IsomorphicBuffer | number | bigint | string | boolean;
}