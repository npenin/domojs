import { Cursor, Parser } from "./_common";
import Uint8 from "./uint8";
import { Buffer, IBuffer, uint32 } from "../core";

const length = 3;

export default class Uint24 implements Parser<uint32>
{
    constructor()
    {

    }

    readonly length = length;

    public read(buffer: IBuffer, cursor: Cursor): uint32
    {
        if (cursor.subByteOffset > 0)
        {
            let tmpBuffer = Buffer.alloc(4);
            tmpBuffer.writeUInt8(Uint8.prototype.read(buffer, cursor), 0);
            tmpBuffer.writeUInt8(Uint8.prototype.read(buffer, cursor), 1);
            tmpBuffer.writeUInt8(Uint8.prototype.read(buffer, cursor), 2);
            return tmpBuffer.readUInt32BE(0);
        }
        const value = buffer.readUInt32BE(cursor.offset);
        cursor.offset += length;
        return value;
    }

    public write(buffer: IBuffer, cursor: Cursor, value: uint32)
    {
        if (cursor.subByteOffset > 0)
        {
            let tmpBuffer = Buffer.alloc(4);
            tmpBuffer.writeUInt32BE(value, 0);
            Uint8.prototype.write(buffer, cursor, tmpBuffer.readUInt8(0));
            Uint8.prototype.write(buffer, cursor, tmpBuffer.readUInt8(1));
            Uint8.prototype.write(buffer, cursor, tmpBuffer.readUInt8(2));
        }
        else
        {
            buffer.writeUInt32BE(value, cursor.offset);
            cursor.offset += length;
        }
    }
}