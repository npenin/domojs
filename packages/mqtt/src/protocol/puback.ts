import { Frame, uint16, uint8 } from '@domojs/protocol-parser';
import { ControlPacketType, Properties, propertiesFrame, Protocol, Message as CoreMessage, ReasonCodes } from './protocol'


export default interface Message extends CoreMessage
{
    packetId: uint16;
    reason: ReasonCodes;
    properties: Properties;
}

Protocol.register<Message>('type', ControlPacketType.PUBACK, [
    { name: 'packetId', type: 'uint16', optional: 'dup' },
    { name: 'reason', type: 'uint8' },
    Object.assign({}, propertiesFrame, { name: 'properties' }),
]);