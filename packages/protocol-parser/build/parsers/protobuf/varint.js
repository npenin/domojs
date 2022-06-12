"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _common_1 = require("../_common");
const uint8_1 = require("../uint8");
const uint7_1 = require("../uint7");
const uint32LE_1 = require("../uint32LE");
const uint24LE_1 = require("../uint24LE");
const uint16LE_1 = require("../uint16LE");
const core_1 = require("../../core");
class Varint {
    constructor() {
    }
    wireType = 'varint';
    length = -1;
    read(buffer, cursor) {
        let tmpBuffer = core_1.Buffer.alloc(4);
        let value = 0;
        let tmpOffset = 0;
        var innerCursor = new _common_1.Cursor();
        while (tmpOffset < 4 && (value = uint8_1.default.prototype.read(buffer, cursor)) > 0x80)
            uint7_1.default.prototype.write(tmpBuffer, innerCursor, value & 0x7f);
        uint7_1.default.prototype.write(tmpBuffer, innerCursor, value & 0x7f);
        switch (Math.ceil(innerCursor.offset)) {
            case 1:
                return tmpBuffer.readUInt8(0);
            case 2:
                return tmpBuffer.readUInt16LE(0);
            case 3:
            case 4:
                return tmpBuffer.readUInt32LE(0);
        }
        throw new Error('unsupported error');
    }
    write(value) {
        if (typeof value == 'undefined')
            return [];
        const buffer = core_1.Buffer.alloc(4);
        if (value <= 0x7f) {
            uint8_1.default.prototype.write(buffer, new _common_1.Cursor(), value);
            return [buffer.slice(0, 1)];
        }
        else {
            const tmpBuffer = core_1.Buffer.alloc(4);
            let innerCursor = new _common_1.Cursor();
            let cursor = new _common_1.Cursor();
            if (value <= 0x7fff) {
                uint16LE_1.default.prototype.write(tmpBuffer, innerCursor, value);
                innerCursor = new _common_1.Cursor();
                let tmpValue = uint7_1.default.prototype.read(tmpBuffer, innerCursor);
                uint8_1.default.prototype.write(buffer, cursor, tmpValue | 0x80);
                tmpValue = uint7_1.default.prototype.read(tmpBuffer, innerCursor);
                uint8_1.default.prototype.write(buffer, cursor, tmpValue);
            }
            else if (value <= 0x7fffff) {
                uint24LE_1.default.prototype.write(tmpBuffer, innerCursor, value);
                innerCursor = new _common_1.Cursor();
                let tmpValue = uint7_1.default.prototype.read(tmpBuffer, innerCursor);
                uint8_1.default.prototype.write(buffer, cursor, tmpValue | 0x80);
                tmpValue = uint7_1.default.prototype.read(tmpBuffer, innerCursor);
                uint8_1.default.prototype.write(buffer, cursor, tmpValue | 0x80);
                tmpValue = uint7_1.default.prototype.read(tmpBuffer, innerCursor);
                uint8_1.default.prototype.write(buffer, cursor, tmpValue);
            }
            else if (value <= 0x7fffffff) {
                uint32LE_1.default.prototype.write(tmpBuffer, innerCursor, value);
                innerCursor = new _common_1.Cursor();
                let tmpValue = uint7_1.default.prototype.read(tmpBuffer, innerCursor);
                uint8_1.default.prototype.write(buffer, cursor, tmpValue | 0x80);
                tmpValue = uint7_1.default.prototype.read(tmpBuffer, innerCursor);
                uint8_1.default.prototype.write(buffer, cursor, tmpValue | 0x80);
                tmpValue = uint7_1.default.prototype.read(tmpBuffer, innerCursor);
                uint8_1.default.prototype.write(buffer, cursor, tmpValue | 0x80);
                tmpValue = uint7_1.default.prototype.read(tmpBuffer, innerCursor);
                uint8_1.default.prototype.write(buffer, cursor, tmpValue);
            }
            else
                throw new Error('invalid value for varint');
            return [buffer.slice(0, cursor.offset)];
        }
    }
}
exports.default = Varint;
//# sourceMappingURL=varint.js.map