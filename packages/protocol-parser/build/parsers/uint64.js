"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uint32_1 = require("./uint32");
const uint8_1 = require("./uint8");
const core_1 = require("../core");
const length = 8;
class Uint64 {
    constructor() {
    }
    length = length;
    read(buffer, cursor) {
        if (cursor.subByteOffset > 0) {
            let tmpBuffer = core_1.Buffer.alloc(8);
            tmpBuffer.writeUInt8(uint8_1.default.prototype.read(buffer, cursor), 0);
            tmpBuffer.writeUInt8(uint8_1.default.prototype.read(buffer, cursor), 1);
            tmpBuffer.writeUInt8(uint8_1.default.prototype.read(buffer, cursor), 2);
            tmpBuffer.writeUInt8(uint8_1.default.prototype.read(buffer, cursor), 3);
            tmpBuffer.writeUInt8(uint8_1.default.prototype.read(buffer, cursor), 4);
            tmpBuffer.writeUInt8(uint8_1.default.prototype.read(buffer, cursor), 5);
            tmpBuffer.writeUInt8(uint8_1.default.prototype.read(buffer, cursor), 6);
            tmpBuffer.writeUInt8(uint8_1.default.prototype.read(buffer, cursor), 7);
            return tmpBuffer.readBigUInt64BE(0);
        }
        const value = buffer.readBigUInt64BE(cursor.offset);
        cursor.offset += length;
        return value;
    }
    write(buffer, cursor, value) {
        if (cursor.subByteOffset > 0) {
            let tmpBuffer = core_1.Buffer.alloc(8);
            tmpBuffer.writeBigUInt64BE(value, 0);
            uint32_1.default.prototype.write(buffer, cursor, tmpBuffer.readUInt32BE(0));
            uint32_1.default.prototype.write(buffer, cursor, tmpBuffer.readUInt32BE(2));
        }
        else {
            buffer.writeBigUInt64BE(value, cursor.offset);
            cursor.offset += length;
        }
    }
}
exports.default = Uint64;
//# sourceMappingURL=uint64.js.map