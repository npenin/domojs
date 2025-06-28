import net from 'net'
import { Message, StandardMessages } from './protocol/_protocol.js'
import { Message as connack } from './protocol/connack.js';
import { Cursor } from '@akala/protocol-parser';
import { ControlPacketType, Properties } from './protocol/_shared.js';
import { IsomorphicBuffer, EventBus, EventEmitter, Event, IEvent, SpecialEvents, Subscription, TeardownManager, fromEvent, EventKeys, StatefulSubscription } from '@akala/core';
import { Socket } from 'net';
import { TopicSubscription } from './protocol/subscribe.js';

/// PUT in this file any API you would like to expose to your package consumer

export const mappings = {
    [ControlPacketType.CONNECT]: ControlPacketType.CONNACK,
    [ControlPacketType.PINGREQ]: ControlPacketType.PINGRESP,
    [ControlPacketType.PUBLISH]: ControlPacketType.PUBACK,
    [ControlPacketType.SUBSCRIBE]: ControlPacketType.SUBACK,
    [ControlPacketType.UNSUBSCRIBE]: ControlPacketType.UNSUBACK,
}

export type ProtocolEventsMap =
    {
        [key in keyof typeof mappings]: IEvent<[Message], void>
    }

export class ProtocolEvents extends EventEmitter<{
    [key in typeof mappings[keyof typeof mappings]]: IEvent<[Message], void, {
        qos?: number;
        retain?: boolean;
        properties?: Properties;
        once?: boolean
    }>
}>
{
    constructor(public readonly socket: Socket)
    {
        super();
        socket.on('data', (data) =>
        {
            const c = new Cursor();
            while (c.offset < data.length)
            {
                var msg = StandardMessages.read(IsomorphicBuffer.fromBuffer(data), c, {});
                this.emit(msg.type as EventKeys<ProtocolEventsMap>, msg);
            }
        });
    }
}

export type MqttEvent = IEvent<[data: IsomorphicBuffer | string,
    mqttOptions?: { qos?: number, retain?: boolean, properties?: Properties }],
    void | Promise<void>,
    Partial<TopicSubscription> & { once?: boolean, properties?: Properties }>;

export type MqttEvents = Record<string,
    MqttEvent>;

