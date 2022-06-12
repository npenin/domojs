import { IBuffer } from "../core";
import { Cursor, Parser } from "./_common";

export default class Skip<T> implements Parser<T | undefined>
{
    constructor(public readonly length: number) { }
    read(_buffer: IBuffer, cursor: Cursor): T | undefined
    {
        cursor.offset += this.length;
        return undefined;
    }

    write(_buffer: IBuffer, cursor: Cursor)
    {
        cursor.offset += this.length;
    }
}