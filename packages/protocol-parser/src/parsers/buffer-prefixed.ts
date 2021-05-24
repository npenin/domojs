import { Cursor, hasUknownLength, Parser, Parsers, ParserWithoutKnownLength, parserWrite } from "./type";

export default class PrefixedBuffer implements ParserWithoutKnownLength<Buffer>
{
    constructor(private prefix: Parsers<number>)
    {

    }
    length: -1 = -1;
    read(buffer: Buffer, cursor: Cursor): Buffer
    {
        if (cursor.subByteOffset > 0)
            throw new Error('Cross byte value are not supported');

        var length = this.prefix.read(buffer, cursor);
        return buffer.slice(cursor.offset, cursor.offset + length);
    }

    write(value: Buffer): Buffer[]
    {
        var buffers: Buffer[] = [];
        buffers.push(...parserWrite(this.prefix, value.length));
        buffers.push(value);
        return buffers;
    }
}