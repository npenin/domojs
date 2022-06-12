"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../../core");
const _common_1 = require("../_common");
class PackedProperty {
    name;
    wireType;
    parser;
    constructor(name, wireType, parser) {
        this.name = name;
        this.wireType = wireType;
        this.parser = parser;
        this.length = parser.length;
    }
    length;
    read(buffer, cursor, message) {
        var result = message[this.name];
        if (typeof result == 'undefined')
            message[this.name] = this.parser.read(buffer, cursor, message);
        else {
            if (!Array.isArray(result))
                message[this.name] = [result];
            result.push(this.parser.read(buffer, cursor, message));
            return result;
        }
        return message[this.name];
    }
    write(buffer, cursor, value, message) {
        if (!(cursor instanceof _common_1.Cursor))
            message = cursor;
        if (!(core_1.Buffer.isBuffer(buffer)))
            value = buffer;
        if (typeof value === 'undefined')
            return null;
        var buffers = [];
        if (message) {
            const value = message[this.name];
            if (Array.isArray(value))
                for (var v in value)
                    (0, core_1.multiPush)(buffers, (0, _common_1.parserWrite)(this.parser, value[v], value[v]));
            else if (typeof (value) === 'undefined')
                return null;
            else
                return (0, _common_1.parserWrite)(this.parser, value, value);
        }
        return buffers;
    }
}
exports.default = PackedProperty;
//# sourceMappingURL=packed-property.js.map