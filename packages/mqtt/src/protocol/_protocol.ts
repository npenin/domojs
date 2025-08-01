import { parsers } from '@akala/protocol-parser';
import * as shared from './_shared.js'
import { IsomorphicBuffer } from '@akala/core';
import { MessageMap } from '../shared.js';


export type MessageTypes = MessageMap[keyof MessageMap];

// );
export const header = parsers.choose<shared.Message, shared.Message['type'], shared.Message>('type', {} as any);


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

export const MessageParser = parsers.series<shared.Message>(
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

export const StandardMessages = parsers.object<shared.Message>(
    MessageParser,
    parsers.sub(parsers.unsignedLEB128, header)
);
