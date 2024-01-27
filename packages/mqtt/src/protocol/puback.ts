import { parsers, uint16 } from '@akala/protocol-parser';
import { header } from './_protocol.js'
import { ControlPacketType, Properties, ReasonCodes, propertiesParser } from './_shared.js';


export default interface Header 
{
    packetId: uint16;
    reason: ReasonCodes;
    properties: Properties;
}

export type Message = { header: Header };

header.register(ControlPacketType.PUBACK, parsers.object<Message>(
    parsers.complexProperty<Message, 'header'>('header', parsers.object<Header>(
        parsers.property('packetId', parsers.uint16),
        parsers.property('reason', parsers.uint8),
        parsers.property('properties', propertiesParser),
    ))));