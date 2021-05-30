import { Frame, uint16, uint8 } from '@domojs/protocol-parser';
import { ControlPacketType, Properties, propertiesFrame, Protocol, Message as CoreMessage, ReasonCodes } from './protocol'


export default interface Message extends CoreMessage
{
    packetId: uint16;
    properties: Properties;
}

messages.register(ControlPacketType.SUBSCRIBE, parsers.object<Message>(
    { name: 'packetId', type: 'uint16', },
    Object.assign({}, propertiesFrame, { name: 'properties' }),
]);