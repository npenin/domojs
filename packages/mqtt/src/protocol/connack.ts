import { parsers, uint16, uint8 } from '@domojs/protocol-parser';
import { ControlPacketType, Properties, propertiesFrame, Protocol, Message as CoreMessage, ReasonCodes } from './_protocol'

export default interface Message extends CoreMessage
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

Protocol.register(ControlPacketType.CONNACK, parsers.object<Message>(
    parsers.property('reservedConnectFlag1', parsers.boolean()),
    parsers.property('reservedConnectFlag2', parsers.boolean()),
    parsers.property('reservedConnectFlag3', parsers.boolean()),
    parsers.property('reservedConnectFlag4', parsers.boolean()),
    parsers.property('reservedConnectFlag5', parsers.boolean()),
    parsers.property('reservedConnectFlag6', parsers.boolean()),
    parsers.property('reservedConnectFlag7', parsers.boolean()),
    parsers.property('hasSession', parsers.boolean()),
    parsers.property('reason', parsers.uint8),
    Object.assign({}, propertiesFrame, { name: 'properties' }),
));