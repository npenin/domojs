"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../core");
const _common_1 = require("./_common");
class PrefixedBuffer {
    prefix;
    constructor(prefix) {
        this.prefix = prefix;
    }
    length = -1;
    read(buffer, cursor) {
        if (cursor.subByteOffset > 0)
            throw new Error('Cross byte value are not supported');
        var length = this.prefix.read(buffer, cursor);
        return buffer.slice(cursor.offset, cursor.offset + length);
    }
    write(value) {
        var buffers = [];
        (0, core_1.multiPush)(buffers, (0, _common_1.parserWrite)(this.prefix, value.length));
        buffers.push(value);
        return buffers;
    }
}
exports.default = PrefixedBuffer;
//# sourceMappingURL=buffer-prefixed.js.map