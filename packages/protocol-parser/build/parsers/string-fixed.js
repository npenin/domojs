"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../core");
class FixedString {
    length;
    encoding;
    constructor(length, encoding = 'ascii') {
        this.length = length;
        this.encoding = encoding;
    }
    read(buffer, cursor) {
        if (cursor.subByteOffset > 0)
            throw new Error('Cross byte value are not supported');
        if (this.length === -1)
            return buffer.toString(this.encoding, cursor.offset);
        return buffer.toString(this.encoding, cursor.offset, cursor.offset + this.length);
    }
    write(buffer, cursor, value) {
        if (value && this.length && value.length != this.length)
            throw new Error(`string length (${value.length}) is not matching with expected length (${this.length})`);
        if (cursor && cursor.subByteOffset > 0)
            throw new Error('Cross byte value are not supported');
        if (typeof (buffer) === 'string')
            return [core_1.Buffer.from(buffer, this.encoding)];
        else if (cursor)
            cursor.offset += buffer.write(value || '', cursor.offset, this.length, this.encoding);
    }
}
exports.default = FixedString;
//# sourceMappingURL=string-fixed.js.map