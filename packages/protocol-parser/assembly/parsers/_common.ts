import { Buffer, IBuffer, int32, uint32, uint8 } from "../core";

export interface Parser<T>
{
    length: int32;
    read(buffer: IBuffer, cursor: Cursor): T;
    write(buffer: IBuffer, cursor: Cursor, value: T): void;
}
export interface ParserWithMessage<T, TMessage>
{
    length: int32;
    read(buffer: IBuffer, cursor: Cursor, partial: TMessage): T;
    write(buffer: IBuffer, cursor: Cursor, value: T, message: TMessage | null): void;
}
export interface ParserWithoutKnownLength<T>
{
    length: -1;
    read(buffer: IBuffer, cursor: Cursor, message?: unknown): T;
    write(value: T): IBuffer[];
}
export interface ParserWithMessageWithoutKnownLength<T, TMessage>
{
    length: -1;
    read(buffer: IBuffer, cursor: Cursor, partial: TMessage): T;
    write(value: T, message: TMessage): IBuffer[];
}

export type Parsers<T> = Parser<T> | ParserWithoutKnownLength<T>
export type ParsersWithMessage<T, TMessage> = ParserWithMessage<T, TMessage> | ParserWithMessageWithoutKnownLength<T, TMessage>;
export type AnyParser<T, TMessage> = Parsers<T> | ParsersWithMessage<T, TMessage>

export class Cursor
{
    private _offset: f32 = 0;
    private _floorOffset: uint32 = 0;
    private _subByteOffset: uint8 = 0;
    get offset(): f32 { return this._offset; };
    set offset(value: f32)
    {
        this._offset = value;
        this._floorOffset = Math.floor(value);
        this._subByteOffset = (value - this._floorOffset) * 8;
    };
    get floorOffset(): uint32 { return this._floorOffset };
    get subByteOffset(): uint8 { return this._subByteOffset };

    public freeze(): Cursor
    {
        var c = new Cursor();
        c._floorOffset = this._floorOffset;
        c._subByteOffset = this._subByteOffset;
        c._offset = this._offset;
        return c;
    }
}

// type IsCursor<T> = (cursor: Cursor | T) => boolean;

export function hasUnknownLength<T, TMessage = unknown>(p: AnyParser<T, TMessage>): p is ParserWithoutKnownLength<T> | ParserWithMessageWithoutKnownLength<T, TMessage>
{
    return p.length == -1;
}

export function parserWrite<T, TMessage = unknown>(parser: AnyParser<T, TMessage>, buffer: IBuffer, cursor: Cursor, value: T, message?: TMessage): void
export function parserWrite<T, TMessage = unknown>(parser: AnyParser<T, TMessage>, value: T, message?: TMessage): IBuffer[]
export function parserWrite<T, TMessage = unknown>(parser: AnyParser<T, TMessage>, buffer: IBuffer | T, cursor: Cursor | TMessage, value?: T, message?: TMessage): IBuffer[] | void
export function parserWrite<T, TMessage = unknown>(parser: AnyParser<T, TMessage>, buffer: IBuffer | T, cursor: Cursor | TMessage, value?: T, message?: TMessage): IBuffer[] | void
{
    if (Buffer.isBuffer(buffer) && cursor instanceof Cursor)
        if (hasUnknownLength(parser))
        {
            if (!(cursor instanceof Cursor))
                throw new Error('no cursor was provided');
            const dataview = buffer;
            parser.write(value as T, message as TMessage).forEach(b => { b.copy(buffer as IBuffer, cursor.offset); cursor.offset += b.length });
        }
        else
        {
            if (!(cursor instanceof Cursor))
                throw new Error('no cursor was provided');

            parser.write(buffer, cursor, value as T, message as TMessage);
        }
    else
    {
        message = cursor as TMessage;
        value = buffer as T;

        if (hasUnknownLength(parser))
            return parser.write(value, message);
        else
        {
            buffer = Buffer.alloc(Math.ceil(parser.length));
            parser.write(buffer, new Cursor(), value, message);
            return [buffer];
        }
    }
}