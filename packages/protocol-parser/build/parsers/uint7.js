"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bit_1 = require("./bit");
const uint2_1 = require("./uint2");
const uint3_1 = require("./uint3");
const uint4_1 = require("./uint4");
const uint5_1 = require("./uint5");
const uint6_1 = require("./uint6");
const length = .875;
class Uint7 {
    constructor() {
    }
    length = length;
    read(buffer, cursor) {
        var currentValue = buffer.readUInt8(cursor.floorOffset);
        var value;
        switch (cursor.subByteOffset) {
            case 0:
                value = (currentValue & 0b01111111);
                break;
            case 1:
                value = (currentValue & 0b11111110) >> cursor.subByteOffset;
                break;
            case 2:
                value = (currentValue & 0b11111100) >> cursor.subByteOffset;
                currentValue = buffer.readUInt8(cursor.floorOffset + 1);
                value = value | ((currentValue & 0b00000001) << (8 - cursor.subByteOffset));
                break;
            case 3:
                value = (currentValue & 0b11111000) >> cursor.subByteOffset;
                currentValue = buffer.readUInt8(cursor.floorOffset + 1);
                value = value | ((currentValue & 0b00000011) << (8 - cursor.subByteOffset));
                break;
            case 4:
                value = (currentValue & 0b11110000) >> cursor.subByteOffset;
                currentValue = buffer.readUInt8(cursor.floorOffset + 1);
                value = value | ((currentValue & 0b00000111) << (8 - cursor.subByteOffset));
                break;
            case 5:
                value = (currentValue & 0b11100000) >> cursor.subByteOffset;
                currentValue = buffer.readUInt8(cursor.floorOffset + 1);
                value = value | ((currentValue & 0b00001111) << (8 - cursor.subByteOffset));
                break;
            case 6:
                value = (currentValue & 0b11000000) >> cursor.subByteOffset;
                currentValue = buffer.readUInt8(cursor.floorOffset + 1);
                value = value | ((currentValue & 0b00011111) << (8 - cursor.subByteOffset));
                break;
            case 7:
                value = (currentValue & 0b10000000) >> cursor.subByteOffset;
                currentValue = buffer.readUInt8(cursor.floorOffset + 1);
                value = value | ((currentValue & 0b00111111) << (8 - cursor.subByteOffset));
                break;
            default:
                throw new Error('invalid offset');
        }
        cursor.offset += length;
        return value;
    }
    write(buffer, cursor, value) {
        switch (cursor.subByteOffset) {
            case 0:
            case 1:
                var currentValue = buffer.readUInt8(cursor.floorOffset);
                value = (value & 0b1111111) << cursor.subByteOffset;
                buffer.writeUInt8(currentValue | value, cursor.floorOffset);
                cursor.offset += length;
                break;
            case 2:
                uint6_1.default.prototype.write(buffer, cursor, value);
                bit_1.default.prototype.write(buffer, cursor, (value >> 6));
                break;
            case 3:
                uint5_1.default.prototype.write(buffer, cursor, value);
                uint2_1.default.prototype.write(buffer, cursor, (value >> 5));
                break;
            case 4:
                uint4_1.default.prototype.write(buffer, cursor, value);
                uint3_1.default.prototype.write(buffer, cursor, (value >> 4));
                break;
            case 5:
                uint3_1.default.prototype.write(buffer, cursor, value);
                uint4_1.default.prototype.write(buffer, cursor, value >> 3);
                break;
            case 6:
                uint2_1.default.prototype.write(buffer, cursor, value);
                uint5_1.default.prototype.write(buffer, cursor, value >> 2);
                break;
            case 7:
                bit_1.default.prototype.write(buffer, cursor, (value & 1));
                uint6_1.default.prototype.write(buffer, cursor, value >> 1);
                break;
        }
    }
}
exports.default = Uint7;
//# sourceMappingURL=uint7.js.map