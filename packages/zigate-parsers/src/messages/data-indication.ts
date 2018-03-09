import { StatusMessage } from './status';
import { Message, MessageType, uint8, uint16, Protocol } from './common';
import { ShortAddressRequest } from 'zigate/src/messages/descriptors';
import { CommandMessage } from './move';

Protocol.register<DataIndication>('type', MessageType.DataIndication, [
    { name: 'status', type: 'uint8' },
    { name: 'profileId', type: 'uint16' },
    { name: 'clusterId', type: 'uint16' },
    { name: 'sourceEndpoint', type: 'uint8' },
    { name: 'sourceAddressMode', type: 'uint16' },
    {
        name: 'sourceAddress', type: function (instance)
        {
            switch (instance.sourceAddressMode)
            {
                default:
                    return 'uint16';
            }
        }
    },
    { name: 'destinationAddressMode', type: 'uint16' },
    {
        name: 'destinationAddress', type: function (instance)
        {
            switch (instance.sourceAddressMode)
            {
                default:
                    return 'uint16';
            }
        }
    },
    { name: 'payload', type: 'uint8[]', length: 'uint8' },
])

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
