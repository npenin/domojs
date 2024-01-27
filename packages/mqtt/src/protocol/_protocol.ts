import { uint8, uint16, parsers } from '@akala/protocol-parser';
import * as shared from './_shared.js'
import { Message as Connect } from './connect.js'
import { Message as ConnectAck } from './connack.js'
// import {Message as Disconnect} from './disconnect.js'
// import {Message as PingReq} from './pingreq.js'
// import {Message as PingResp} from './pingresp.js'
import { Message as PubAck } from './puback.js'
import { Message as PubComp } from './pubcomp.js'
import { Message as Publish } from './publish.js'
import { Message as PubRec } from './pubrec.js'
import { Message as PubRel } from './pubrel.js'
import { Message as SubAck } from './suback.js'
import { Message as Subscribe } from './subscribe.js'
import { Message as UnsubAck } from './unsuback.js'
import { Message as Unsubscribe } from './unsubscribe.js'


export type MessageTypes = Connect
    | ConnectAck
    // | Disconnect
    // | PingReq
    // | PingResp
    | PubAck
    | PubComp
    | Publish
    | PubRec
    | PubRel
    | SubAck
    | Subscribe
    | UnsubAck
    | Unsubscribe
    ;

// );
export const header = parsers.chooseProperty<Message<any>, 'type', 'header', object>('type', 'header', {} as any);

export const payload = parsers.chooseProperty<Message<any>, 'type', 'payload'>('type', 'payload', {} as any);

// export interface ConnectAck
// {
//     header: {
//         sessionPresent: boolean;
//         reasonCode: ReasonCodes;
//         properties: Properties;
//     }
//     payload: null
// }
// export interface Publish
// {
//     header: {
//         topic: string;
//         packetIdentifier: string;
//         properties: Properties;
//     }
//     payload: null
// }

export interface Message<T extends { header?: object, payload?: object }>
{
    type: shared.ControlPacketType;
    dup?: boolean;
    qos?: number;
    retain?: boolean;
    header?: T['header'];
    payload?: T['payload']
}

export const Messages = parsers.object<Message<any>>(
    parsers.property('type', parsers.uint4),
    parsers.property('dup', parsers.boolean()),
    parsers.property('qos', parsers.uint2),
    parsers.property('retain', parsers.boolean()),
    parsers.series<Message<any>>(header) as any,
);

