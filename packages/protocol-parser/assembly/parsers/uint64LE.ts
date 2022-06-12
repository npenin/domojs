import { Cursor, Parser } from "./_common";
import Uint32 from "./uint32";
import Uint8 from "./uint8";
import { Buffer, IBuffer, uint64 } from "../core";

const length = 8;

export default class Uint64 implements Parser<uint64>
{
    constructor()
    {

    }

    readonly length = length;

    public read(buffer: IBuffer, cursor: Cursor): uint64
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
            return tmpBuffer.readBigUInt64LE(0);
        }
        const value = buffer.readBigUInt64LE(cursor.offset);
        cursor.offset += length;
        return value;
    }

    public write(buffer: IBuffer, cursor: Cursor, value: uint64)
    {
        if (cursor.subByteOffset > 0)
        {
            let tmpBuffer = Buffer.alloc(8);
            tmpBuffer.writeBigUInt64LE(value, 0);
            Uint32.prototype.write(buffer, cursor, tmpBuffer.readUInt32LE(2));
            Uint32.prototype.write(buffer, cursor, tmpBuffer.readUInt32LE(0));
        }
        else
        {
            buffer.writeBigUInt64LE(value, cursor.offset);
            cursor.offset += length;
        }
    }
}