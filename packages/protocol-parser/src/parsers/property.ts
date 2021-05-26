import { AnyParser, Cursor, Parser, ParserWithMessage, ParserWithMessageWithoutKnownLength, ParserWithoutKnownLength, parserWrite } from "./type";


export default class Property<T extends { [key in TKey]: Exclude<any, object> }, TKey extends keyof T> implements ParserWithMessage<T[TKey], T>
{
    constructor(public readonly name: TKey, private readonly parser: AnyParser<T[TKey], T>)
    {
        this.length = parser.length;
    }
    length: number;
    read(buffer: Buffer, cursor: Cursor, message: T): T[TKey]
    {
        return message[this.name] = this.parser.read(buffer, cursor, message[this.name]);
    }

    write(value: T[TKey], message: T): Buffer[]
    write(buffer: Buffer, cursor: Cursor, value: T[TKey], message: T): void
    write(buffer: Buffer | T[TKey], cursor?: Cursor | T, value?: T[TKey], message?: T)
    {
        if (!(cursor instanceof Cursor))
            return parserWrite(this.parser, cursor[this.name], cursor[this.name]);
        return parserWrite(this.parser, buffer, cursor as Cursor, message[this.name], message);
    }
}