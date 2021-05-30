import { Frame, uint16, uint8 } from '@domojs/protocol-parser';
import { ControlPacketType, Properties, propertiesFrame, Protocol, Message as CoreMessage, ReasonCodes } from './protocol'

export default interface Message extends CoreMessage
{
    reservedConnectFlag1: false;
    reservedConnectFlag2: false;
    reservedConnectFlag3: false;
    reservedConnectFlag4: false;
    reservedConnectFlag5: false;
    reservedConnectFlag6: false;
    reservedConnectFlag7: false;
    hasSession: boolean;
    properties: Properties;
    reason: ReasonCodes;
}

messages.register(ControlPacketType.CONNACK, parsers.object<Message>(
    parsers.property('reservedConnectFlag1', parsers.bit),
    parsers.property('reservedConnectFlag2', parsers.bit),
    parsers.property('reservedConnectFlag3', parsers.bit),
    parsers.property('reservedConnectFlag4', parsers.bit),
    parsers.property('reservedConnectFlag5', parsers.bit),
    parsers.property('reservedConnectFlag6', parsers.bit),
    parsers.property('reservedConnectFlag7', parsers.bit),
    parsers.property('hasSession', parsers.bit),
    parsers.property('reason', parsers.uint8),
    Object.assign({}, propertiesFrame, { name: 'properties' }),
]);