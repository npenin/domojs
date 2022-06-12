import { Cursor, Parser } from "./_common";
import Uint8 from "./uint8";
import { Buffer, IBuffer, uint32 } from "../core";

export default class Uint24LE implements Parser<uint32>
{
    constructor()
    {

    }

    length = 3;

    public read(buffer: IBuffer, cursor: Cursor): uint32
    {
        let tmpBuffer = Buffer.alloc(4);
        tmpBuffer.writeUInt8(Uint8.prototype.read(buffer, cursor), 0);
        tmpBuffer.writeUInt8(Uint8.prototype.read(buffer, cursor), 1);
        tmpBuffer.writeUInt8(Uint8.prototype.read(buffer, cursor), 2);
        return tmpBuffer.readUInt32LE(0);
    }

    public write(buffer: IBuffer, cursor: Cursor, value: uint32)
    {
        let tmpBuffer = Buffer.alloc(4);
        tmpBuffer.writeUInt32LE(value, 0);
        Uint8.prototype.write(buffer, cursor, tmpBuffer.readUInt8(0));
        Uint8.prototype.write(buffer, cursor, tmpBuffer.readUInt8(1));
        Uint8.prototype.write(buffer, cursor, tmpBuffer.readUInt8(2));
    }
}