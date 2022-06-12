import { AnyParser, ParserWithMessageWithoutKnownLength } from ".";
import { IBuffer, multiPush } from "../core";
import { Cursor, Parsers, parserWrite } from "./_common";

export default class PrefixedLengthArray<T, TMessage> implements ParserWithMessageWithoutKnownLength<T[], TMessage>
{
    constructor(private prefix: Parsers<number>, private valueParser: AnyParser<T, TMessage>)
    {
    }

    length: -1 = -1;
    read(buffer: IBuffer, cursor: Cursor, message: TMessage): T[]
    {
        if (cursor.subByteOffset > 0)
            throw new Error('Cross byte value are not supported');

        var length = this.prefix.read(buffer, cursor);
        var result: T[] = new Array<T>(length);
        for (let index = 0; index < length; index++)
            result[index] = this.valueParser.read(buffer, cursor, message);
        return result;
    }

    write(value: T[], message: TMessage): IBuffer[]
    {
        var buffers: IBuffer[] = [];
        multiPush(buffers, parserWrite(this.prefix, value.length, message));
        for (let index = 0; index < value.length; index++)
            multiPush(buffers, parserWrite(this.valueParser, value[index], message));
        return buffers;
    }
}