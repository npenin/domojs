"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../core");
const _common_1 = require("./_common");
class PrefixedString {
    prefix;
    encoding;
    constructor(prefix, encoding = 'ascii') {
        this.prefix = prefix;
        this.encoding = encoding;
    }
    length = -1;
    read(buffer, cursor) {
        if (cursor.subByteOffset > 0)
            throw new Error('Cross byte value are not supported');
        var length = this.prefix.read(buffer, cursor);
        var value = buffer.toString(this.encoding, cursor.offset, cursor.offset + length);
        cursor.offset += length;
        return value;
    }
    write(value) {
        var buffers = [];
        buffers.push(...(0, _common_1.parserWrite)(this.prefix, value.length));
        buffers.push(core_1.Buffer.from(value, this.encoding));
        return buffers;
    }
}
exports.default = PrefixedString;
//# sourceMappingURL=string-prefixed.js.map