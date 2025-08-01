import { parsers } from '@akala/protocol-parser';
import { header } from './_protocol.js'
import { ControlPacketType, Properties, ReasonCodes, propertiesParser, Message as CoreMessage } from './_shared.js';

export interface Message extends CoreMessage<ControlPacketType.CONNACK>
{
    reservedConnectFlag1: boolean;
    reservedConnectFlag2: boolean;
    reservedConnectFlag3: boolean;
    reservedConnectFlag4: boolean;
    reservedConnectFlag5: boolean;
    reservedConnectFlag6: boolean;
    reservedConnectFlag7: boolean;
    hasSession: boolean;
    properties: Properties;
    reason: ReasonCodes;
}

export const ConnAckParser = parsers.series<Message>(
    parsers.property('hasSession', parsers.boolean()),
    parsers.property('reservedConnectFlag1', parsers.boolean()),
    parsers.property('reservedConnectFlag2', parsers.boolean()),
    parsers.property('reservedConnectFlag3', parsers.boolean()),
    parsers.property('reservedConnectFlag4', parsers.boolean()),
    parsers.property('reservedConnectFlag5', parsers.boolean()),
    parsers.property('reservedConnectFlag6', parsers.boolean()),
    parsers.property('reservedConnectFlag7', parsers.boolean()),
    parsers.property('reason', parsers.uint8),
    parsers.property('properties', propertiesParser),
)

header.register(ControlPacketType.CONNACK, ConnAckParser as parsers.ParserWithMessage<CoreMessage, CoreMessage>);