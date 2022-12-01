import { Cursor, Parser } from "./_common";
import Uint8 from "./uint8";
import { double } from "../core";
import Uint64 from "./uint64";

const length = 8;

export default class Double implements Parser<double>
{
    constructor()
    {

    }

    readonly length = length;

    public read(buffer: Buffer, cursor: Cursor): double
    {
        if (cursor.subByteOffset > 0)
        {
            let tmpBuffer = Buffer.alloc(length);
            tmpBuffer.writeBigUint64BE(Uint64.prototype.read(buffer, cursor));
            return tmpBuffer.readDoubleBE(0);
        }
        const value = buffer.readDoubleBE(cursor.offset);
        cursor.offset += length;
        return value;
    }

    public write(buffer: Buffer, cursor: Cursor, value: double)
    {
        if (cursor.subByteOffset > 0)
        {
            let tmpBuffer = Buffer.alloc(length);
            tmpBuffer.writeDoubleBE(value);
            Uint64.prototype.write(buffer, cursor, tmpBuffer.readBigUint64BE())
        }
        else
        {
            buffer.writeDoubleBE(value, cursor.offset);
            cursor.offset += length;
        }
    }
}