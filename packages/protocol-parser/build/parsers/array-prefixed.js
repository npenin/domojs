"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../core");
const _common_1 = require("./_common");
class PrefixedLengthArray {
    prefix;
    valueParser;
    constructor(prefix, valueParser) {
        this.prefix = prefix;
        this.valueParser = valueParser;
    }
    length = -1;
    read(buffer, cursor, message) {
        if (cursor.subByteOffset > 0)
            throw new Error('Cross byte value are not supported');
        var length = this.prefix.read(buffer, cursor);
        var result = new Array(length);
        for (let index = 0; index < length; index++)
            result[index] = this.valueParser.read(buffer, cursor, message);
        return result;
    }
    write(value, message) {
        var buffers = [];
        (0, core_1.multiPush)(buffers, (0, _common_1.parserWrite)(this.prefix, value.length, message));
        for (let index = 0; index < value.length; index++)
            (0, core_1.multiPush)(buffers, (0, _common_1.parserWrite)(this.valueParser, value[index], message));
        return buffers;
    }
}
exports.default = PrefixedLengthArray;
//# sourceMappingURL=array-prefixed.js.map