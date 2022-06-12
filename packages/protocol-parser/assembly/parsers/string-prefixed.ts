import { Buffer, BufferEncoding, IBuffer } from "../core";
import { Cursor, Parsers, ParserWithoutKnownLength, parserWrite } from "./_common";

export default class PrefixedString implements ParserWithoutKnownLength<string>
{
    constructor(private prefix: Parsers<number>, private encoding: BufferEncoding = 'ascii')
    {

    }
    length: -1 = -1;
    read(buffer: IBuffer, cursor: Cursor): string
    {
        if (cursor.subByteOffset > 0)
            throw new Error('Cross byte value are not supported');

        var length = this.prefix.read(buffer, cursor);

        var value = buffer.toString(this.encoding, cursor.offset, cursor.offset + length);
        cursor.offset += length;
        return value;
    }
    write(value: string): IBuffer[]
    {
        var buffers: IBuffer[] = [];
        buffers.push(...parserWrite(this.prefix, value.length));
        buffers.push(Buffer.from(value, this.encoding));
        return buffers
    }

}