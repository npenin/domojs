"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Conditional = void 0;
const _common_1 = require("./_common");
class Conditional {
    condition;
    parser;
    constructor(condition, parser) {
        this.condition = condition;
        this.parser = parser;
        this.length = parser.length;
    }
    read(buffer, cursor, partial) {
        if (this.condition(partial))
            return this.parser.read(buffer, cursor, partial);
        return undefined;
    }
    write(buffer, cursor, value, message) {
        if (this.condition(message))
            return (0, _common_1.parserWrite)(this.parser, buffer, cursor, value, message);
    }
    length;
}
exports.Conditional = Conditional;
//# sourceMappingURL=conditional-parser.js.map