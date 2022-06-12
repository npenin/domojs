"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parserWrite = exports.hasUnknownLength = exports.Cursor = void 0;
const core_1 = require("../core");
class Cursor {
    _offset = 0;
    _floorOffset = 0;
    _subByteOffset = 0;
    get offset() { return this._offset; }
    ;
    set offset(value) {
        this._offset = value;
        this._floorOffset = Math.floor(value);
        this._subByteOffset = (value - this._floorOffset) * 8;
    }
    ;
    get floorOffset() { return this._floorOffset; }
    ;
    get subByteOffset() { return this._subByteOffset; }
    ;
    freeze() {
        var c = new Cursor();
        c._floorOffset = this._floorOffset;
        c._subByteOffset = this._subByteOffset;
        c._offset = this._offset;
        return c;
    }
}
exports.Cursor = Cursor;
// type IsCursor<T> = (cursor: Cursor | T) => boolean;
function hasUnknownLength(p) {
    return p.length == -1;
}
exports.hasUnknownLength = hasUnknownLength;
function parserWrite(parser, buffer, cursor, value, message) {
    if (core_1.Buffer.isBuffer(buffer) && cursor instanceof Cursor)
        if (hasUnknownLength(parser)) {
            if (!(cursor instanceof Cursor))
                throw new Error('no cursor was provided');
            const dataview = buffer;
            parser.write(value, message).forEach(b => { b.copy(buffer, cursor.offset); cursor.offset += b.length; });
        }
        else {
            if (!(cursor instanceof Cursor))
                throw new Error('no cursor was provided');
            parser.write(buffer, cursor, value, message);
        }
    else {
        message = cursor;
        value = buffer;
        if (hasUnknownLength(parser))
            return parser.write(value, message);
        else {
            buffer = core_1.Buffer.alloc(Math.ceil(parser.length));
            parser.write(buffer, new Cursor(), value, message);
            return [buffer];
        }
    }
}
exports.parserWrite = parserWrite;
//# sourceMappingURL=_common.js.map