import { Buffer, IBuffer } from "../core";
import { Cursor, Parser } from "./_common";

export default class FixedBuffer implements Parser<IBuffer>
{
    constructor(public readonly length: number)
    {

    }

    read(buffer: IBuffer, cursor: Cursor): IBuffer
    {
        if (cursor.subByteOffset > 0)
            throw new Error('Cross byte value are not supported');

        return buffer.slice(cursor.offset, cursor.offset + this.length);
    }

    write(buffer: IBuffer, cursor: Cursor, value: IBuffer)
    {
        value.copy(buffer, cursor.offset, 0, this.length);
    }
}