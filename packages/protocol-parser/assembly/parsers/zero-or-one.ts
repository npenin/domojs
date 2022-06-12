import { AnyParser, ParserWithMessage } from ".";
import { Buffer, IBuffer, int32 } from "../core";
import { Cursor, parserWrite } from "./_common";

export class ZeroOrOne<T, TMessage> implements ParserWithMessage<T | undefined, TMessage>
{
    constructor(private parser: AnyParser<T, TMessage>)
    {
        this.length = parser.length;
    }
    read(buffer: IBuffer, cursor: Cursor, partial: TMessage): T | undefined
    {
        if (buffer.length > cursor.offset)
            return this.parser.read(buffer, cursor, partial);
        return undefined;
    }
    write(value: T, message: TMessage): IBuffer[]
    write(buffer: IBuffer, cursor: Cursor, value: T, message: TMessage): void
    write(buffer: IBuffer | T, cursor: Cursor | TMessage, value?: T, message?: TMessage): void | IBuffer[]
    {
        if (!Buffer.isBuffer(buffer))
            value = buffer as T;
        if (typeof (value) === 'undefined')
            return;
        return parserWrite(this.parser, buffer, cursor, value, message);
    }

    length: int32;
}