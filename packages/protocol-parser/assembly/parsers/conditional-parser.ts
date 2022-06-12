import { AnyParser, ParserWithMessage } from ".";
import { IBuffer } from "../core";
import { Cursor, parserWrite } from "./_common";

export class Conditional<T, TMessage> implements ParserWithMessage<T | undefined, TMessage>
{
    constructor(private condition: (message: TMessage | undefined) => boolean, private parser: AnyParser<T, TMessage>)
    {
        this.length = parser.length;
    }
    read(buffer: IBuffer, cursor: Cursor, partial: TMessage): T | undefined
    {
        if (this.condition(partial))
            return this.parser.read(buffer, cursor, partial);
        return undefined;
    }
    write(value: T, message: TMessage): IBuffer[]
    write(buffer: IBuffer, cursor: Cursor, value: T, message: TMessage): void
    write(buffer: IBuffer | T, cursor: Cursor | TMessage, value?: T, message?: TMessage): void | IBuffer[]
    {
        if (this.condition(message))
            return parserWrite(this.parser, buffer, cursor, value, message);
    }

    length: number;
}