import { Frame, uint16, uint8 } from '@domojs/protocol-parser';
import { ControlPacketType, Properties, propertiesFrame, Protocol, Message as CoreMessage } from './protocol'

export default interface Message extends CoreMessage
{
    topic: string;
    packetId: uint16;
    properties: Properties;
}

Protocol.register<Message>('type', ControlPacketType.PUBLISH, [
    { name: 'topic', type: 'string', length: 'uint16' },
    { name: 'packetId', type: 'uint16', optional: 'dup' },
    Object.assign({}, propertiesFrame, { name: 'properties' }),
]);