import { IsomorphicBuffer, EventEmitter } from '@akala/core';
import { MqttEvents, ProtocolEvents, mappings, DisconnectError } from './shared.js';
import { StandardMessages } from './protocol/_protocol.js';
import { ControlPacketType, Properties, ReasonCodes, Message, disconnect, connect } from './protocol/index.js';
import { SubscribeParser } from './protocol/subscribe.js';
import { Server } from 'net';
import './protocol/index.js'
import { parserWrite } from '@akala/protocol-parser';

class MqttClientProxy
{
    constructor(private protocolEvents: ProtocolEvents)
    {
    }

    public acknowledge(message: Message)
    {
        this.protocolEvents.socket.write(parserWrite(StandardMessages, {
            type: mappings[message.type],
            dup: false,

        }).toArray())
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
            const protocolEvents = new ProtocolEvents(socket);
            protocolEvents.on(ControlPacketType.PUBLISH, m =>
            {
                if (m.retain)
                    this.retain.push(m);
            })
            const client = new MqttClientProxy(protocolEvents);

            this.clients.push(client);
            socket.on('close', () =>
            {
                this.clients.splice(this.clients.indexOf(client), 1);
            });
        })
    }

    private getNextPacketId()
    {
        return this.packetId++;
    }

    private dialog(protocolEvents: ProtocolEvents, message: Message): Promise<Message>
    {
        const mapping = mappings[message.type];
        if (!mapping)
            return Promise.reject(new Error('there is no such mapping for ' + JSON.stringify(message)));
        return new Promise((resolve, reject) =>
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
                protocolEvents.socket.write(parserWrite(SubscribeParser, message, message, 0).toArray(), err =>
                {
                    if (err)
                        reject(err)
                });
            else
                protocolEvents.socket.write(parserWrite(StandardMessages, message, message, 0).toArray(), err =>
                {
                    if (err)
                        reject(err);
                });
            console.timeEnd('mqtt-write')

        });
    }

    public async disconnect(protocolEvents: ProtocolEvents): Promise<void>
    {
        const message: disconnect.Message = {
            type: ControlPacketType.DISCONNECT,
            properties: []
        };
        await new Promise<void>((resolve, reject) =>
            protocolEvents.socket.write(parserWrite(StandardMessages, message, message, 0).toArray(), err => err ? reject(err) : resolve()));

        await new Promise<void>(resolve => protocolEvents.socket.end(resolve));
    }

    public ping(protocolEvents: ProtocolEvents): Promise<Message>
    {
        const message: Message = {
            type: ControlPacketType.PINGREQ
        };
        return this.dialog(protocolEvents, message);
    }
}