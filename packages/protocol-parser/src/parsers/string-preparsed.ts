import { Cursor, Parser, ParserWithMessageWithoutKnownLength, ParserWithoutKnownLength, parserWrite } from "./_common";

type KeyReturningNumbers<T, TKey extends keyof T = keyof T> = T[TKey] extends number ? TKey : never;

export default class PreparsedString<T, TKey extends keyof T> implements ParserWithMessageWithoutKnownLength<string, T>
{
    constructor(private lengthProperty: TKey, private encoding: BufferEncoding = 'ascii')
    {

    }
    length: -1 = -1;
    read(buffer: Buffer, cursor: Cursor, message: T): string
    {
        if (cursor.subByteOffset > 0)
            throw new Error('Cross byte value are not supported');

        var value = buffer.toString(this.encoding, cursor.offset, cursor.offset + Number(message[this.lengthProperty]));
        cursor.offset += length;
        return value;
    }
    write(value: string, message: T): Buffer[]
    {
        var buffers: Buffer[] = [];
        buffers.push(Buffer.from(value, this.encoding).slice(0, Number(message[this.lengthProperty])));
        return buffers
    }

}