export * from './cast.js'
export * from './authority_keys.js'
export * from './log.js'

import { Cursor } from '@akala/protocol-parser'
import stream from 'stream'
import { castMessage } from './cast.js'

export class CastStream extends stream.Transform
{
    constructor()
    {
        super({ readableObjectMode: true, decodeStrings: false });

    }

    private previousBuffer: Buffer;

    _transform(chunk: Buffer, encoding, callback)
    {
        if (this.previousBuffer != null)
            chunk = Buffer.concat([this.previousBuffer, chunk]);
        var cursor = new Cursor();
        while (cursor.offset < chunk.length)
        {
            var msg = castMessage.read(chunk, cursor, {});
            if (msg == null)
            {
                this.previousBuffer = chunk.slice(cursor.offset);
                break;
            }
            callback(null, msg);
        }
    }
}

export default CastStream;