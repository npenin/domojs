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

Protocol.register<Message>('type', ControlPacketType.CONNACK, [
    { name: 'reservedConnectFlag1', type: 'bit' },
    { name: 'reservedConnectFlag2', type: 'bit' },
    { name: 'reservedConnectFlag3', type: 'bit' },
    { name: 'reservedConnectFlag4', type: 'bit' },
    { name: 'reservedConnectFlag5', type: 'bit' },
    { name: 'reservedConnectFlag6', type: 'bit' },
    { name: 'reservedConnectFlag7', type: 'bit' },
    { name: 'hasSession', type: 'bit' },
    { name: 'reason', type: 'uint8' },
    Object.assign({}, propertiesFrame, { name: 'properties' }),
]);