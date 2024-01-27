import { CommandProcessor, Container, StructuredParameters, Metadata, Trigger } from '@akala/commands'
import { MiddlewarePromise } from '@akala/core';
import PubSubContainer from '@akala/pubsub';
import { Socket, type SocketConnectOpts } from 'net'
import { Message, Messages, header } from './protocol/_protocol.js';
import { Cursor } from '@akala/protocol-parser';
import { ControlPacketType } from './protocol/_shared.js';

export const trigger = new Trigger('mqtt', (container: PubSubContainer, options: SocketConnectOpts) =>
{
    const socket = new Socket();
    socket.connect(options);
    socket.on('data', async (data) =>
    {
        const message = Messages.read(data, new Cursor(), undefined);
        const cmd = container.resolve('mqtt-' + ControlPacketType[message.type].toLocaleLowerCase());
        if (cmd)
            await container.dispatch(cmd, message);

        let reply: Message<any>;
        switch (message.type)
        {
            case ControlPacketType.CONNECT:
                reply = { type: ControlPacketType.CONNACK };
                break;
            case ControlPacketType.CONNACK:
                break;
            case ControlPacketType.PUBLISH:
                reply = { type: ControlPacketType.PUBACK, };
                break;

            case ControlPacketType.PUBACK:
            case ControlPacketType.PUBREC:
            case ControlPacketType.PUBREL:
            case ControlPacketType.PUBCOMP:
            case ControlPacketType.SUBSCRIBE:
            case ControlPacketType.SUBACK:
            case ControlPacketType.UNSUBSCRIBE:
            case ControlPacketType.UNSUBACK:
            case ControlPacketType.PINGREQ:
            case ControlPacketType.PINGRESP:
            case ControlPacketType.DISCONNECT:
            case ControlPacketType.AUTH:
        }
        socket.write(Buffer.concat(Messages.write(reply, reply)))
    })
})