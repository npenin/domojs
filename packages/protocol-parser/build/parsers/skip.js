"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Skip {
    length;
    constructor(length) {
        this.length = length;
    }
    read(_buffer, cursor) {
        cursor.offset += this.length;
        return undefined;
    }
    write(_buffer, cursor) {
        cursor.offset += this.length;
    }
}
exports.default = Skip;
//# sourceMappingURL=skip.js.map