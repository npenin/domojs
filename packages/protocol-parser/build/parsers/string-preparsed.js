"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../core");
class PreparsedString {
    lengthProperty;
    encoding;
    constructor(lengthProperty, encoding = 'ascii') {
        this.lengthProperty = lengthProperty;
        this.encoding = encoding;
    }
    length = -1;
    read(buffer, cursor, message) {
        if (cursor.subByteOffset > 0)
            throw new Error('Cross byte value are not supported');
        var value = buffer.toString(this.encoding, cursor.offset, cursor.offset + Number(message[this.lengthProperty]));
        cursor.offset += this.length;
        return value;
    }
    write(value, message) {
        var buffers = [];
        buffers.push(core_1.Buffer.from(value, this.encoding).slice(0, Number(message[this.lengthProperty])));
        return buffers;
    }
}
exports.default = PreparsedString;
//# sourceMappingURL=string-preparsed.js.map