"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _common_1 = require("./_common");
class Sequence {
    parsers;
    constructor(...parsers) {
        this.parsers = parsers;
        for (const parser of parsers) {
            if (parser.length == -1) {
                this.length = -1;
                break;
            }
            this.length += parser.length;
        }
    }
    length = -1;
    read(buffer, cursor, message) {
        var result = [];
        for (const parser of this.parsers) {
            result.push(parser.read(buffer, cursor, message));
        }
        return result;
    }
    write(value, message) {
        var buffers = [];
        for (let index = 0; index < value.length; index++)
            buffers.push(...(0, _common_1.parserWrite)(this.parsers[index], value[index], message));
        return buffers;
    }
}
exports.default = Sequence;
//# sourceMappingURL=sequence.js.map