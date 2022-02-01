import { parsers, uint16 } from '@domojs/protocol-parser';
import { ControlPacketType, Properties, propertiesFrame, Protocol, Message as CoreMessage } from './_protocol'


export default interface Message extends CoreMessage
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

Protocol.register(ControlPacketType.SUBSCRIBE, parsers.object<Message>(
    parsers.property('packetId', parsers.uint16),
    parsers.property('properties', propertiesFrame),
    parsers.property('topics', parsers.array<TopicSubscription, Message>(-1,
        parsers.object<TopicSubscription>(
            parsers.property('topic', parsers.string(parsers.uint16)),
            parsers.skip(2),
            parsers.property('retainHandling', parsers.uint2),
            parsers.property('retainAsPublished', parsers.boolean()),
            parsers.property('doNotForward', parsers.boolean())
        )))
));