"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uint8_1 = require("./uint8");
const core_1 = require("../core");
const length = 3;
class Uint24 {
    constructor() {
    }
    length = length;
    read(buffer, cursor) {
        if (cursor.subByteOffset > 0) {
            let tmpBuffer = core_1.Buffer.alloc(4);
            tmpBuffer.writeUInt8(uint8_1.default.prototype.read(buffer, cursor), 0);
            tmpBuffer.writeUInt8(uint8_1.default.prototype.read(buffer, cursor), 1);
            tmpBuffer.writeUInt8(uint8_1.default.prototype.read(buffer, cursor), 2);
            return tmpBuffer.readUInt32BE(0);
        }
        const value = buffer.readUInt32BE(cursor.offset);
        cursor.offset += length;
        return value;
    }
    write(buffer, cursor, value) {
        if (cursor.subByteOffset > 0) {
            let tmpBuffer = core_1.Buffer.alloc(4);
            tmpBuffer.writeUInt32BE(value, 0);
            uint8_1.default.prototype.write(buffer, cursor, tmpBuffer.readUInt8(0));
            uint8_1.default.prototype.write(buffer, cursor, tmpBuffer.readUInt8(1));
            uint8_1.default.prototype.write(buffer, cursor, tmpBuffer.readUInt8(2));
        }
        else {
            buffer.writeUInt32BE(value, cursor.offset);
            cursor.offset += length;
        }
    }
}
exports.default = Uint24;
//# sourceMappingURL=uint24.js.map