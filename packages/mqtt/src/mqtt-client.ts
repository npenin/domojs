import { AsyncTeardownManager, AsyncEventBus, StatefulAsyncSubscription, EventOptions, EventListener, AllEvents, AsyncSubscription, IsomorphicBuffer, asyncEventBuses, Deferred, delay, HttpStatusCode, ErrorWithStatus, EventKeys, EventBus, eachAsync, UrlTemplate } from '@akala/core';
import { MqttEvents, MqttEvent, ProtocolEvents, mappings, DisconnectError, MessageMap } from './shared.js';
import { StandardMessages, ControlPacketType, Properties, PropertyKeys, ReasonCodes, Message, connect, disconnect, publish, puback, subscribe, unsubscribe, pingresp, pingreq, MessageTypes } from './protocol/index.js';
import { Socket } from 'net';
import { TLSSocket } from 'tls';
import './protocol/index.js'
import { parserWrite } from '@akala/protocol-parser';

export class MqttClient extends AsyncTeardownManager implements AsyncEventBus<MqttEvents>
{
    private packetId = 1;
    private _connected = false;
    private pingInterval: NodeJS.Timeout;

    public get connected()
    {
        return this._connected;
    }

    private mqttSubscriptions: Record<string, { subscription: StatefulAsyncSubscription; options: EventOptions<MqttEvent>; listener: EventListener<MqttEvent>; }[]> = {};

    constructor(private clientId: string, private readonly protocolEvents: ProtocolEvents, private readonly keepAlive: number = 60000)
    {
        super();
        protocolEvents.on(ControlPacketType.CONNACK, () => this._connected = true);
        protocolEvents.on(ControlPacketType.DISCONNECT, () => { clearInterval(this.pingInterval); protocolEvents.socket.end() });
        protocolEvents.socket.on('close', () => this._connected = false);
        protocolEvents.on(ControlPacketType.PINGREQ, () =>
        {
            const pong: pingresp.Message = {
                type: ControlPacketType.PINGRESP
            }
            this.write(parserWrite(StandardMessages, pong, pong).toArray());
        })
        protocolEvents.socket.on('close', () => clearTimeout(this.pingInterval));
    }
    async write(msg: Uint8Array<ArrayBufferLike>)
    {
        clearTimeout(this.pingInterval);
        await new Promise<void>((resolve, reject) => this.protocolEvents.socket.write(msg, err => err ? reject(err) : resolve()));
        this.pingInterval = setTimeout(() =>
        {
            const ping: pingreq.Message = {
                type: ControlPacketType.PINGREQ
            }
            this.write(parserWrite(StandardMessages, ping, ping).toArray());
        }, this.keepAlive);
    }
    hasListener<const TKey extends EventKeys<MqttEvents>>(name: TKey)
    {
        return Promise.resolve(true);
    }
    get definedEvents(): Promise<EventKeys<MqttEvents>[]>
    {
        return Promise.resolve([]);
    }
    async on<const TEvent extends EventKeys<MqttEvents>>(event: TEvent, handler: EventListener<AllEvents<MqttEvents>[TEvent]>, options?: EventOptions<MqttEvent>): Promise<AsyncSubscription>
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
            const publishSub = this.protocolEvents.on(ControlPacketType.PUBLISH, async m =>
            {
                try
                {
                    const matches = Object.entries(this.mqttSubscriptions).filter(([topic, sub]) => { return topic == m.topic || UrlTemplate.match(m.topic, topicTemplate(topic)) }).flatMap(([_, subs]) => subs);
                    if (matches.length > 0)
                        await eachAsync(matches, async handler => await handler.listener(m.properties.find(p => p.property === PropertyKeys.payloadFormat)?.value ? m.stringPayload : m.binaryPayload, { publishedTopic: m.topic, qos: m.qos, retain: m.retain, properties: m.properties }));
                    if (m.qos > 0)
                    {
                        const message: puback.Message = {
                            packetId: m.packetId,
                            reason: ReasonCodes.Success,
                            type: ControlPacketType.PUBACK,
                            properties: [],
                        };
                        console.time('mqtt-write')
                        this.write(parserWrite(StandardMessages, message, message, 0).toArray())
                        console.timeEnd('mqtt-write')
                    }
                }
                catch (e)
                {
                    console.error(e);
                    if (m.qos > 0)
                    {
                        const message: puback.Message = {
                            packetId: m.packetId,
                            reason: ReasonCodes.UnspecifiedError,
                            type: ControlPacketType.PUBACK,
                            properties: [],
                        };
                        console.time('mqtt-write')
                        this.write(parserWrite(StandardMessages, message, message, 0).toArray())
                        console.timeEnd('mqtt-write')
                    }
                }
            });
            return subscription.unsubscribe;
        }
    }
    once<const TEvent extends EventKeys<MqttEvents>>(event: TEvent, handler: EventListener<AllEvents<MqttEvents>[TEvent]>, options?: Omit<EventOptions<MqttEvent>, 'once'>): Promise<AsyncSubscription>
    {
        return this.on(event, handler, { ...options, once: true });
    }
    off<const TEvent extends EventKeys<MqttEvents>>(event: TEvent, handler?: EventListener<AllEvents<MqttEvents>[TEvent]>): Promise<boolean>
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

    private dialog<const Type extends keyof typeof mappings>(message: Message<Type> & MessageTypes): Promise<MessageMap[typeof mappings[Type]]>
    {
        const mapping = mappings[message.type];
        if (!mapping)
            return Promise.reject(new Error('there is no such mapping for ' + JSON.stringify(message)));
        return new Promise(async (resolve, reject) =>
        {
            let resolved = false;
            let stack = new Error().stack;
            const sub = this.protocolEvents.on(mapping as ControlPacketType, m =>
            {
                const response = m as MessageMap[typeof mappings[Type]]
                if ('packetId' in message)
                {
                    if (message.packetId == response['packetId'])
                    {
                        disconnectSub();
                        sub();
                        if ('reason' in response)
                        {
                            switch (response.reason)
                            {
                                case undefined:
                                case ReasonCodes.Success:
                                case ReasonCodes.GrantedQoS1:
                                case ReasonCodes.GrantedQoS2:
                                case ReasonCodes.DisconnectWithWillMessage:
                                case ReasonCodes.NoMatchingSubscriber:
                                case ReasonCodes.NoSubscriptionExisted:
                                case ReasonCodes.ContinueAuthentication:
                                case ReasonCodes.ReAuthenticate:
                                    if (!resolved)
                                    {
                                        resolved = true;
                                        resolve(m);
                                    }
                                    break;
                                case ReasonCodes.UnspecifiedError:
                                case ReasonCodes.MalformedPacket:
                                case ReasonCodes.ProtocolError:
                                case ReasonCodes.ImplementationSpecificError:
                                case ReasonCodes.UnsupportedProtocolVersion:
                                case ReasonCodes.ClientIdentifierNotValid:
                                case ReasonCodes.BadUserNameOrPassword:
                                case ReasonCodes.NotAuthorized:
                                case ReasonCodes.ServerUnavailable:
                                case ReasonCodes.ServerBusy:
                                case ReasonCodes.Banned:
                                case ReasonCodes.ServerShuttingDown:
                                case ReasonCodes.BadAuthenticationMethod:
                                case ReasonCodes.KeepAliveTimeout:
                                case ReasonCodes.SessionTakenOver:
                                case ReasonCodes.TopicFilterInvali:
                                case ReasonCodes.TopicNameInvalid:
                                case ReasonCodes.PacketIdentifierInUse:
                                case ReasonCodes.PacketIdentifierNotFound:
                                case ReasonCodes.ReceiveMaximumExceeded:
                                case ReasonCodes.TopicAliasInvalid:
                                case ReasonCodes.PacketTooLarge:
                                case ReasonCodes.MessageRateTooHigh:
                                case ReasonCodes.QuotaExceeded:
                                case ReasonCodes.PayloadFormatInvalid:
                                case ReasonCodes.RetainNotSupported:
                                case ReasonCodes.QoSNotSupported:
                                case ReasonCodes.UseAnotherServer:
                                case ReasonCodes.ServerMoved:
                                case ReasonCodes.sharedSubscriptionNotSupported:
                                case ReasonCodes.ConnectionRateExceeded:
                                case ReasonCodes.MaximumConnectTime:
                                case ReasonCodes.SubscriptionIdentifierNotSupported:
                                case ReasonCodes.wildcardSubscriptionNotSupported:
                                case ReasonCodes.AdministrativeAction:
                                    if (!resolved)
                                    {
                                        resolved = true;
                                        reject(m);
                                    }
                                    break;
                            }
                        }
                        else if (!resolved)
                        {
                            resolved = true;
                            resolve(m);
                        }
                    }
                }
                else if (!resolved)
                {
                    resolved = true;
                    disconnectSub();
                    sub();
                    resolve(m);
                }
            });
            const disconnectSub = this.protocolEvents.once(ControlPacketType.DISCONNECT, (m: disconnect.Message) =>
            {
                console.error(stack);
                if (!resolved && m.reason !== ReasonCodes.Success)
                {
                    resolved = true;
                    sub();
                    reject(new DisconnectError(m));
                }
            })

            console.time('mqtt-write')
            switch (message.type)
            {
                case ControlPacketType.SUBSCRIBE:
                    await this.write(parserWrite(subscribe.SubscribeParser, message as subscribe.Message, message, 0).toArray());
                    break;
                case ControlPacketType.UNSUBSCRIBE:
                    await this.write(parserWrite(unsubscribe.UnsubscribeParser, message as unsubscribe.Message, message, 0).toArray());
                    break;
                default:

                    await this.write(parserWrite(StandardMessages, message, message, 0).toArray());
                    break;
            }
            console.timeEnd('mqtt-write')

        });
    }

    public connect(opts?: { keepAlive?: number, sessionId?: number; password?: IsomorphicBuffer; userName?: string; will?: { QoS?: number; retain?: boolean; properties: Properties; topic: string; }; }): Promise<Message>
    {
        if (!opts)
            opts = {};
        const message: connect.Message = {
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

    public async disconnect(): Promise<void>
    {
        const message: disconnect.Message = {
            type: ControlPacketType.DISCONNECT,
            properties: []
        };
        clearInterval(this.pingInterval);
        await this.write(parserWrite(StandardMessages, message, message, 0).toArray())

        await new Promise<void>(resolve => this.protocolEvents.socket.end(resolve));
    }

    public async publish(topic: string, payload: IsomorphicBuffer | string, options?: { qos?: number; retain?: boolean; properties?: Properties; }): Promise<void | Message>
    {
        const qos = options?.qos || 0;
        console.log(`publishing to ${topic}`)
        const message: publish.Message = {
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
            return this.write(parserWrite(StandardMessages, message, message, 0).toArray());

        const ack = await this.dialog(message);
        if (ack.type == ControlPacketType.PUBACK)
        {
            switch (ack.reason)
            {
                case undefined:
                case ReasonCodes.Success:
                case ReasonCodes.NoMatchingSubscriber:
                    break;
                default:
                    throw new ErrorWithStatus(DisconnectError.ReasonToHttpStatus(ack.reason), `Publish failed with reason code: ${ReasonCodes[ack.reason]} (${ack.reason})`);
            }
        }
        return ack;
    }

    public async emit(topic: string, payload: IsomorphicBuffer | string, options?: { publishedTopic?: string, qos?: number; retain?: boolean; properties?: Properties; }): Promise<void>
    {
        if (!(payload instanceof IsomorphicBuffer))
        {
            switch (typeof payload)
            {
                case 'string':
                case 'undefined':
                    break;
                case 'number':
                case 'bigint':
                case 'boolean':
                    payload = String(payload);
                    break;
                case 'object':
                    payload = JSON.stringify(payload);
                    break;
                case 'symbol':
                case 'function':
                    throw new Error(`payload may not be of type ${typeof payload}`);
            }
        }
        await this.publish(topic, payload, options);
    }

    public subscribe(topics: string[], options?: Partial<subscribe.TopicSubscription> & { qos?: number, properties?: Properties }): Promise<void | Message>
    {
        const packetId = this.getNextPacketId();
        const message: subscribe.Message = {
            type: ControlPacketType.SUBSCRIBE,
            packetId,
            qos: options?.qos,
            properties: options?.properties ?? [],
            topics: topics.map(topic => ({
                topic,
                maxQoS: options?.maxQoS ?? 0,
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
        const message: unsubscribe.Message = {
            type: ControlPacketType.UNSUBSCRIBE,
            packetId,
            properties: options?.properties || [],
            topics
        };
        return this.dialog(message);
    }

    public ping(): Promise<MessageTypes>
    {
        const message: MessageTypes = {
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

    socket.on('error', err =>
    {
        if (err.cause !== config.abort.reason)
            console.error(err);
    })

    const client = new MqttClient(config?.['clientId'] as string ?? crypto.randomUUID(), protocolEvents);

    if (url.username || url.password || config.username || config.password)
        await client.connect({ userName: url.username || config.username as string, password: IsomorphicBuffer.from(url.password || config.password as string) });
    else
        await client.connect({});

    return client as AsyncEventBus;
});

asyncEventBuses.useProtocol('mqtts', async (url, config) =>
{
    const socket = new Socket({ ...config, signal: config.abort });
    const tlsSocket = new TLSSocket(socket, config as any);

    const defer = new Deferred<void>();
    const port = Number(url.port);
    socket.connect(!isNaN(port) && port ? port : 8883, url.hostname, defer.resolve.bind(defer));

    socket.on('error', err =>
    {
        if (err.cause !== config.abort.reason)
            console.error(err);
    })
    tlsSocket.on('error', err =>
    {
        if (err.cause !== config.abort.reason)
            console.error(err);
    })
    tlsSocket.on('error',
        (x) => defer.reject(x));
    socket.on('error',
        (x) => defer.reject(x));

    await defer;

    const protocolEvents = new ProtocolEvents(tlsSocket);

    const client = new MqttClient(config?.['clientId'] as string ?? crypto.randomUUID(), protocolEvents);

    if (url.username || url.password)
        await client.connect({ userName: url.username, password: IsomorphicBuffer.from(url.password) });
    else
        await client.connect({});

    return client as AsyncEventBus;
})

asyncEventBuses.useProtocol('mqtt+tls', async (url, config) =>
{
    return asyncEventBuses.process(new URL('mqtts:' + url.host + url.pathname + url.search + url.hash), config);
})

const templateCache: Record<string, UrlTemplate.UriTemplate> = {};

export function topicTemplate(topic: string): UrlTemplate.UriTemplate
{
    if (topic in templateCache)
        return templateCache[topic];

    const urlTemplate: UrlTemplate.UriTemplate = mqttTopicToURITemplate(topic);

    return templateCache[topic] = urlTemplate;
}

export function mqttTopicToURITemplate(topic: string): UrlTemplate.UriTemplate
{
    const segments = topic.split('/');
    let varCount = 0;

    const templateSegments = segments.map((segment) =>
    {
        switch (segment)
        {
            case '+':
            case '#':
                varCount++;
                return { ref: 'var' + varCount, operator: '/' as const, explode: segment == '#' };
            default:
                return segment;
        }
    });

    return templateSegments;
}
