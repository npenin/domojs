import { Buffer, IBuffer, uint8 } from "../core";
import { Cursor, Parser } from "./_common";

export const length = .125;

export default class Bit implements Parser<uint8>
{
    constructor()
    {

    }

    readonly length = length;

    public read(buffer: IBuffer, cursor: Cursor): uint8
    {
        var currentValue = buffer.readUInt8(cursor.floorOffset);
        var subByteOffset = cursor.subByteOffset;
        let value: uint8;

        switch (subByteOffset)
        {
            case 0:
                value = currentValue & 0b00000001;
                break;
            case 1:
                value = (currentValue & 0b00000010) >> subByteOffset;
                break;
            case 2:
                value = (currentValue & 0b00000100) >> subByteOffset;
                break;
            case 3:
                value = (currentValue & 0b00001000) >> subByteOffset;
                break;
            case 4:
                value = (currentValue & 0b00010000) >> subByteOffset;
                break;
            case 5:
                value = (currentValue & 0b00100000) >> subByteOffset;
                break;
            case 6:
                value = (currentValue & 0b01000000) >> subByteOffset;
                break;
            case 7:
                value = (currentValue & 0b10000000) >> subByteOffset;
                break;
            default:
                throw new Error('Invalid subbyte offset');
        };
        cursor.offset += length;
        return value;

    }

    public write(buffer: IBuffer, cursor: Cursor, value: number)
    {
        var currentValue = buffer.readUInt8(cursor.floorOffset);
        var numberValue = (value & 1) << cursor.subByteOffset;
        buffer.writeUInt8(currentValue | numberValue, cursor.floorOffset);
        cursor.offset += length;
    }
}