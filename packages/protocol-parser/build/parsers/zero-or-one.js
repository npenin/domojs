"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZeroOrOne = void 0;
const core_1 = require("../core");
const _common_1 = require("./_common");
class ZeroOrOne {
    parser;
    constructor(parser) {
        this.parser = parser;
        this.length = parser.length;
    }
    read(buffer, cursor, partial) {
        if (buffer.length > cursor.offset)
            return this.parser.read(buffer, cursor, partial);
        return undefined;
    }
    write(buffer, cursor, value, message) {
        if (!core_1.Buffer.isBuffer(buffer))
            value = buffer;
        if (typeof (value) === 'undefined')
            return;
        return (0, _common_1.parserWrite)(this.parser, buffer, cursor, value, message);
    }
    length;
}
exports.ZeroOrOne = ZeroOrOne;
//# sourceMappingURL=zero-or-one.js.map