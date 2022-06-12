import { AnyParser, ParserWithMessage } from ".";
import { Buffer, IBuffer } from "../core";
import { Cursor, parserWrite } from "./_common";

export default class FixedLengthArray<T, TMessage> implements ParserWithMessage<T[], TMessage>
{
    constructor(public readonly length: number, private valueParser: AnyParser<T, TMessage>)
    {
    }

    read(buffer: IBuffer, cursor: Cursor, message: TMessage): T[]
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

    write(value: T[], message: TMessage): IBuffer[]
    write(buffer: IBuffer, cursor: Cursor, value: T[], message: TMessage): void
    write(buffer: IBuffer | T[], cursor: Cursor | TMessage, value?: T[], message?: TMessage): void | IBuffer[]
    {
        if (!Buffer.isBuffer(buffer))
        {
            var buffers: IBuffer[] = []
            for (let index = 0; index < buffer.length; index++)
                buffers.push(...parserWrite(this.valueParser, buffer[index], cursor));
            return buffers;
        }
        else
            for (let index = 0; index < this.length; index++)
                parserWrite(this.valueParser, buffer, cursor, value && value[index], message);
    }
}