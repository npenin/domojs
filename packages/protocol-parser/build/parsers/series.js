"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../core");
const _common_1 = require("./_common");
class Series {
    parsers;
    lengths = [];
    constructor(...parsers) {
        this.parsers = parsers;
        for (const parser in parsers)
            this.lengths.push(parsers[parser].length);
        this.length = this.lengths.reduce((previous, current) => {
            if (previous == -1)
                return -1;
            if (current == -1)
                return -1;
            return current + previous;
        }, 0);
    }
    length;
    read(buffer, cursor, message) {
        for (const parser in this.parsers) {
            this.parsers[parser].read(buffer, cursor, message);
        }
        return message;
    }
    write(buffer, cursor, value, message) {
        if (core_1.Buffer.isBuffer(buffer) && cursor instanceof _common_1.Cursor) {
            for (let index = 0; index < this.parsers.length; index++)
                (0, _common_1.parserWrite)(this.parsers[index], buffer, cursor, value, message);
            return [];
        }
        value = buffer;
        message = cursor;
        if (this.length > -1) {
            buffer = core_1.Buffer.alloc(Math.ceil(this.length));
            this.write(buffer, new _common_1.Cursor(), value, message);
            return [buffer];
        }
        var buffers = [];
        for (let index = 0; index < this.parsers.length; index++) {
            (0, core_1.multiPush)(buffers, (0, _common_1.parserWrite)(this.parsers[index], value, message || value));
        }
        return buffers;
        // if ()
        //     var buffers: Buffer[] = [];
        // for (let index = 0; index < this.parsers.length; index++)
        //     buffers.push(...parserWrite(this.parsers[index], value, message));
        // return buffers;
    }
}
exports.default = Series;
//# sourceMappingURL=series.js.map