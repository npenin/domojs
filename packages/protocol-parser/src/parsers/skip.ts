import { Cursor, Parser } from "./type";

export default class Skip<T> implements Parser<T>
{
    constructor(public readonly length: number) { }
    read(_buffer: Buffer, cursor: Cursor)
    {
        cursor.offset += length;
        return null;
    }

    write(_buffer: Buffer, cursor: Cursor)
    {
        cursor.offset += length;
    }
}