import { AsyncTeardownManager, AsyncEventBus, StatefulAsyncSubscription, EventOptions, EventListener, AllEventKeys, AllEvents, AsyncSubscription, IsomorphicBuffer, asyncEventBuses, Deferred, delay } from '@akala/core';
import { MqttEvents, MqttEvent, ProtocolEvents, mappings } from './index.js';
import { Message, StandardMessages } from './protocol/_protocol.js';
import { ControlPacketType, Properties, PropertyKeys, ReasonCodes } from './protocol/_shared.js';
import { Message as ConnectMessage } from './protocol/connect.js';
import { Message as publish } from './protocol/publish.js';
import { Message as puback } from './protocol/puback.js';
import { Message as subscribe, SubscribeParser, TopicSubscription } from './protocol/subscribe.js';
import { Message as unsubscribe } from './protocol/unsubscribe.js';
import { Socket, SocketConnectOpts, SocketConstructorOpts } from 'net';
import { TLSSocket, TLSSocketOptions } from 'tls';
import './protocol/index.js'
import { parserWrite } from '@akala/protocol-parser';

export class MqttClient extends AsyncTeardownManager implements AsyncEventBus<MqttEvents>
{
    private packetId = 1;
    private _connected = false;

    public get connected()
    {
        return this._connected;
    }

    private mqttSubscriptions: Record<string, { subscription: StatefulAsyncSubscription; options: EventOptions<MqttEvent>; listener: EventListener<MqttEvent>; }[]> = {};

    constructor(private clientId: string, private readonly protocolEvents: ProtocolEvents)
    {
        super();
        protocolEvents.on(ControlPacketType.CONNACK, () => this._connected = true);
        protocolEvents.on(ControlPacketType.DISCONNECT, () => protocolEvents.socket.end());
        protocolEvents.socket.on('close', () => this._connected = false);
    }
    hasListener<const TKey extends AllEventKeys<MqttEvents>>(name: TKey)
    {
        return Promise.resolve(true);
    }
    get definedEvents(): Promise<AllEventKeys<MqttEvents>[]>
    {
        return Promise.resolve([]);
    }
    async on<const TEvent extends AllEventKeys<MqttEvents>>(event: TEvent, handler: EventListener<AllEvents<MqttEvents>[TEvent]>, options?: EventOptions<MqttEvent>): Promise<AsyncSubscription>
    {
        if (typeof event === 'string')
        {
            const subscription = new StatefulAsyncSubscription(async () =>
            {
                await this.unsubscribe([event], options as EventOptions<MqttEvent>);
                const indexOfSubscription = this.mqttSubscriptions[event].findIndex(s => s.subscription === subscription);
                if (indexOfSubscription == -1)
                    return false;

                this.mqttSubscriptions[event].splice(indexOfSubscription, 1);
                return publishSub?.();
            });
            await this.subscribe([event], options);
            if (!this.mqttSubscriptions[event])
                this.mqttSubscriptions[event] = [];
            this.mqttSubscriptions[event].push({ subscription: subscription, options, listener: handler as EventListener<MqttEvent> });
            const publishSub = this.protocolEvents.on(ControlPacketType.PUBLISH, async (m: publish) =>
            {
                try
                {
                    await handler(m.properties.find(p => p.property === PropertyKeys.payloadFormat)?.value ? m.stringPayload : m.binaryPayload, { qos: m.qos, retain: m.retain, properties: m.properties });
                    if (m.qos > 0)
                    {
                        const message: puback = {
                            packetId: m.packetId,
                            reason: ReasonCodes.Success,
                            type: ControlPacketType.PUBACK,
                            properties: [],
                        };
                        this.protocolEvents.socket.write(IsomorphicBuffer.concat(parserWrite(StandardMessages, message, message)).toArray())
                    }
                }
                catch (e)
                {
                    console.error(e);
                    if (m.qos > 0)
                    {
                        const message: puback = {
                            packetId: m.packetId,
                            reason: ReasonCodes.UnspecifiedError,
                            type: ControlPacketType.PUBACK,
                            properties: [],
                        };
                        this.protocolEvents.socket.write(IsomorphicBuffer.concat(parserWrite(StandardMessages, message, message)).toArray())
                    }
                }
            });
            return subscription.unsubscribe;
        }
    }
    once<const TEvent extends AllEventKeys<MqttEvents>>(event: TEvent, handler: EventListener<AllEvents<MqttEvents>[TEvent]>, options?: Omit<EventOptions<MqttEvent>, 'once'>): Promise<AsyncSubscription>
    {
        return this.on(event, handler, { ...options, once: true });
    }
    off<const TEvent extends AllEventKeys<MqttEvents>>(event: TEvent, handler?: EventListener<AllEvents<MqttEvents>[TEvent]>): Promise<boolean>
    {
        if (typeof event === 'string')
            if (handler)
                return this.mqttSubscriptions[event]?.find(x => x.listener === handler)?.subscription?.unsubscribe() || Promise.resolve(false);

            else
                return this.mqttSubscriptions[event]?.reduce(async (previous, current) => await previous && await current.subscription.unsubscribe(), Promise.resolve(true));

    }

    private getNextPacketId()
    {
        return this.packetId++;
    }

    private dialog(message: Message): Promise<Message>
    {
        const mapping = mappings[message.type];
        if (!mapping)
            return Promise.reject(new Error('there is no such mapping for ' + JSON.stringify(message)));
        return new Promise((resolve, reject) =>
        {
            const sub = this.protocolEvents.on(mapping, (m: Message) =>
            {
                if ('packetId' in message)
                {
                    if (message.packetId == m['packetId'])
                    {
                        sub();
                        resolve(m);
                    }
                }
                else
                {
                    sub();
                    resolve(m);
                }
            });

            if (message.type === ControlPacketType.SUBSCRIBE)
                this.protocolEvents.socket.write(IsomorphicBuffer.concat(parserWrite(SubscribeParser, message, message)).toArray());
            else
                this.protocolEvents.socket.write(IsomorphicBuffer.concat(parserWrite(StandardMessages, message, message)).toArray());
        });
    }

    public connect(opts?: { keepAlive?: number, sessionId?: number; password?: IsomorphicBuffer; userName?: string; will?: { QoS?: number; retain?: boolean; properties: Properties; topic: string; }; }): Promise<Message>
    {
        if (!opts)
            opts = {};
        const message: ConnectMessage = {
            type: ControlPacketType.CONNECT,
            protocol: 'MQTT',
            version: 5,
            keepAlive: opts?.keepAlive ?? 60,
            cleanStart: !opts.sessionId,
            hasPassword: !!opts.password,
            hasUserName: !!opts.userName,
            hasWill: !!opts.will,
            properties: [],
            payload: {
                password: opts.password,
                userName: opts.userName,
                clientId: this.clientId
            }
        };
        return this.dialog(message);
    }

    public publish(topic: string, payload: IsomorphicBuffer | string, options?: { qos?: number; retain?: boolean; properties?: Properties; }): Promise<void | Message>
    {
        const qos = options?.qos || 0;
        const message: publish = {
            type: ControlPacketType.PUBLISH,
            qos,
            retain: options?.retain,
            topic,
            packetId: this.getNextPacketId(),
            properties: options?.properties || [typeof payload == 'string' ? { property: PropertyKeys.payloadFormat, value: 1 } : { property: PropertyKeys.payloadFormat, value: 0 }],
            stringPayload: typeof payload === 'string' ? payload : undefined,
            binaryPayload: typeof payload !== 'string' ? payload : undefined,
        };
        if (qos === 0)
            return new Promise<void>((resolve, reject) => this.protocolEvents.socket.write(IsomorphicBuffer.concat(StandardMessages.write(message, message)).toArray(), err => err ? reject(err) : resolve()));

        return this.dialog(message);
    }

    public async emit(topic: string, payload: IsomorphicBuffer | string, options?: { qos?: number; retain?: boolean; properties?: Properties; }): Promise<void>
    {
        await this.publish(topic, payload, options);
    }

    public subscribe(topics: string[], options?: Partial<TopicSubscription> & { qos?: number, properties?: Properties }): Promise<void | Message>
    {
        const packetId = this.getNextPacketId();
        const message: subscribe = {
            type: ControlPacketType.SUBSCRIBE,
            packetId,
            qos: options?.qos,
            properties: options?.properties ?? [],
            topics: topics.map(topic => ({
                topic,
                maxQoS: options?.maxQoS ?? 2,
                noLocal: options?.noLocal,
                retainAsPublished: options?.retainAsPublished,
                retainHandling: options?.retainHandling
            }))
        };

        return this.dialog(message);
    }

    public unsubscribe(topics: string[], options?: { properties?: Properties; }): Promise<void | Message>
    {
        const packetId = this.getNextPacketId();
        const message: unsubscribe = {
            type: ControlPacketType.UNSUBSCRIBE,
            packetId,
            properties: options?.properties || [],
            topics
        };
        return this.dialog(message);
    }

    public ping(): Promise<Message>
    {
        const message: Message = {
            type: ControlPacketType.PINGREQ
        };
        return this.dialog(message);
    }
}

asyncEventBuses.useProtocol('mqtt', async (url, config) =>
{
    const socket = new Socket({ ...config, signal: config.abort });

    const defer = new Deferred<void>();
    const port = Number(url.port);
    socket.connect(!isNaN(port) && port ? port : 1883, url.hostname, defer.resolve.bind(defer));
    socket.on('error', defer.reject.bind(defer));

    await defer;

    const protocolEvents = new ProtocolEvents(socket);

    protocolEvents.on(ControlPacketType.AUTH, (msg) =>
    {
        console.log('%s: %o', ControlPacketType[msg.type], msg)
    })
    protocolEvents.on(ControlPacketType.CONNACK, (msg) =>
    {
        console.log('%s: %o', ControlPacketType[msg.type], msg)
    })
    protocolEvents.on(ControlPacketType.CONNECT, (msg) =>
    {
        console.log('%s: %o', ControlPacketType[msg.type], msg)
    })
    protocolEvents.on(ControlPacketType.DISCONNECT, (msg) =>
    {
        console.log('%s: %o', ControlPacketType[msg.type], msg)
    })
    protocolEvents.on(ControlPacketType.PINGREQ, (msg) =>
    {
        console.log('%s: %o', ControlPacketType[msg.type], msg)
    })
    protocolEvents.on(ControlPacketType.PINGRESP, (msg) =>
    {
        console.log('%s: %o', ControlPacketType[msg.type], msg)
    })
    protocolEvents.on(ControlPacketType.PUBACK, (msg) =>
    {
        console.log('%s: %o', ControlPacketType[msg.type], msg)
    })
    protocolEvents.on(ControlPacketType.PUBCOMP, (msg) =>
    {
        console.log('%s: %o', ControlPacketType[msg.type], msg)
    })
    protocolEvents.on(ControlPacketType.PUBLISH, (msg) =>
    {
        console.log('%s: %o', ControlPacketType[msg.type], msg)
    })
    protocolEvents.on(ControlPacketType.PUBREC, (msg) =>
    {
        console.log('%s: %o', ControlPacketType[msg.type], msg)
    })
    protocolEvents.on(ControlPacketType.PUBREL, (msg) =>
    {
        console.log('%s: %o', ControlPacketType[msg.type], msg)
    })
    protocolEvents.on(ControlPacketType.SUBACK, (msg) =>
    {
        console.log('%s: %o', ControlPacketType[msg.type], msg)
    })
    protocolEvents.on(ControlPacketType.SUBSCRIBE, (msg) =>
    {
        console.log('%s: %o', ControlPacketType[msg.type], msg)
    })
    protocolEvents.on(ControlPacketType.UNSUBACK, (msg) =>
    {
        console.log('%s: %o', ControlPacketType[msg.type], msg)
    })
    protocolEvents.on(ControlPacketType.UNSUBSCRIBE, (msg) =>
    {
        console.log('%s: %o', ControlPacketType[msg.type], msg)
    })

    socket.on('error', err =>
    {
        console.error(err);
    })

    const client = new MqttClient(config?.['clientId'] as string ?? crypto.randomUUID(), protocolEvents);

    if (url.username || url.password)
        await client.connect({ userName: url.username, password: IsomorphicBuffer.from(url.password) });
    else
        await client.connect({});

    return client;
});

asyncEventBuses.useProtocol('mqtts', async (url, config) =>
{
    const socket = new TLSSocket(new Socket(config as SocketConstructorOpts), config as TLSSocketOptions);

    const defer = new Deferred<void>();
    const port = Number(url.port);
    socket.connect(!isNaN(port) && port ? port : 1883, url.hostname, defer.resolve.bind(defer));
    socket.on('error', defer.reject.bind(defer));

    await defer;

    return new MqttClient(config?.clientId as string ?? crypto.randomUUID(), new ProtocolEvents(socket));
})

asyncEventBuses.useProtocol('mqtt+tls', async (url, config) =>
{
    return asyncEventBuses.process(new URL('mqtts:' + url.host + url.pathname + url.search + url.hash), config);
})