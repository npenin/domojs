"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const series_1 = require("./series");
class ObjectParser extends series_1.default {
    maps;
    constructor(...parsers) {
        super(...parsers);
    }
    read(buffer, cursor, message) {
        var result = message || new Map();
        return super.read(buffer, cursor, result);
    }
    write(buffer, cursor, value, message) {
        return super.write(buffer, cursor, value, message);
    }
}
exports.default = ObjectParser;
//# sourceMappingURL=object.js.map