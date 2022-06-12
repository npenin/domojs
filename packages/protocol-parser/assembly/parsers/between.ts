import { ParserWithMessage } from ".";
import { IBuffer } from "../core";
import Series from "./series";
import { Cursor, ParserWithMessageWithoutKnownLength } from "./_common";

export default class Between<TMessage extends Map<string | number, any>> extends Series<TMessage> implements ParserWithMessageWithoutKnownLength<TMessage, TMessage>
{
    constructor(start: ParserWithMessage<any, TMessage>, parser: ParserWithMessageWithoutKnownLength<any, TMessage>, end: ParserWithMessage<any, TMessage>)
    {
        super(start, parser, end);
    }

    read(buffer: IBuffer, cursor: Cursor, message: TMessage): TMessage
    {
        const newCursor = new Cursor();
        this.parsers[0].read(buffer, cursor, message);
        this.parsers[1].read(buffer.slice(cursor.offset, buffer.length - this.parsers[2].length), newCursor, message);
        cursor.offset += newCursor.offset;
        this.parsers[2].read(buffer, cursor, message);

        return message;
    }
    write(buffer: IBuffer | TMessage, cursor: Cursor | Partial<TMessage>, value?: TMessage, message?: Partial<TMessage>)
    {
        return super.write(buffer, cursor, value, message);
    }

}