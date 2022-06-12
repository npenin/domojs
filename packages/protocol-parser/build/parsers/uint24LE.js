"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uint8_1 = require("./uint8");
const core_1 = require("../core");
class Uint24LE {
    constructor() {
    }
    length = 3;
    read(buffer, cursor) {
        let tmpBuffer = core_1.Buffer.alloc(4);
        tmpBuffer.writeUInt8(uint8_1.default.prototype.read(buffer, cursor), 0);
        tmpBuffer.writeUInt8(uint8_1.default.prototype.read(buffer, cursor), 1);
        tmpBuffer.writeUInt8(uint8_1.default.prototype.read(buffer, cursor), 2);
        return tmpBuffer.readUInt32LE(0);
    }
    write(buffer, cursor, value) {
        let tmpBuffer = core_1.Buffer.alloc(4);
        tmpBuffer.writeUInt32LE(value, 0);
        uint8_1.default.prototype.write(buffer, cursor, tmpBuffer.readUInt8(0));
        uint8_1.default.prototype.write(buffer, cursor, tmpBuffer.readUInt8(1));
        uint8_1.default.prototype.write(buffer, cursor, tmpBuffer.readUInt8(2));
    }
}
exports.default = Uint24LE;
//# sourceMappingURL=uint24LE.js.map