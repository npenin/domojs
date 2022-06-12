import { Cursor, Parser } from "./_common";
import Uint8 from "./uint8";
import { Buffer, IBuffer, uint16 } from "../core";

const length = 2;

export default class Uint16 implements Parser<number>
{
    constructor()
    {

    }

    readonly length = length;

    public read(buffer: IBuffer, cursor: Cursor): uint16
    {
        if (cursor.subByteOffset > 0)
        {
            let tmpBuffer = Buffer.alloc(2);
            tmpBuffer.writeUInt8(Uint8.prototype.read(buffer, cursor), 0);
            tmpBuffer.writeUInt8(Uint8.prototype.read(buffer, cursor), 1);
            return tmpBuffer.readUInt16BE(0);
        }
        const value = buffer.readUInt16BE(cursor.offset);
        cursor.offset += length;
        return value;
    }

    public write(buffer: IBuffer, cursor: Cursor, value: uint16)
    {
        if (cursor.subByteOffset > 0)
        {
            Uint8.prototype.write(buffer, cursor, value >> 8);
            Uint8.prototype.write(buffer, cursor, value & 0xFF);
        }
        else
        {
            buffer.writeUInt16BE(value, cursor.offset);
            cursor.offset += length;
        }
    }
}