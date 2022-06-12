import { ParsersWithMessage } from ".";
import { Buffer, IBuffer } from "../core";
import Series from "./series";
import { AnyParser, Cursor, Parser } from "./_common";

export default class ObjectParser<T extends Map<string | number, any>> extends Series<T> implements Parser<T>
{
    maps: AnyParser<T[keyof T], T>[];
    constructor(...parsers: ParsersWithMessage<any, Partial<T>>[])
    {
        super(...parsers)
    }

    read(buffer: IBuffer, cursor: Cursor, message?: T): T
    {
        var result = message || new Map() as T;

        return super.read(buffer, cursor, result);
    }

    write(buffer: IBuffer | T, cursor: Cursor | Partial<T>, value?: T, message?: Partial<T>)
    {
        return super.write(buffer, cursor, value, message)
    }

}