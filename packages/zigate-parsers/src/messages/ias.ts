import { MessageType, messages } from './_common';
import { CommandMessage } from './move';
import { parsers, uint8 } from '@domojs/protocol-parser';

messages.register(MessageType.IASZoneEnrollResponse, parsers.object<IASZoneMessage>(
    parsers.property('addressMode', parsers.uint8),
    parsers.property('targetShortAddress', parsers.uint16),
    parsers.property('sourceEndpoint', parsers.uint8),
    parsers.property('destinationEndpoint', parsers.uint8),
    parsers.property('enrollResponseCode', parsers.uint16),
    parsers.property('zoneId', parsers.uint8),
));

export interface IASZoneMessage extends CommandMessage
{
    zoneId: uint8;
    enrollResponseCode: uint8;
}
