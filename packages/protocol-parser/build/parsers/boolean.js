"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Boolean {
    parser;
    constructor(parser) {
        this.parser = parser;
        this.length = parser.length;
    }
    length;
    read(buffer, cursor) {
        return this.parser.read(buffer, cursor) === 1;
    }
    write(buffer, cursor, value) {
        return this.parser.write(buffer, cursor, value && 1 || 0);
    }
}
exports.default = Boolean;
//# sourceMappingURL=boolean.js.map