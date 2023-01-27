import PrefixedString from "../string-prefixed";
import { AnyParser, Cursor, Parsers } from "../_common";

export class TLVString extends PrefixedString
{
    constructor(parser: Parsers<number>, private readonly maxLength: number, encoding?: BufferEncoding)
    {
        super(parser, encoding)
    }

    length: -1;

    write(value: string): Buffer[]
    {
        var result = []
        const cursor = new Cursor();
        while (cursor.offset < value.length)
        {
            if (value.length > this.maxLength)
            {
                result.push(...super.write(value.substring(cursor.offset, this.maxLength)));
                cursor.offset += this.maxLength;
            }
            else
            {
                result.push(...super.write(value.substring(cursor.offset)));
                cursor.offset += this.maxLength;
            }
        }
        return result;
    }

}