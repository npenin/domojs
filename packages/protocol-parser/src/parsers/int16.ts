import { Cursor, Parser } from './_common.js';
import Uint8 from './uint8.js';
import { int16 } from "../core.js";

const length = 2;

export default class Int16 implements Parser<int16>
{
    constructor()
    {

    }

    readonly length = length;

    public read(buffer: Buffer, cursor: Cursor): int16
    {
        if (cursor.subByteOffset > 0)
        {
            let tmpBuffer = Buffer.alloc(2);
            tmpBuffer.writeUInt8(Uint8.prototype.read(buffer, cursor), 0);
            tmpBuffer.writeUInt8(Uint8.prototype.read(buffer, cursor), 1);
            return tmpBuffer.readInt16BE(0);
        }
        const value = buffer.readInt16BE(cursor.offset);
        cursor.offset += length;
        return value;
    }

    public write(buffer: Buffer, cursor: Cursor, value: int16)
    {
        if (cursor.subByteOffset > 0)
        {
            Uint8.prototype.write(buffer, cursor, value >> 8);
            Uint8.prototype.write(buffer, cursor, value & 0xFF);
        }
        else
        {
            buffer.writeInt16BE(value, cursor.offset);
            cursor.offset += length;
        }
    }
}