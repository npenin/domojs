"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uint16_1 = require("./uint16");
const uint8_1 = require("./uint8");
const core_1 = require("../core");
const length = 4;
class Uint32LE {
    constructor() {
    }
    length = length;
    read(buffer, cursor) {
        if (cursor.subByteOffset > 0) {
            let tmpBuffer = core_1.Buffer.alloc(4);
            tmpBuffer.writeUInt8(uint8_1.default.prototype.read(buffer, cursor), 0);
            tmpBuffer.writeUInt8(uint8_1.default.prototype.read(buffer, cursor), 1);
            tmpBuffer.writeUInt8(uint8_1.default.prototype.read(buffer, cursor), 2);
            tmpBuffer.writeUInt8(uint8_1.default.prototype.read(buffer, cursor), 3);
            return tmpBuffer.readUInt32LE(0);
        }
        const value = buffer.readUInt32LE(cursor.offset);
        cursor.offset += length;
        return value;
    }
    write(buffer, cursor, value) {
        if (cursor.subByteOffset > 0) {
            let tmpBuffer = core_1.Buffer.alloc(4);
            tmpBuffer.writeUInt32LE(value, 0);
            uint16_1.default.prototype.write(buffer, cursor, tmpBuffer.readUInt16LE(0));
            uint16_1.default.prototype.write(buffer, cursor, tmpBuffer.readUInt16LE(2));
        }
        else {
            buffer.writeUInt32LE(value, cursor.offset);
            cursor.offset += length;
        }
    }
}
exports.default = Uint32LE;
//# sourceMappingURL=uint32LE.js.map