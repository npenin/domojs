import net from 'net'
import { header, Message, Messages } from './protocol/_protocol.js'
import { Message as connect } from './protocol/connect.js';
import { Message as connack } from './protocol/connack.js';
import { Cursor } from '@akala/protocol-parser';
import { EventEmitter } from 'events';
import { ControlPacketType, Properties } from './protocol/_shared.js';
import { IsomorphicBuffer } from '@akala/core';

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
                var msg = Messages.read(IsomorphicBuffer.fromBuffer(data), c, {});
                this.emit(ControlPacketType[msg.type], msg);
            }
        })
    }

    private dialog(message: Message<any>): Promise<Message<any>>
    {
        const mapping = mappings.find(map => map[0] == message.type);
        if (!mapping)
            return Promise.reject(new Error('there is no such mapping for ' + JSON.stringify(message)));
        return new Promise((resolve, reject) =>
        {
            this.once(ControlPacketType[mapping[1]], (m: Message<any>) =>
            {
                resolve(m);
            });
            this.socket.write(IsomorphicBuffer.concat(header.write(message, message)).toArray());

        })
    }

    public connect(opts?: { sessionId?: number, password?: Buffer, userName?: string, will?: { QoS?: number, retain?: boolean, properties: Properties, topic: string, } })
    {
        if (!opts)
            opts = {};
        // const message: Message<connect> = {
        //     type: ControlPacketType.CONNECT,
        //     header: {
        //         protocol: 'MQTT',
        //         version: 5,
        //         cleanStart: !!opts.sessionId,
        //         hasPassword: !!opts.password,
        //         hasUserName: !!opts.userName,
        //         hasWill: !!opts.will,
        //         properties: [],
        //     },
        //     payload: {
        //         password: opts.password,
        //         userName: opts.userName,
        //         clientId: this.clientId
        //     }
        // };

        // this.once(ControlPacketType[ControlPacketType.CONNACK], () =>
        // {

        // })

    }
}