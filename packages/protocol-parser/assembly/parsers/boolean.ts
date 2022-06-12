
import { IBuffer } from "../core";
import { Cursor, Parser } from "./_common";


export default class Boolean implements Parser<boolean>
{
    constructor(private parser: Parser<number>)
    {
        this.length = parser.length;
    }

    public length: number;

    public read(buffer: IBuffer, cursor: Cursor): boolean
    {
        return this.parser.read(buffer, cursor) === 1;
    }

    public write(buffer: IBuffer, cursor: Cursor, value: boolean)
    {
        return this.parser.write(buffer, cursor, value && 1 || 0);

    }
}