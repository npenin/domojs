import { Cursor, Parser, ParserWithoutKnownLength } from "../_common";
import Uint8 from "../uint8";
import Uint7 from "../uint7";
import Uint32LE from "../uint32LE";
import Uint24LE from "../uint24LE";
import Uint16LE from "../uint16LE";
import { WireType } from "./field";

export default class Varint implements ParserWithoutKnownLength<number>
{
    constructor()
    {

    }

    wireType: WireType = 'varint'

    length: -1 = -1;

    public read(buffer: Buffer, cursor: Cursor): number
    {
        let tmpBuffer = Buffer.alloc(4);
        let value: number;
        let tmpOffset = 0;
        var innerCursor = new Cursor();
        while (tmpOffset < 4 && (value = Uint8.prototype.read(buffer, cursor)) > 0x80)
            Uint7.prototype.write(tmpBuffer, innerCursor, value & 0x7f);
        Uint7.prototype.write(tmpBuffer, innerCursor, value & 0x7f);
        switch (Math.ceil(innerCursor.offset))
        {
            case 1:
                return tmpBuffer.readUInt8(0);
            case 2:
                return tmpBuffer.readUInt16LE(0);
            case 3:
            case 4:
                return tmpBuffer.readUInt32LE(0);
        }
    }

    public write(value: number): Buffer[]
    {
        if (typeof value == 'undefined')
            return null;
        const buffer = Buffer.alloc(4);
        if (value <= 0x7f)
        {
            Uint8.prototype.write(buffer, new Cursor(), value);
            return [buffer.slice(0, 1)];
        }
        else
        {
            const tmpBuffer = Buffer.alloc(4);
            let innerCursor = new Cursor();
            let cursor = new Cursor();
            if (value <= 0x7fff)
            {
                Uint16LE.prototype.write(tmpBuffer, innerCursor, value);
                innerCursor = new Cursor();
                let tmpValue = Uint7.prototype.read(tmpBuffer, innerCursor);
                Uint8.prototype.write(buffer, cursor, tmpValue | 0x80);
                tmpValue = Uint7.prototype.read(tmpBuffer, innerCursor);
                Uint8.prototype.write(buffer, cursor, tmpValue);
            }
            else if (value <= 0x7fffff)
            {
                Uint24LE.prototype.write(tmpBuffer, innerCursor, value);
                innerCursor = new Cursor();
                let tmpValue = Uint7.prototype.read(tmpBuffer, innerCursor);
                Uint8.prototype.write(buffer, cursor, tmpValue | 0x80);
                tmpValue = Uint7.prototype.read(tmpBuffer, innerCursor);
                Uint8.prototype.write(buffer, cursor, tmpValue | 0x80);
                tmpValue = Uint7.prototype.read(tmpBuffer, innerCursor);
                Uint8.prototype.write(buffer, cursor, tmpValue);
            }
            else if (value <= 0x7fffffff)
            {
                Uint32LE.prototype.write(tmpBuffer, innerCursor, value);
                innerCursor = new Cursor();
                let tmpValue = Uint7.prototype.read(tmpBuffer, innerCursor);
                Uint8.prototype.write(buffer, cursor, tmpValue | 0x80);
                tmpValue = Uint7.prototype.read(tmpBuffer, innerCursor);
                Uint8.prototype.write(buffer, cursor, tmpValue | 0x80);
                tmpValue = Uint7.prototype.read(tmpBuffer, innerCursor);
                Uint8.prototype.write(buffer, cursor, tmpValue | 0x80);
                tmpValue = Uint7.prototype.read(tmpBuffer, innerCursor);
                Uint8.prototype.write(buffer, cursor, tmpValue);
            }
            else
                throw new Error('invalid value for varint');
            return [buffer.slice(0, cursor.offset)];
        }
    }
}