import { Cursor, Parser } from "./type";

export default class FixedString implements Parser<string>
{
    constructor(public readonly length: number, private encoding: BufferEncoding = 'ascii')
    {
    }
    read(buffer: Buffer, cursor: Cursor): string
    {
        if (cursor.subByteOffset > 0)
            throw new Error('Cross byte value are not supported');

        return buffer.toString(this.encoding, cursor.offset, cursor.offset + this.length);
    }
    write(buffer: Buffer, cursor: Cursor, value?: string)
    {
        if (value.length != this.length)
            throw new Error(`string length (${value.length}) is not matching with expected length (${this.length})`)

        if (cursor.subByteOffset > 0)
            throw new Error('Cross byte value are not supported');

        cursor.offset += buffer.write(value, cursor.offset, this.length, this.encoding);
    }
}