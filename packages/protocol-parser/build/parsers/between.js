"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const series_1 = require("./series");
const _common_1 = require("./_common");
class Between extends series_1.default {
    constructor(start, parser, end) {
        super(start, parser, end);
    }
    read(buffer, cursor, message) {
        const newCursor = new _common_1.Cursor();
        this.parsers[0].read(buffer, cursor, message);
        this.parsers[1].read(buffer.slice(cursor.offset, buffer.length - this.parsers[2].length), newCursor, message);
        cursor.offset += newCursor.offset;
        this.parsers[2].read(buffer, cursor, message);
        return message;
    }
    write(buffer, cursor, value, message) {
        return super.write(buffer, cursor, value, message);
    }
}
exports.default = Between;
//# sourceMappingURL=between.js.map