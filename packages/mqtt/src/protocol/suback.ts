import { Frame, uint16, uint8 } from '@domojs/protocol-parser';
import { ControlPacketType, Properties, propertiesFrame, Protocol, Message as CoreMessage, ReasonCodes } from './protocol'


export default interface Message extends CoreMessage
{
    properties: Properties;
}

Protocol.register<Message>('type', ControlPacketType.SUBACK, [
    Object.assign({}, propertiesFrame, { name: 'properties' }),
]);