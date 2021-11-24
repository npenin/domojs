import net from 'net'
import { Protocol, ControlPacketType, Message, Properties, Messages } from './protocol/_protocol'
import connect from './protocol/connect';
import connack from './protocol/connack';
import { Cursor } from '@domojs/protocol-parser';
import { EventEmitter } from 'events';

/// PUT in this file any API you would like to expose to your package consumer

export const mappings = [
    [ControlPacketType.CONNECT, ControlPacketType.CONNACK],
    [ControlPacketType.PINGREQ, ControlPacketType.PINGRESP],
    [ControlPacketType.PUBLISH, ControlPacketType.PUBACK],
    [ControlPacketType.SUBSCRIBE, ControlPacketType.SUBACK],
    [ControlPacketType.UNSUBSCRIBE, ControlPacketType.UNSUBACK],
]

export class Client extends EventEmitter
{
    constructor(private clientId: string, private socket: net.Socket)
    {
        super();
        this.socket.on('data', (data) =>
        {
            const c = new Cursor();
            while (c.offset < data.length)
            {
                var msg = Messages.read(data, c, {});
                this.emit(ControlPacketType[msg.type], msg);
            }
        })
    }

    private dialog(message: Message): Promise<Message>
    {
        const mapping = mappings.find(map => map[0] == message.type);
        if (!mapping)
            return Promise.reject(new Error('there is no such mapping for ' + JSON.stringify(message)));
        return new Promise((resolve, reject) =>
        {
            this.once(ControlPacketType[mapping[1]], (m: Message) =>
            {
                resolve(m);
            });
            this.socket.write(Buffer.concat(Protocol.write(message, message)));

        })
    }

    public connect(opts?: { sessionId?: number, password?: Buffer, userName?: string, will?: { QoS?: number, retain?: boolean, properties: Properties, topic: string, } })
    {
        if (!opts)
            opts = {};
        const message: connect = {
            type: ControlPacketType.CONNECT,
            protocol: 'MQTT',
            version: 5,
            cleanStart: !!opts.sessionId,
            hasPassword: !!opts.password,
            hasUserName: !!opts.userName,
            password: opts.password,
            userName: opts.userName,
            hasWill: !!opts.will,
            properties: [],
            clientId: this.clientId
        };

        this.once(ControlPacketType[ControlPacketType.CONNACK], () =>
        {

        })

    }
}