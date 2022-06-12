"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _common_1 = require("./_common");
class SwitchProperty {
    name;
    assignProperty;
    parsers;
    constructor(name, assignProperty, parsers) {
        this.name = name;
        this.assignProperty = assignProperty;
        this.parsers = parsers;
    }
    length = -1;
    read(buffer, cursor, message) {
        var parser = this.parsers[message[this.name]];
        if (!parser)
            throw new Error(`No parser could be found for ${this.name} in ${JSON.stringify(message)}`);
        message[this.assignProperty] = message[this.assignProperty] || {};
        return message[this.assignProperty] = parser.read(buffer, cursor, message[this.assignProperty]);
    }
    write(value, message) {
        if (typeof (message) == 'undefined')
            throw new Error('no message was provided');
        var parser = this.parsers[message[this.name]];
        if (!parser)
            throw new Error(`No parser could be found for ${this.name} in ${JSON.stringify(value)}`);
        return (0, _common_1.parserWrite)(parser, value, message[this.assignProperty]);
    }
    register(value, parser) {
        if (typeof (this.parsers[value]) !== 'undefined')
            throw new Error('a parser is already registered for value ' + value.toString());
        this.parsers[value] = parser;
    }
}
exports.default = SwitchProperty;
//# sourceMappingURL=property-switch.js.map