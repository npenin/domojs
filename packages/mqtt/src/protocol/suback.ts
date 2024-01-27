import { parsers } from '@akala/protocol-parser';
import { header, Message as CoreMessage } from './_protocol.js'
import { ControlPacketType, Properties, propertiesParser } from './_shared.js';


export interface Header 
{
    packetId: number;
    properties: Properties;
}
export type Message = { header: Header };

header.register(ControlPacketType.SUBACK, parsers.object<Message>(
    parsers.complexProperty<Message, 'header'>('header', parsers.object<Header>(
        parsers.property('packetId', parsers.uint16),
        parsers.property('properties', propertiesParser)
    ))
));