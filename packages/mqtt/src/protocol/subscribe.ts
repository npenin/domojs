import { parsers, uint16 } from '@akala/protocol-parser';
import { header, Message as CoreMessage } from './_protocol.js'
import { ControlPacketType, Properties, propertiesParser } from './_shared.js';


export interface Header
{
    packetId: uint16;
    properties: Properties;
    topics: TopicSubscription[];
}

export interface TopicSubscription
{
    topic: string;
    maxQoS: number;
    doNotForward: boolean;
    retainAsPublished: boolean;
    retainHandling: RetainHandling;
}

export enum RetainHandling
{
    SendAtSubscribe = 0,
    SendAtSubscribeIfNotExist = 1,
    DoNotSend = 2,
}
export type Message = { header: Header };

header.register(ControlPacketType.SUBSCRIBE, parsers.object<Message>(
    parsers.complexProperty<Message, 'header'>('header', parsers.object<Header>(
        parsers.property('packetId', parsers.uint16),
        parsers.property('properties', propertiesParser),
        parsers.property('topics', parsers.array<TopicSubscription, Header>(-1,
            parsers.object<TopicSubscription>(
                parsers.property('topic', parsers.string(parsers.uint16)),
                parsers.skip(2),
                parsers.property('retainHandling', parsers.uint2),
                parsers.property('retainAsPublished', parsers.boolean()),
                parsers.property('doNotForward', parsers.boolean())
            )))
    ))
));