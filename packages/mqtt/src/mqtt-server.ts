import { IsomorphicBuffer, EventEmitter, UrlTemplate } from '@akala/core';
import { MqttEvents, ProtocolEvents, mappings, DisconnectError } from './shared.js';
import { StandardMessages } from './protocol/_protocol.js';
import { ControlPacketType, Properties, ReasonCodes, Message, disconnect, connect, publish } from './protocol/index.js';
import { SubscribeParser } from './protocol/subscribe.js';
import { Server } from 'net';
import './protocol/index.js'
import { parserWrite } from '@akala/protocol-parser';
import { topicTemplate } from './mqtt-client.shared.js';
import { NetSocketAdapter } from '@akala/commands';

class MqttClientProxy
{
    isSubscribed(topic: string): boolean
    {
        return this.subscriptions.some(template => UrlTemplate.match(topic, template));
    }

    subscriptions: UrlTemplate.UriTemplate[];

    constructor(private protocolEvents: ProtocolEvents)
    {
    }

    public acknowledge(message: Message)
    {
        return this.protocolEvents.socket.send(parserWrite(StandardMessages, {
            type: mappings[message.type],
            dup: false,

        }))
    }

    public subscribe(topic: string)
    {
        this.subscriptions.push(topicTemplate(topic));
    }

    public publish(message: publish.Message)
    {
        return this.protocolEvents.socket.send(parserWrite(StandardMessages, message))
    }
}

export class MqttServer extends EventEmitter<MqttEvents>
{
    private packetId = 1;
    private clients: MqttClientProxy[];
    private retain: Message[];

    constructor(server: Server)
    {
        super();
        server.on('connection', socket =>
        {
            const protocolEvents = new ProtocolEvents(new NetSocketAdapter(socket));
            protocolEvents.on(ControlPacketType.PUBLISH, m =>
            {
                if (m.retain)
                    this.retain.push(m);

                Promise.all(this.clients.filter(c => c.isSubscribed(m.topic)).map(c => c.publish(m)));
            })
            const client = new MqttClientProxy(protocolEvents);

            this.clients.push(client);
            socket.on('close', () =>
            {
                this.clients.splice(this.clients.indexOf(client), 1);
            });
        })
    }

    private dialog(protocolEvents: ProtocolEvents, message: Message): Promise<Message>
    {
        const mapping = mappings[message.type];
        if (!mapping)
            return Promise.reject(new Error('there is no such mapping for ' + JSON.stringify(message)));
        return new Promise(async (resolve, reject) =>
        {
            const sub = protocolEvents.on(mapping, (m: Message) =>
            {
                if ('packetId' in message)
                {
                    if (message.packetId == m['packetId'])
                    {
                        disconnectSub();
                        sub();
                        resolve(m);
                    }
                }
                else
                {
                    disconnectSub();
                    sub();
                    resolve(m);
                }
            });
            const disconnectSub = protocolEvents.once(ControlPacketType.DISCONNECT, (m: disconnect.Message) =>
            {
                if (m.reason !== ReasonCodes.Success)
                {
                    sub();
                    reject(new DisconnectError(m));
                }
            })

            console.time('mqtt-write')
            if (message.type === ControlPacketType.SUBSCRIBE)
                await protocolEvents.socket.send(parserWrite(SubscribeParser, message, message, 0));
            else
                await protocolEvents.socket.send(parserWrite(StandardMessages, message, message, 0));
            console.timeEnd('mqtt-write')

        });
    }

    public async disconnect(protocolEvents: ProtocolEvents): Promise<void>
    {
        const message: disconnect.Message = {
            type: ControlPacketType.DISCONNECT,
            properties: []
        };
        await protocolEvents.socket.send(parserWrite(StandardMessages, message, message, 0));

        await protocolEvents.socket.close();
    }

    public ping(protocolEvents: ProtocolEvents): Promise<Message>
    {
        const message: Message = {
            type: ControlPacketType.PINGREQ
        };
        return this.dialog(protocolEvents, message);
    }
}