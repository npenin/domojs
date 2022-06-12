import { IBuffer } from "../core";
import { AnyParser, Cursor, ParserWithMessage, parserWrite } from "./_common";


export default class Property<T extends object, TKey extends keyof T> implements ParserWithMessage<T[TKey], T>
{
    constructor(public readonly name: TKey, private readonly parser: AnyParser<T[TKey], T[TKey]>)
    {
        this.length = parser.length;
    }
    length: number;
    read(buffer: IBuffer, cursor: Cursor, message: T): T[TKey]
    {
        var result: T[TKey];
        if (message && message[this.name])
            result = message[this.name]
        else
            result = {} as T[TKey];

        return message[this.name] = this.parser.read(buffer, cursor, result);
    }

    write(value: T[TKey], message: T): IBuffer[]
    write(buffer: IBuffer, cursor: Cursor, value: T[TKey], message: T): void
    write(buffer: IBuffer | T[TKey], cursor?: Cursor | T, value?: T[TKey], message?: T)
    {
        if (!(cursor instanceof Cursor))
            return parserWrite(this.parser, cursor && cursor[this.name], cursor && cursor[this.name]);
        return parserWrite(this.parser, buffer, cursor as Cursor, message && message[this.name], message && message[this.name]);
    }
}