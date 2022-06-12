"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Prepare = void 0;
const _common_1 = require("./_common");
class Prepare {
    prepareMessage;
    parser;
    constructor(prepareMessage, parser) {
        this.prepareMessage = prepareMessage;
        this.parser = parser;
        this.length = parser.length;
    }
    length;
    read(buffer, cursor, message) {
        return this.parser.read(buffer, cursor, message);
    }
    write(buffer, cursor, value, message) {
        this.prepareMessage(value);
        return (0, _common_1.parserWrite)(this.parser, buffer, cursor, value, message);
    }
}
exports.Prepare = Prepare;
//# sourceMappingURL=prepare.js.map