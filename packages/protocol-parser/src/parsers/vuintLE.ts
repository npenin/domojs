import { Cursor, Parser } from "./_common";
import Uint16LE from "./uint16LE";
import Uint24LE from "./uint24LE";
import Uint32LE from "./uint32LE";
import Uint8 from "./uint8";

export default class Vuint implements Parser<number>
{
    constructor()
    {

    }

    length = -1;

    public read(buffer: Buffer, cursor: Cursor): number
    {
        let tmpBuffer = Buffer.alloc(4);
        let value: number;
        let tmpOffset = 0;
        while (tmpOffset < 4 && (value = Uint8.prototype.read(buffer, cursor)) > 0x7f)
            tmpBuffer.writeUInt8(value, tmpOffset++);
        switch (tmpOffset)
        {
            case 1:
                return tmpBuffer.readUInt8(0);
            case 2:
                return tmpBuffer.readUInt16LE(0);
            case 3:
                return tmpBuffer.readUInt8(2) << 16 + tmpBuffer.readUInt16LE(0);
            case 4:
                return tmpBuffer.readUInt32LE(0);
        }
    }

    public write(buffer: Buffer, cursor: Cursor, value: number)
    {
        if (value <= 0x7f)
            Uint8.prototype.write(buffer, cursor, value);
        else if (value <= 0xff7f)
            Uint16LE.prototype.write(buffer, cursor, value);
        else if (value <= 0xffff7f)
            Uint24LE.prototype.write(buffer, cursor, value);
        else if (value <= 0xffffff7f)
            Uint32LE.prototype.write(buffer, cursor, value);

        else
            throw new Error('invalid value for vuint');
    }
}