import { Message, MessageTypes, StandardMessages } from './protocol/index.js'
import { Cursor } from '@akala/protocol-parser';
import { ControlPacketType, Properties, ReasonCodes, auth, connack, connect, disconnect, pingreq, pingresp, puback, pubcomp, publish, pubrec, pubrel, suback, subscribe, unsuback, unsubscribe } from './protocol/index.js';
import { IsomorphicBuffer, EventEmitter, IEvent, EventKeys, ErrorWithStatus, HttpStatusCode } from '@akala/core';
import { Socket } from 'net';

import { TopicSubscription } from './protocol/subscribe.js';

/// PUT in this file any API you would like to expose to your package consumer

export const mappings = {
    [ControlPacketType.CONNECT]: ControlPacketType.CONNACK as const,
    [ControlPacketType.PINGREQ]: ControlPacketType.PINGRESP as const,
    [ControlPacketType.PUBLISH]: ControlPacketType.PUBACK as const,
    [ControlPacketType.SUBSCRIBE]: ControlPacketType.SUBACK as const,
    [ControlPacketType.UNSUBSCRIBE]: ControlPacketType.UNSUBACK as const,
}

export type MessageMap = {
    [ControlPacketType.CONNECT]: connect.Message
    [ControlPacketType.CONNACK]: connack.Message
    [ControlPacketType.PUBLISH]: publish.Message
    [ControlPacketType.PUBACK]: puback.Message
    [ControlPacketType.PUBREC]: pubrec.Message
    [ControlPacketType.PUBREL]: pubrel.Message
    [ControlPacketType.PUBCOMP]: pubcomp.Message
    [ControlPacketType.SUBSCRIBE]: subscribe.Message
    [ControlPacketType.SUBACK]: suback.Message
    [ControlPacketType.UNSUBSCRIBE]: unsubscribe.Message
    [ControlPacketType.UNSUBACK]: unsuback.Message
    [ControlPacketType.PINGREQ]: pingreq.Message
    [ControlPacketType.PINGRESP]: pingresp.Message
    [ControlPacketType.DISCONNECT]: disconnect.Message
    [ControlPacketType.AUTH]: auth.Message
}

export type ProtocolEventsMap =
    {
        [key in keyof MessageMap]: IEvent<[MessageMap[key]], void, {
            qos?: number;
            retain?: boolean;
            properties?: Properties;
            once?: boolean
        }>
    }

export class ProtocolEvents extends EventEmitter<ProtocolEventsMap>
{
    constructor(public readonly socket: Socket)
    {
        super(Number.MAX_SAFE_INTEGER);
        socket.on('data', (data) =>
        {
            const c = new Cursor();
            while (c.offset < data.length)
            {
                console.time('mqtt-read')
                var msg = StandardMessages.read(IsomorphicBuffer.fromBuffer(data), c, {}) as MessageMap[keyof MessageMap];
                console.timeEnd('mqtt-read')
                this.emit(msg.type, msg as any);
            }
        });
        // this.setMaxListeners(Number.MAX_SAFE_INTEGER);
        socket.on('error', err => console.error(err))
        socket.on('close', () =>
            this.emit(ControlPacketType.DISCONNECT, {
                type: ControlPacketType.DISCONNECT,
                properties: [],
                dup: false,
                qos: 0,
                reason: ReasonCodes.ServerUnavailable,
                retain: false
            }));
    }


}

export class DisconnectError extends ErrorWithStatus
{
    public static ReasonToHttpStatus(reason: ReasonCodes): HttpStatusCode
    {
        switch (reason)
        {
            case ReasonCodes.Success:
                return HttpStatusCode.OK;
            case ReasonCodes.GrantedQoS1:
            case ReasonCodes.GrantedQoS2:
                return HttpStatusCode.Accepted
            case ReasonCodes.DisconnectWithWillMessage:
                return HttpStatusCode.Gone;
            case ReasonCodes.NoMatchingSubscriber:
            case ReasonCodes.NoSubscriptionExisted:
                return HttpStatusCode.NotFound;
            case ReasonCodes.ContinueAuthentication:
                return HttpStatusCode.Continue;
            case ReasonCodes.ReAuthenticate:
                return HttpStatusCode.Unauthorized;
            case ReasonCodes.UnspecifiedError:
                return HttpStatusCode.InternalServerError;
            case ReasonCodes.MalformedPacket:
            case ReasonCodes.ProtocolError:
            case ReasonCodes.ImplementationSpecificError:
            case ReasonCodes.UnsupportedProtocolVersion:
            case ReasonCodes.ClientIdentifierNotValid:
                return HttpStatusCode.BadRequest;
            case ReasonCodes.BadUserNameOrPassword:
            case ReasonCodes.NotAuthorized:
                return HttpStatusCode.Unauthorized;
            case ReasonCodes.ServerUnavailable:
                return HttpStatusCode.ServiceUnavailable;
            case ReasonCodes.ServerBusy:
                return HttpStatusCode.ServiceUnavailable;
            case ReasonCodes.Banned:
                return HttpStatusCode.Forbidden;
            case ReasonCodes.ServerShuttingDown:
                return HttpStatusCode.ServiceUnavailable;
            case ReasonCodes.BadAuthenticationMethod:
                return HttpStatusCode.Unauthorized;
            case ReasonCodes.KeepAliveTimeout:
                return HttpStatusCode.RequestTimeout;
            case ReasonCodes.SessionTakenOver:
                return HttpStatusCode.Conflict;
            case ReasonCodes.TopicFilterInvali:
            case ReasonCodes.TopicNameInvalid:
                return HttpStatusCode.BadRequest;
            case ReasonCodes.PacketIdentifierInUse:
                return HttpStatusCode.Conflict;
            case ReasonCodes.PacketIdentifierNotFound:
                return HttpStatusCode.NotFound;
            case ReasonCodes.ReceiveMaximumExceeded:
            case ReasonCodes.PacketTooLarge:
            case ReasonCodes.MessageRateTooHigh:
            case ReasonCodes.QuotaExceeded:
                return HttpStatusCode.PayloadTooLarge;
            case ReasonCodes.TopicAliasInvalid:
                return HttpStatusCode.BadRequest;
            case ReasonCodes.AdministrativeAction:
                return HttpStatusCode.Forbidden;
            case ReasonCodes.PayloadFormatInvalid:
                return HttpStatusCode.UnsupportedMediaType;
            case ReasonCodes.RetainNotSupported:
            case ReasonCodes.QoSNotSupported:
            case ReasonCodes.sharedSubscriptionNotSupported:
            case ReasonCodes.SubscriptionIdentifierNotSupported:
            case ReasonCodes.wildcardSubscriptionNotSupported:
                return HttpStatusCode.NotImplemented;
            case ReasonCodes.UseAnotherServer:
            case ReasonCodes.ServerMoved:
                return HttpStatusCode.TemporaryRedirect;
            case ReasonCodes.ConnectionRateExceeded:
            case ReasonCodes.MaximumConnectTime:
                return HttpStatusCode.TooManyRequests;
            default:
                return HttpStatusCode.InternalServerError;
        }
    }

    public readonly disconnect: disconnect.Message;
    constructor(message: disconnect.Message)
    {
        super(DisconnectError.ReasonToHttpStatus(message.reason), 'Disconnected: ' + (ReasonCodes[message.reason] ?? 'Unknown reason'));
        this.disconnect = message;
    }
}

export type MqttEvent = IEvent<[data: IsomorphicBuffer | string,
    mqttOptions?: { publishedTopic?: string, qos?: number, retain?: boolean, properties?: Properties }],
    void | Promise<void>,
    Partial<TopicSubscription> & { once?: boolean, properties?: Properties }>;

export type MqttEvents = Record<string, MqttEvent>;

