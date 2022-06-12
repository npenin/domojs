import { Cursor, ParserWithoutKnownLength } from "./_common";
import Uint16 from "./uint16";
import Uint24 from "./uint24";
import Uint32 from "./uint32";
import Uint8 from "./uint8";
import { Buffer, IBuffer, uint32 } from "../core";

export default class Vuint implements ParserWithoutKnownLength<number>
{
    constructor()
    {

    }

    length: -1 = -1;

    public read(buffer: IBuffer, cursor: Cursor): uint32
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
                return tmpBuffer.readUInt16BE(0);
            case 3:
                return tmpBuffer.readUInt8(0) << 16 + tmpBuffer.readUInt16BE(1);
            case 4:
                return tmpBuffer.readUInt32BE(0);
            default:
                throw new RangeError('offset cannot be bigger than 4')
        }
    }

    public write(value: number)
    {
        if (value <= 0x7f)
        {
            const buffer = Buffer.alloc(1);
            Uint8.prototype.write(buffer, new Cursor(), value);
            return [buffer];
        }
        else if (value <= 0xff7f)
        {
            const buffer = Buffer.alloc(2);
            Uint16.prototype.write(buffer, new Cursor(), value);
            return [buffer];
        } else if (value <= 0xffff7f)
        {
            const buffer = Buffer.alloc(3);
            Uint24.prototype.write(buffer, new Cursor(), value);
            return [buffer];
        } else if (value <= 0xffffff7f)
        {
            const buffer = Buffer.alloc(4);
            Uint32.prototype.write(buffer, new Cursor(), value);
            return [buffer];
        }
        else
            throw new Error('invalid value for vuint');
    }
}