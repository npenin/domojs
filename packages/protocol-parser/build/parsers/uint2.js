"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bit_1 = require("./bit");
const length = .25;
class Uint2 {
    constructor() {
    }
    length = length;
    read(buffer, cursor) {
        var currentValue = buffer.readUInt8(cursor.floorOffset);
        var floorOffset = cursor.floorOffset;
        var subByteOffset = cursor.subByteOffset;
        switch (subByteOffset) {
            case 0:
                value = currentValue & 0b00000011;
                break;
            case 1:
                value = (currentValue & 0b00000110) >> subByteOffset;
                break;
            case 2:
                value = (currentValue & 0b00001100) >> subByteOffset;
                break;
            case 3:
                value = (currentValue & 0b00011000) >> subByteOffset;
                break;
            case 4:
                value = (currentValue & 0b00110000) >> subByteOffset;
                break;
            case 5:
                value = (currentValue & 0b01100000) >> subByteOffset;
                break;
            case 6:
                value = (currentValue & 0b11000000) >> subByteOffset;
                break;
            case 7:
                var value = (currentValue & 0b10000000) >> subByteOffset;
                currentValue = buffer.readUInt8(floorOffset + 1);
                value = value | ((currentValue & 0b00000001) << (8 - subByteOffset));
                break;
            default:
                throw new Error('invalid offset');
        }
        cursor.offset += length;
        return value;
    }
    write(buffer, cursor, value) {
        if (cursor.subByteOffset > 6) {
            bit_1.default.prototype.write(buffer, cursor, ((value >> 1) & 1));
            bit_1.default.prototype.write(buffer, cursor, (value & 1));
            return;
        }
        var currentValue = buffer.readUInt8(cursor.floorOffset);
        value = (value & 0b11) << cursor.subByteOffset;
        buffer.writeUInt8(currentValue | value, cursor.floorOffset);
        cursor.offset += this.length || .25;
    }
}
exports.default = Uint2;
//# sourceMappingURL=uint2.js.map