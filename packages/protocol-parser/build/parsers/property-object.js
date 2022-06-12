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
        var result;
        if (message && message[this.name])
            result = message[this.name];
        else
            result = {};
        return message[this.name] = this.parser.read(buffer, cursor, result);
    }
    write(buffer, cursor, value, message) {
        if (!(cursor instanceof _common_1.Cursor))
            return (0, _common_1.parserWrite)(this.parser, cursor && cursor[this.name], cursor && cursor[this.name]);
        return (0, _common_1.parserWrite)(this.parser, buffer, cursor, message && message[this.name], message && message[this.name]);
    }
}
exports.default = Property;
//# sourceMappingURL=property-object.js.map