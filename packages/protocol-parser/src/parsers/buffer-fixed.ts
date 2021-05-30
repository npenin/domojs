import { Cursor, hasUknownLength, Parser, Parsers, ParserWithoutKnownLength, parserWrite } from "./_common";

export default class FixedBuffer implements Parser<Buffer>
{
    constructor(public readonly length: number)
    {

    }

    read(buffer: Buffer, cursor: Cursor): Buffer
    {
        if (cursor.subByteOffset > 0)
            throw new Error('Cross byte value are not supported');

        return buffer.slice(cursor.offset, cursor.offset + this.length);
    }

    write(buffer: Buffer, cursor: Cursor, value: Buffer)
    {
        value.copy(buffer, cursor.offset, 0, this.length);
    }
}