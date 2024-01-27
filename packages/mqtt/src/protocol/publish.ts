import { parsers, uint16 } from '@akala/protocol-parser';
import { header, Message as CoreMessage } from './_protocol.js'
import { ControlPacketType, Properties, propertiesParser } from './_shared.js';

export interface Header 
{
    topic: string;
    packetId: uint16;
    properties: Properties;
}
export type Message = CoreMessage<{ header: Header }>;

header.register(ControlPacketType.PUBLISH, parsers.object<Message>(
    parsers.complexProperty<Message, 'header'>('header', parsers.object<Header>(
        parsers.property('topic', parsers.string(parsers.uint16)))),
    parsers.condition(m => m.qos > 0,
        parsers.complexProperty<Message, 'header'>('header', parsers.object<Header>(
            parsers.property('packetId', parsers.uint16)))),
    parsers.complexProperty<Message, 'header'>('header', parsers.object<Header>(
        parsers.property('properties', propertiesParser))),
));