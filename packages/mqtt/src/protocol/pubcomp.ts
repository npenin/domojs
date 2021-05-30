import { Frame, uint16, uint8 } from '@domojs/protocol-parser';
import { ControlPacketType, Properties, propertiesFrame, Protocol, Message as CoreMessage, ReasonCodes } from './protocol'


export default interface Message extends CoreMessage
{
    packetId: uint16;
    reason: ReasonCodes;
    properties: Properties;
}

messages.register(ControlPacketType.PUBCOMP, parsers.object<Message>(
    { name: 'packetId', type: 'uint16', },
    parsers.property('reason', parsers.uint8),
    Object.assign({}, propertiesFrame, { name: 'properties' }),
]);