import { AnyParser, Cursor, ParserWithMessageWithoutKnownLength, parserWrite } from "./type";

export default class Switch<T extends { [key in TKey]: TValue }, TKey extends keyof T, TResult, TValue extends string | number> implements ParserWithMessageWithoutKnownLength<TResult, T>
{
    private parsers: { [key in TValue]: AnyParser<TResult> };
    constructor(private name: TKey, parsers: { [key in TValue]: AnyParser<TResult> })
    {
        this.parsers = parsers;

    }
    length: -1 = -1;
    read(buffer: Buffer, cursor: Cursor, message: T): TResult
    {
        var parser = this.parsers[message[this.name]];
        if (!parser)
            throw new Error(`No parser could be found for ${this.name} in ${JSON.stringify(message)}`);

        return parser.read(buffer, cursor, message);
    }
    write(value: TResult, message: T): Buffer[]
    {
        if (typeof (message) == 'undefined')
            throw new Error('no message was provided');

        var parser = this.parsers[message[this.name]];
        if (!parser)
            throw new Error(`No parser could be found for ${this.name} in ${JSON.stringify(value)}`);

        return parserWrite(parser, value, message);
    }

}
