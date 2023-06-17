import { Cursor, Parser } from './_common.js';

export default class Skip<T> implements Parser<T>
{
    constructor(public readonly length: number) { }
    read(_buffer: Buffer, cursor: Cursor)
    {
        cursor.offset += this.length;
        return null;
    }

    write(_buffer: Buffer, cursor: Cursor)
    {
        cursor.offset += this.length;
    }
}