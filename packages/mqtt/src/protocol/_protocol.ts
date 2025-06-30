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
import { IsomorphicBuffer } from '@akala/core';


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
export const header = parsers.choose<Message, Message['type'], Message>('type', {} as any);


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

export interface Message
{
    type: shared.ControlPacketType;
    dup?: boolean;
    qos?: number;
    retain?: boolean;
}

export const MessageParser = parsers.series<Message>(
    parsers.property('retain', parsers.boolean()),
    parsers.property('qos', parsers.uint2),
    parsers.property('dup', parsers.boolean()),
    parsers.property('type', parsers.uint4),
);

if (MessageParser instanceof parsers.Cache)
{
    for (const retain of [true, false])
        for (const qos of [0, 1, 2])
            for (const dup of [true, false])
                for (const type of Object.values(shared.ControlPacketType).filter(v => typeof v == 'number'))
                    MessageParser.cache.set([retain || '', qos || '', dup || '', type || ''].join('#'), new IsomorphicBuffer([type << 4 | (dup ? 0b1000 : 0b0000) | (qos << 1) | (retain ? 0b1 : 0b0)]))
}

export const StandardMessages = parsers.object<Message>(
    MessageParser,
    parsers.sub(parsers.vuint, header)
);
