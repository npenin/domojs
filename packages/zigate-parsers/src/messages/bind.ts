import { StatusMessage } from './status';
import { messages, MessageType } from './_common';
import { parsers, uint64 } from '@domojs/protocol-parser';

const bindFrame = parsers.object<BindRequest>(
    parsers.property('targetExtendedAddress', parsers.uint64),
    parsers.property('targetEndpoint', parsers.uint8),
    parsers.property('clusterId', parsers.uint16),
    parsers.property('destinationAddressMode', parsers.uint8),
    parsers.chooseProperty<BindRequest>('destinationAddress', 'destinationAddressMode', {
        0: parsers.uint16,
        1: parsers.uint64
    }),
    parsers.property('destinationEndpoint', parsers.uint8)
);

messages.register(MessageType.Bind, bindFrame);
messages.register(MessageType.Unbind, bindFrame);
messages.register(MessageType.Bind | MessageType.Response, parsers.object<StatusMessage>(
    parsers.property('sequenceNumber', parsers.uint8),
    parsers.property('status', parsers.uint8)
))
messages.register(MessageType.Unbind | MessageType.Response, parsers.object<StatusMessage>(
    parsers.property('sequenceNumber', parsers.uint8),
    parsers.property('status', parsers.uint8)
))

export interface BindRequest 
{
    targetExtendedAddress: uint64;
    targetEndpoint: number;
    clusterId: number;
    destinationAddressMode: number;
    destinationAddress: number;
    destinationEndpoint: number;
}
