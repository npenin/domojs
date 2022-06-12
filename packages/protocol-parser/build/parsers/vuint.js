"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _common_1 = require("./_common");
const uint16_1 = require("./uint16");
const uint24_1 = require("./uint24");
const uint32_1 = require("./uint32");
const uint8_1 = require("./uint8");
const core_1 = require("../core");
class Vuint {
    constructor() {
    }
    length = -1;
    read(buffer, cursor) {
        let tmpBuffer = core_1.Buffer.alloc(4);
        let value;
        let tmpOffset = 0;
        while (tmpOffset < 4 && (value = uint8_1.default.prototype.read(buffer, cursor)) > 0x7f)
            tmpBuffer.writeUInt8(value, tmpOffset++);
        switch (tmpOffset) {
            case 1:
                return tmpBuffer.readUInt8(0);
            case 2:
                return tmpBuffer.readUInt16BE(0);
            case 3:
                return tmpBuffer.readUInt8(0) << 16 + tmpBuffer.readUInt16BE(1);
            case 4:
                return tmpBuffer.readUInt32BE(0);
            default:
                throw new RangeError('offset cannot be bigger than 4');
        }
    }
    write(value) {
        if (value <= 0x7f) {
            const buffer = core_1.Buffer.alloc(1);
            uint8_1.default.prototype.write(buffer, new _common_1.Cursor(), value);
            return [buffer];
        }
        else if (value <= 0xff7f) {
            const buffer = core_1.Buffer.alloc(2);
            uint16_1.default.prototype.write(buffer, new _common_1.Cursor(), value);
            return [buffer];
        }
        else if (value <= 0xffff7f) {
            const buffer = core_1.Buffer.alloc(3);
            uint24_1.default.prototype.write(buffer, new _common_1.Cursor(), value);
            return [buffer];
        }
        else if (value <= 0xffffff7f) {
            const buffer = core_1.Buffer.alloc(4);
            uint32_1.default.prototype.write(buffer, new _common_1.Cursor(), value);
            return [buffer];
        }
        else
            throw new Error('invalid value for vuint');
    }
}
exports.default = Vuint;
//# sourceMappingURL=vuint.js.map