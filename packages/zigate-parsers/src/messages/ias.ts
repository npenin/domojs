import { StatusMessage } from './status';
import { Message, MessageType, uint8, uint16, Protocol } from './common';
import { ShortAddressRequest } from './descriptors';
import { CommandMessage } from './move';

Protocol.register<IASZoneMessage>('type', MessageType.IASZoneEnrollResponse, [
    { name: 'addressMode', type: 'uint8' },
    { name: 'targetShortAddress', type: 'uint16' },
    { name: 'sourceEndpoint', type: 'uint8' },
    { name: 'destinationEndpoint', type: 'uint8' },
    { name: 'enrollResponseCode', type: 'uint16' },
    { name: 'zoneId', type: 'uint8' },
])

export interface IASZoneMessage extends CommandMessage
{
    zoneId: uint8;
    enrollResponseCode: uint8;
}
