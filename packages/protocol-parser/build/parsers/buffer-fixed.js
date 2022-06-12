"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FixedBuffer {
    length;
    constructor(length) {
        this.length = length;
    }
    read(buffer, cursor) {
        if (cursor.subByteOffset > 0)
            throw new Error('Cross byte value are not supported');
        return buffer.slice(cursor.offset, cursor.offset + this.length);
    }
    write(buffer, cursor, value) {
        value.copy(buffer, cursor.offset, 0, this.length);
    }
}
exports.default = FixedBuffer;
//# sourceMappingURL=buffer-fixed.js.map