"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const string_prefixed_1 = require("../string-prefixed");
class String extends string_prefixed_1.default {
    wireType = 'length-delimited';
    constructor(parser, encoding) {
        super(parser, encoding);
    }
}
exports.default = String;
//# sourceMappingURL=string.js.map