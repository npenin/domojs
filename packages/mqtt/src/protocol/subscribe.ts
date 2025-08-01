import { parsers, uint16 } from '@akala/protocol-parser';
import { header, MessageParser } from './_protocol.js'
import { ControlPacketType, Properties, propertiesParser, stringParser, Message as CoreMessage } from './_shared.js';


export interface Message extends CoreMessage<ControlPacketType.SUBSCRIBE>
{
    packetId: uint16;
    topics: TopicSubscription[];
}

export interface TopicSubscription
{
    topic: string;
    maxQoS: number;
    noLocal: boolean;
    retainAsPublished: boolean;
    retainHandling: RetainHandling;
}

export enum RetainHandling
{
    SendAtSubscribe = 0,
    SendAtSubscribeIfNotExist = 1,
    DoNotSend = 2,
}

header.register(ControlPacketType.SUBSCRIBE,
    parsers.series<Message>(
        parsers.property('packetId', parsers.uint16),
        parsers.property('properties', propertiesParser),
        parsers.property('topics', parsers.emancipate(parsers.array(-1,
            parsers.object<TopicSubscription>(
                parsers.property('topic', stringParser),
                parsers.property('maxQoS', parsers.uint2),
                parsers.property('noLocal', parsers.boolean()),
                parsers.property('retainAsPublished', parsers.boolean()),
                parsers.property('retainHandling', parsers.uint2),
                parsers.skip(.25)
            )))
        )
    ) as parsers.ParserWithMessage<CoreMessage, CoreMessage>
);

export const SubscribeParser =
    parsers.object<Message>(
        parsers.prepare<Message, Message>(m =>
        {
            m.qos = 1;
            m.type = ControlPacketType.SUBSCRIBE
        },
            parsers.series<Message>(
                MessageParser as any,
                parsers.sub(parsers.unsignedLEB128, header) as any
            )
        )
    );