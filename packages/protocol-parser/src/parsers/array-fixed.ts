import { AnyParser, ParserWithMessage } from ".";
import { Cursor, Parser, ParserWithoutKnownLength, parserWrite } from "./_common";

export default class FixedLengthArray<T, TMessage> implements ParserWithMessage<T[], TMessage>
{
    constructor(public readonly length: number, private valueParser: AnyParser<T, TMessage>)
    {
    }

    read(buffer: Buffer, cursor: Cursor, message: TMessage): T[]
    {
        if (cursor.subByteOffset > 0)
            throw new Error('Cross byte value are not supported');

        var result: T[];
        if (this.length == -1)
        {
            result = [];
            while (cursor.offset < buffer.length)
                result.push(this.valueParser.read(buffer, cursor, message));
        }
        else
        {
            result = new Array<T>(this.length);
            for (let index = 0; index < this.length; index++)
                result[index] = this.valueParser.read(buffer, cursor, message);
        }
        return result;
    }

    write(buffer: Buffer, cursor: Cursor, value: T[], message: TMessage): void
    {
        if (this.length == -1)
            for (let index = 0; index < value.length; index++)
                parserWrite(this.valueParser, buffer, cursor, value[index], message);
        else
            for (let index = 0; index < this.length; index++)
                parserWrite(this.valueParser, buffer, cursor, value[index], message);
    }
}