import { Frame, uint16, uint8 } from '@domojs/protocol-parser';
import { ControlPacketType, Properties, propertiesFrame, Protocol, Message as CoreMessage, ReasonCodes } from './protocol'


export default interface Message extends CoreMessage
{
    properties: Properties;
}

messages.register(ControlPacketType.SUBACK, parsers.object<Message>(
    Object.assign({}, propertiesFrame, { name: 'properties' }),
]);