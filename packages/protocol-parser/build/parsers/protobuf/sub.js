"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sub = void 0;
const sub_1 = require("../sub");
class Sub extends sub_1.Sub {
    constructor(lengthParser, inner) {
        super(lengthParser, inner);
    }
    wireType = 'length-delimited';
}
exports.Sub = Sub;
//# sourceMappingURL=sub.js.map