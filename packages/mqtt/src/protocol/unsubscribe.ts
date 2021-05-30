import { Frame, uint16, uint8 } from '@domojs/protocol-parser';
import { ControlPacketType, Properties, propertiesFrame, Protocol, Message as CoreMessage, ReasonCodes } from './protocol'


export default interface Message extends CoreMessage
{
    properties: Properties;
    topicFilter: string[]
}

messages.register(ControlPacketType.UNSUBSCRIBE, parsers.object<Message>(
    Object.assign({}, propertiesFrame, { name: 'properties' }),
    parsers.property('topicFilter', parsers.string[])
]);