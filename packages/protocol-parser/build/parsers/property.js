"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _common_1 = require("./_common");
class Property {
    name;
    parser;
    constructor(name, parser) {
        this.name = name;
        this.parser = parser;
        this.length = parser.length;
    }
    length;
    read(buffer, cursor, message) {
        const result = this.parser.read(buffer, cursor, message[this.name]);
        message[this.name] = result;
        return result;
    }
    write(buffer, cursor, value, message) {
        if (!(cursor instanceof _common_1.Cursor))
            return (0, _common_1.parserWrite)(this.parser, cursor && cursor[this.name], cursor);
        return (0, _common_1.parserWrite)(this.parser, buffer, cursor, message && message[this.name], message);
    }
}
exports.default = Property;
//# sourceMappingURL=property.js.map