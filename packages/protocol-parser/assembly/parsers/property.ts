import { IBuffer } from "../core";
import { AnyParser, Cursor, ParserWithMessage, parserWrite } from "./_common";


export default class Property<T extends { [key in TKey]: Exclude<any, object> }, TKey extends keyof T> implements ParserWithMessage<T[TKey] | null, T>
{
    constructor(public readonly name: TKey, protected readonly parser: AnyParser<T[TKey] | null, T>)
    {
        this.length = parser.length;
    }
    length: number;
    read(buffer: IBuffer, cursor: Cursor, message: T): T[TKey] | null
    {
        const result = this.parser.read(buffer, cursor, message[this.name]);
        message[this.name] = result as T[TKey];
        return result;
    }

    write(value: T[TKey], message: T): IBuffer[]
    write(buffer: IBuffer, cursor: Cursor, value: T[TKey], message: T): void
    write(buffer: IBuffer | T[TKey], cursor?: Cursor | T, value?: T[TKey], message?: T)
    {
        if (!(cursor instanceof Cursor))
            return parserWrite(this.parser, cursor && cursor[this.name], cursor);
        return parserWrite(this.parser, buffer, cursor as Cursor, message && message[this.name], message);
    }
}