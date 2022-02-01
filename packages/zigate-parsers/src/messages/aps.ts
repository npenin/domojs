import { StatusMessage } from './status';
import { MessageType, messages } from './_common';
import { CommandMessage } from './move';
import { parsers, uint16, uint64, uint8 } from '@domojs/protocol-parser';

messages.register(MessageType.RawAPSData, parsers.object<APSRequest>(
    parsers.property('addressMode', parsers.uint8),
    parsers.property('targetShortAddress', parsers.uint16),
    parsers.property('sourceEndpoint', parsers.uint8),
    parsers.property('destinationEndpoint', parsers.uint8),
    parsers.property('profileId', parsers.uint16),
    parsers.property('clusterId', parsers.uint16),
    parsers.property('securityMode', parsers.uint8),
    parsers.property('radius', parsers.uint8),
    parsers.property('raw', parsers.array(parsers.uint8, parsers.uint8)),
))

export interface APSRequest extends CommandMessage
{
    profileId: uint16;
    clusterId: uint16;
    securityMode: uint8;
    radius: uint8;
    raw: uint8[];
}

messages.register(MessageType.APSDataConfirmFail, parsers.object<APSDataConfirmFail>(
    parsers.property('status', parsers.uint8),
    parsers.property('sourceEndpoint', parsers.uint8),
    parsers.property('destinationEndpoint', parsers.uint8),
    parsers.property('addressMode', parsers.uint8),
    parsers.property('destinationAddress', parsers.uint64),
    parsers.property('sequenceNumber', parsers.uint8),
))

export interface APSDataConfirmFail extends CommandMessage, StatusMessage
{
    destinationAddress: uint64;
}
