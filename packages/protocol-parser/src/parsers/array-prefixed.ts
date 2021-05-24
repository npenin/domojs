import { Cursor, Parser, ParserWithoutKnownLength, parserWrite } from "./type";

export default class PrefixedLengthArray<T> implements ParserWithoutKnownLength<T[]>
{
    constructor(private prefix: Parser<number>, private valueParser: Parser<T>)
    {
    }

    length: -1 = -1;
    read(buffer: Buffer, cursor: Cursor): T[]
    {
        if (cursor.subByteOffset > 0)
            throw new Error('Cross byte value are not supported');

        var length = this.prefix.read(buffer, cursor);
        var result: T[] = new Array<T>(length);
        for (let index = 0; index < length; index++)
            result[index] = this.valueParser.read(buffer, cursor);
        return result;
    }

    write(value: T[]): Buffer[]
    {
        var buffers: Buffer[] = [];
        buffers.push(...parserWrite(this.prefix, value.length));
        for (let index = 0; index < value.length; index++)
            buffers.push(...parserWrite(this.valueParser, value[index]));
        return buffers;
    }
}