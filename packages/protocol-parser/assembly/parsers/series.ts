import { Buffer, IBuffer, multiPush } from "../core";
import { Cursor, ParsersWithMessage, ParserWithMessageWithoutKnownLength, parserWrite } from "./_common";

export default class Series<TMessage extends Map<string | number, any>> implements ParserWithMessageWithoutKnownLength<TMessage, Partial<TMessage>>
{
    protected parsers: ParsersWithMessage<any, TMessage>[];
    protected lengths: i32[] = [];
    constructor(...parsers: ParsersWithMessage<any, TMessage>[])
    {
        this.parsers = parsers;
        for (const parser in parsers)
            this.lengths.push(parsers[parser].length)
        this.length = this.lengths.reduce((previous, current) =>
        {
            if (previous == -1)
                return -1;
            if (current == -1)
                return -1;
            return current + previous;
        }, 0 as i32) as -1;
    }
    length: -1;
    read(buffer: IBuffer, cursor: Cursor, message: TMessage): TMessage
    {
        for (const parser in this.parsers)
        {
            this.parsers[parser].read(buffer, cursor, message);
        }

        return message;
    }
    write(buffer: IBuffer | TMessage, cursor: Cursor | Partial<TMessage>, value?: TMessage, message?: Partial<TMessage>)
    {

        if (Buffer.isBuffer(buffer) && cursor instanceof Cursor)
        {
            for (let index = 0; index < this.parsers.length; index++)
                parserWrite(this.parsers[index], buffer, cursor as Cursor, value, message);
            return [];
        }
        value = buffer as TMessage;
        message = cursor as TMessage;
        if (this.length > -1)
        {
            buffer = Buffer.alloc(Math.ceil(this.length));
            this.write(buffer, new Cursor(), value, message);
            return [buffer];
        }

        var buffers: IBuffer[] = [];

        for (let index = 0; index < this.parsers.length; index++)
        {
            multiPush(buffers, parserWrite(this.parsers[index], value, message || value));
        }

        return buffers;








        // if ()
        //     var buffers: Buffer[] = [];
        // for (let index = 0; index < this.parsers.length; index++)
        //     buffers.push(...parserWrite(this.parsers[index], value, message));
        // return buffers;
    }

}