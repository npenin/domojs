import { Cursor, Parser } from "./type";

export class Prepare<T> implements Parser<T>
{
    constructor(private prepareMessage: (t: T) => void, private parser: Parser<T>)
    {
    }

    length: number;
    read(buffer: Buffer, cursor: Cursor): T
    {
        return this.parser.read(buffer, cursor);
    }
    write(buffer: Buffer, cursor: Cursor, value: T): void
    {
        this.prepareMessage(value);
        this.parser.write(buffer, cursor, value);
    }

}