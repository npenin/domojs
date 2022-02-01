import { StatusMessage } from './status';
import { MessageType, messages } from './_common';
import { CommandMessage } from './move';
import { parsers, uint16, uint8 } from '@domojs/protocol-parser';

messages.register(MessageType.DataIndication, parsers.object<DataIndication>(
    parsers.property('status', parsers.uint8),
    parsers.property('profileId', parsers.uint16),
    parsers.property('clusterId', parsers.uint16),
    parsers.property('sourceEndpoint', parsers.uint8),
    parsers.property('sourceAddressMode', parsers.uint16),
    parsers.chooseProperty<DataIndication>('sourceAddress', 'sourceAddressMode', {
        0: parsers.uint16,
        1: parsers.uint64
    }),
    parsers.property('destinationAddressMode', parsers.uint16),
    parsers.chooseProperty<DataIndication>('destinationAddress', 'destinationAddressMode', {
        0: parsers.uint16,
        1: parsers.uint64
    }),
    parsers.property('payload', parsers.array(parsers.uint8, parsers.uint8)),
))

export interface DataIndication extends CommandMessage, StatusMessage
{
    profileId: uint16;
    clusterId: uint16;
    sourceAddressMode: uint8;
    destinationAddressMode: uint8;
    destinationAddress: uint16;
    sourceAddress: uint16;
    payload: uint8[];
}
