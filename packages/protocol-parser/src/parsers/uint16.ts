import { Cursor, Parser } from "./type";
import Uint8 from "./uint8";

const length = 2;

export default class Uint16 implements Parser<number>
{
    constructor()
    {

    }

    readonly length = length;

    public read(buffer: Buffer, cursor: Cursor): number
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

    public write(buffer: Buffer, cursor: Cursor, value: number)
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