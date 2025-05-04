export * from './cast.js'
export * from './authority_keys.js'
export * from './log.js'

import { Cursor } from '@akala/protocol-parser'
import stream from 'stream'
import { castMessage } from './cast.js'
import { IsomorphicBuffer } from '@akala/core'

export class CastStream extends stream.Transform
{
    constructor()
    {
        super({ readableObjectMode: true, decodeStrings: false });

    }

    private previousBuffer: IsomorphicBuffer;

    _transform(chunk: Buffer, encoding, callback)
    {
        let isoChunk: IsomorphicBuffer = IsomorphicBuffer.fromBuffer(chunk);
        if (this.previousBuffer != null)
            isoChunk = IsomorphicBuffer.concat([this.previousBuffer, isoChunk]);
        var cursor = new Cursor();
        while (cursor.offset < isoChunk.length)
        {
            var msg = castMessage.read(isoChunk, cursor, {});
            if (msg == null)
            {
                this.previousBuffer = isoChunk.subarray(cursor.offset);
                break;
            }
            callback(null, msg);
        }
    }
}

export default CastStream;