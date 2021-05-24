import { Cursor, Parser, ParserWithoutKnownLength, parserWrite } from "./type";

export default class FixedLengthArray<T> implements Parser<T[]>
{
    constructor(public readonly length: number, private valueParser: Parser<T>)
    {
    }

    read(buffer: Buffer, cursor: Cursor): T[]
    {
        if (cursor.subByteOffset > 0)
            throw new Error('Cross byte value are not supported');

        var result: T[] = new Array<T>(this.length);
        for (let index = 0; index < this.length; index++)
            result[index] = this.valueParser.read(buffer, cursor);
        return result;
    }

    write(buffer: Buffer, cursor: Cursor, value: T[]): void
    {
        for (let index = 0; index < this.length; index++)
            parserWrite(this.valueParser, buffer, cursor, value[index]);
    }
}