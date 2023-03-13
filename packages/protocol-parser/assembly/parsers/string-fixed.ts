import { Buffer, BufferEncoding, IBuffer } from "../core";
import { Cursor, Parser } from "./_common";

export default class FixedString<TString extends string = string> implements Parser<TString>
{
    constructor(public readonly length: number, private encoding: BufferEncoding = 'ascii')
    {
    }
    read(buffer: IBuffer, cursor: Cursor): TString
    {
        if (cursor.subByteOffset > 0)
            throw new Error('Cross byte value are not supported');

        if (this.length === -1)
            return buffer.toString(this.encoding, cursor.offset) as TString;

        return buffer.toString(this.encoding, cursor.offset, cursor.offset + this.length) as TString;
    }
    write(value: TString): void
    write(buffer: IBuffer, cursor: Cursor, value?: TString): IBuffer[]
    write(buffer: IBuffer | TString, cursor?: Cursor, value?: TString): IBuffer[] | void
    {
        if (value && this.length && value.length != this.length)
            throw new Error(`string length (${value.length}) is not matching with expected length (${this.length})`)

        if (cursor && cursor.subByteOffset > 0)
            throw new Error('Cross byte value are not supported');

        if (typeof (buffer) === 'string')
            return [Buffer.from(buffer, this.encoding)];
        else if (cursor)
            cursor.offset += buffer.write(value || '', cursor.offset, this.length, this.encoding);
    }
}