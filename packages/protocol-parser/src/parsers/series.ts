import { AnyParser, Cursor, Parser, ParsersWithMessage, ParserWithMessageWithoutKnownLength, parserWrite } from "./type";

export default class Series<TMessage> implements ParserWithMessageWithoutKnownLength<TMessage, TMessage>
{
    private parsers: ParsersWithMessage<any, TMessage>[];
    constructor(...parsers: ParsersWithMessage<any, TMessage>[])
    {
        this.parsers = parsers;
        var length = 0;
        for (const parser of parsers)
        {
            if (parser.length == -1)
            {
                length = -1;
                break;
            }
            length += parser.length;
        }
        this.length = length as -1;
    }
    length: -1 = -1;
    read(buffer: Buffer, cursor: Cursor, message: TMessage): TMessage
    {
        for (const parser of this.parsers)
            parser.read(buffer, cursor, message);

        return message;
    }
    write(buffer: Buffer | TMessage, cursor: Cursor | TMessage, value?: TMessage, message?: TMessage)
    {

        if (Buffer.isBuffer(buffer) && cursor instanceof Cursor)
        {
            for (let index = 0; index < this.parsers.length; index++)
                parserWrite(this.parsers[index], buffer, cursor as Cursor, value, message);
            return;
        }
        value = buffer as TMessage;
        message = cursor as TMessage;
        if (this.length > -1)
        {
            buffer = Buffer.alloc(Math.ceil(length));
            this.write(buffer, new Cursor(), value, message);
            return [buffer];
        }

        var buffers: Buffer[] = [];

        for (let index = 0; index < this.parsers.length; index++)
        {
            buffers.push(...parserWrite(this.parsers[index], value, message || value));
        }

        return buffers;








        // if ()
        //     var buffers: Buffer[] = [];
        // for (let index = 0; index < this.parsers.length; index++)
        //     buffers.push(...parserWrite(this.parsers[index], value, message));
        // return buffers;
    }

}