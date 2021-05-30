import { AnyParser, ParserWithMessage } from ".";
import { Cursor, parserWrite } from "./_common";

export class ZeroOrOne<T, TMessage> implements ParserWithMessage<T, TMessage>
{
    constructor(private parser: AnyParser<T, TMessage>)
    {
        this.length = parser.length;
    }
    read(buffer: Buffer, cursor: Cursor, partial: TMessage): T
    {
        if (buffer.length > cursor.offset)
            return this.parser.read(buffer, cursor, partial);
        return undefined;
    }
    write(buffer: Buffer, cursor: Cursor, value: T, message: TMessage): void
    {
        if (typeof (value) === 'undefined')
            return parserWrite(this.parser, buffer, cursor, value, message);
    }

    length: number;
}