import { ParsersWithMessage } from ".";
import Property from "./property";
import Series from "./series";
import { AnyParser, Cursor, Parser, ParserWithMessage, ParserWithMessageWithoutKnownLength, ParserWithoutKnownLength, parserWrite } from "./_common";

export default class ObjectParser<T extends object> extends Series<T> implements Parser<T>
{
    maps: AnyParser<T[keyof T], T>[];
    constructor(...parsers: ParsersWithMessage<any, Partial<T>>[])
    {
        super(...parsers)
    }

    read(buffer: Buffer, cursor: Cursor, message?: T): T
    {
        var result = message || {} as T;

        return super.read(buffer, cursor, result);
    }

    write(buffer: Buffer | T, cursor: Cursor | Partial<T>, value?: T, message?: Partial<T>)
    {
        return super.write(buffer, cursor, value, message)
    }

}