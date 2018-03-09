import { StatusMessage, Status } from './status';
import { Message, MessageType, Protocol } from './common';
import { FrameDescription } from '@domojs/protocol-parser';

const bindFrame: FrameDescription<BindRequest>[] = [
    { name: 'targetExtendedAddress', type: 'uint64' },
    { name: 'targetEndpoint', type: 'uint8' },
    { name: 'clusterId', type: 'uint16' },
    { name: 'destinationAddressMode', type: 'uint8' },
    {
        name: 'destinationAddress', type: function (instance: Partial<BindRequest>)
        {
            switch (instance.destinationAddressMode)
            {
                case 0:
                    return 'uint16';
                case 1:
                    return 'uint64';
                default:
                    throw new Error(`Address mode ${instance.destinationAddressMode} is not supported`);
            }
        }
    },
    { name: 'destinationEndpoint', type: 'uint8' }
];

Protocol.register<BindRequest>('type', MessageType.Bind, bindFrame);
Protocol.register<BindRequest>('type', MessageType.Unbind, bindFrame);
Protocol.register<StatusMessage>('type', MessageType.Bind | MessageType.Response, [
    { name: 'sequenceNumber', type: 'uint8' },
    { name: 'status', type: 'uint8' }
])
Protocol.register<StatusMessage>('type', MessageType.Unbind | MessageType.Response, [
    { name: 'sequenceNumber', type: 'uint8' },
    { name: 'status', type: 'uint8' }
])

export interface BindRequest 
{
    targetExtendedAddress: number;
    targetEndpoint: number;
    clusterId: number;
    destinationAddressMode: number;
    destinationAddress: number;
    destinationEndpoint: number;
}
