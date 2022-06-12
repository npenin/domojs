"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../core");
const _common_1 = require("./_common");
class PrefixedLengthSeries {
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
        return this.valueParser.read(buffer.slice(0, length), cursor, message);
    }
    write(value, message) {
        var valueBuffers = core_1.Buffer.concat((0, _common_1.parserWrite)(this.valueParser, value, message));
        var buffers = [];
        (0, core_1.multiPush)(buffers, (0, _common_1.parserWrite)(this.prefix, valueBuffers.length, message));
        buffers.push(valueBuffers);
        return buffers;
    }
}
exports.default = PrefixedLengthSeries;
//# sourceMappingURL=series-prefixed.js.map