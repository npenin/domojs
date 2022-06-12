"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _common_1 = require("./_common");
class Switch {
    name;
    parsers;
    constructor(name, parsers) {
        this.name = name;
        this.parsers = parsers;
    }
    register(key, parser) {
        if (key in this.parsers)
            throw new Error('a parser for ' + key + ' is already registered');
        this.parsers[key] = parser;
    }
    length = -1;
    read(buffer, cursor, message) {
        var parser = this.parsers[message[this.name]];
        if (!parser)
            throw new Error(`No parser could be found for ${this.name} in ${JSON.stringify(message)}`);
        return parser.read(buffer, cursor, message);
    }
    write(value, message) {
        if (typeof (message) == 'undefined')
            throw new Error('no message was provided');
        var parser = this.parsers[message[this.name]];
        if (!parser)
            throw new Error(`No parser could be found for ${this.name} in ${JSON.stringify(value)}`);
        return (0, _common_1.parserWrite)(parser, value, message);
    }
}
exports.default = Switch;
//# sourceMappingURL=switch.js.map