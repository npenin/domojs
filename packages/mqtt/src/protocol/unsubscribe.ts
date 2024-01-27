import { parsers } from '@akala/protocol-parser';
import { header } from './_protocol.js'
import { ControlPacketType, Properties, propertiesParser } from './_shared.js';

export interface Header
{
    properties: Properties;
    packetId: number;
    topics: string[]
}

export type Message = { header: Header };

header.register(ControlPacketType.UNSUBSCRIBE, parsers.object<Message>(
    parsers.complexProperty<Message, 'header'>('header', parsers.object<Header>(
        parsers.property('packetId', parsers.uint16),
        parsers.property('properties', propertiesParser),
        parsers.property('topics', parsers.array<string, Header>(-1, parsers.string(parsers.uint16)))
    ))
));