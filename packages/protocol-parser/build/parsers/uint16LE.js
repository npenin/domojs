"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uint8_1 = require("./uint8");
const core_1 = require("../core");
const length = 2;
class Uint16LE {
    constructor() {
    }
    length = length;
    read(buffer, cursor) {
        if (cursor.subByteOffset > 0) {
            let tmpBuffer = core_1.Buffer.alloc(2);
            tmpBuffer.writeUInt8(uint8_1.default.prototype.read(buffer, cursor), 0);
            tmpBuffer.writeUInt8(uint8_1.default.prototype.read(buffer, cursor), 1);
            return tmpBuffer.readUInt16LE(0);
        }
        const value = buffer.readUInt16LE(cursor.offset);
        cursor.offset += length;
        return value;
    }
    write(buffer, cursor, value) {
        if (cursor.subByteOffset > 0) {
            uint8_1.default.prototype.write(buffer, cursor, value & 0xFF);
            uint8_1.default.prototype.write(buffer, cursor, value >> 8);
        }
        else {
            buffer.writeUInt16LE(value, cursor.offset);
            cursor.offset += length;
        }
    }
}
exports.default = Uint16LE;
//# sourceMappingURL=uint16LE.js.map