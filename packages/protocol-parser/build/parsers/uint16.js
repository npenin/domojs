"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uint8_1 = require("./uint8");
const core_1 = require("../core");
const length = 2;
class Uint16 {
    constructor() {
    }
    length = length;
    read(buffer, cursor) {
        if (cursor.subByteOffset > 0) {
            let tmpBuffer = core_1.Buffer.alloc(2);
            tmpBuffer.writeUInt8(uint8_1.default.prototype.read(buffer, cursor), 0);
            tmpBuffer.writeUInt8(uint8_1.default.prototype.read(buffer, cursor), 1);
            return tmpBuffer.readUInt16BE(0);
        }
        const value = buffer.readUInt16BE(cursor.offset);
        cursor.offset += length;
        return value;
    }
    write(buffer, cursor, value) {
        if (cursor.subByteOffset > 0) {
            uint8_1.default.prototype.write(buffer, cursor, value >> 8);
            uint8_1.default.prototype.write(buffer, cursor, value & 0xFF);
        }
        else {
            buffer.writeUInt16BE(value, cursor.offset);
            cursor.offset += length;
        }
    }
}
exports.default = Uint16;
//# sourceMappingURL=uint16.js.map