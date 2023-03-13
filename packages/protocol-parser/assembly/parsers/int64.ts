import { Cursor, Parser } from "./_common";
import Uint32 from "./uint32";
import Uint8 from "./uint8";

const length = 8;

export default class Int64 implements Parser<bigint>
{
    constructor()
    {

    }

    readonly length = length;

    public read(buffer: Buffer, cursor: Cursor): bigint
    {
        if (cursor.subByteOffset > 0)
        {
            let tmpBuffer = Buffer.alloc(8);
            tmpBuffer.writeUInt8(Uint8.prototype.read(buffer, cursor), 0);
            tmpBuffer.writeUInt8(Uint8.prototype.read(buffer, cursor), 1);
            tmpBuffer.writeUInt8(Uint8.prototype.read(buffer, cursor), 2);
            tmpBuffer.writeUInt8(Uint8.prototype.read(buffer, cursor), 3);
            tmpBuffer.writeUInt8(Uint8.prototype.read(buffer, cursor), 4);
            tmpBuffer.writeUInt8(Uint8.prototype.read(buffer, cursor), 5);
            tmpBuffer.writeUInt8(Uint8.prototype.read(buffer, cursor), 6);
            tmpBuffer.writeUInt8(Uint8.prototype.read(buffer, cursor), 7);
            return tmpBuffer.readBigInt64BE(0);
        }
        const value = buffer.readBigInt64BE(cursor.offset);
        cursor.offset += length;
        return value;

    }

    public write(buffer: Buffer, cursor: Cursor, value: bigint)
    {
        if (cursor.subByteOffset > 0)
        {
            let tmpBuffer = Buffer.alloc(8);
            tmpBuffer.writeBigInt64BE(value, 0);
            Uint32.prototype.write(buffer, cursor, tmpBuffer.readUInt32BE(0));
            Uint32.prototype.write(buffer, cursor, tmpBuffer.readUInt32BE(2));
        }
        else
        {
            buffer.writeBigInt64BE(value, cursor.offset);
            cursor.offset += length;
        }
    }
}