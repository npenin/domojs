import { Frame, uint16, uint8 } from '@domojs/protocol-parser';
import { ControlPacketType, Properties, propertiesFrame, Protocol, Message as CoreMessage, ReasonCodes } from './protocol'


export default interface Message extends CoreMessage
{
    properties: Properties;
    topicFilter: string[]
}

Protocol.register<Message>('type', ControlPacketType.UNSUBSCRIBE, [
    Object.assign({}, propertiesFrame, { name: 'properties' }),
    { name: 'topicFilter', type: 'string[]' }
]);