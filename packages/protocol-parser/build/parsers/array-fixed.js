"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../core");
const _common_1 = require("./_common");
class FixedLengthArray {
    length;
    valueParser;
    constructor(length, valueParser) {
        this.length = length;
        this.valueParser = valueParser;
    }
    read(buffer, cursor, message) {
        if (cursor.subByteOffset > 0)
            throw new Error('Cross byte value are not supported');
        var result;
        if (this.length == -1) {
            result = [];
            while (cursor.offset < buffer.length)
                result.push(this.valueParser.read(buffer, cursor, message));
        }
        else {
            result = new Array(this.length);
            for (let index = 0; index < this.length; index++)
                result[index] = this.valueParser.read(buffer, cursor, message);
        }
        return result;
    }
    write(buffer, cursor, value, message) {
        if (!core_1.Buffer.isBuffer(buffer)) {
            var buffers = [];
            for (let index = 0; index < buffer.length; index++)
                buffers.push(...(0, _common_1.parserWrite)(this.valueParser, buffer[index], cursor));
            return buffers;
        }
        else
            for (let index = 0; index < this.length; index++)
                (0, _common_1.parserWrite)(this.valueParser, buffer, cursor, value && value[index], message);
    }
}
exports.default = FixedLengthArray;
//# sourceMappingURL=array-fixed.js.map