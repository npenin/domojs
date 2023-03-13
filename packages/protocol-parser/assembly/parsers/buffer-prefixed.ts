import { IBuffer, multiPush } from "../core";
import { AnyParser, Cursor, Parsers, ParserWithoutKnownLength, parserWrite } from "./_common";

export default class PrefixedBuffer implements ParserWithoutKnownLength<IBuffer>
{
    constructor(private prefix: AnyParser<number, unknown>)
    {

    }
    length: -1 = -1;
    read(buffer: IBuffer, cursor: Cursor): IBuffer
    {
        if (cursor.subByteOffset > 0)
            throw new Error('Cross byte value are not supported');

        var length = this.prefix.read(buffer, cursor, null);
        return buffer.subarray(cursor.offset, cursor.offset + length);
    }

    write(value: IBuffer): IBuffer[]
    {
        var buffers: IBuffer[] = [];
        multiPush(buffers, parserWrite(this.prefix, value.length));
        buffers.push(value);
        return buffers;
    }
}