"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sub = void 0;
const _common_1 = require("./_common");
class Sub {
    lengthParser;
    inner;
    constructor(lengthParser, inner) {
        this.lengthParser = lengthParser;
        this.inner = inner;
        if (inner.length == -1 || lengthParser.length == -1)
            this.length = -1;
        else
            this.length = inner.length + lengthParser.length;
    }
    length = -1;
    read(buffer, cursor, message) {
        const initialOffset = cursor.offset;
        var length = this.lengthParser.read(buffer, cursor, message);
        if (buffer.length < cursor.offset + length) {
            cursor.offset = initialOffset;
            return null;
        }
        var result = this.inner.read(buffer.slice(cursor.offset, cursor.offset + length), new _common_1.Cursor(), {});
        cursor.offset += length;
        return result;
    }
    write(buffer, cursor, value, message) {
        if (!(cursor instanceof _common_1.Cursor)) {
            var buffers = (0, _common_1.parserWrite)(this.inner, buffer, cursor);
            if (buffers) {
                buffers.unshift(...(0, _common_1.parserWrite)(this.lengthParser, buffers.reduce((previous, current) => previous + current.length, 0), cursor));
            }
            return buffers;
        }
        var buffers = (0, _common_1.parserWrite)(this.inner, value, message);
        if (buffers) {
            buffers.unshift(...(0, _common_1.parserWrite)(this.lengthParser, buffers.reduce((previous, current) => previous + current.length, 0), message));
        }
        return buffers;
    }
}
exports.Sub = Sub;
//# sourceMappingURL=sub.js.map