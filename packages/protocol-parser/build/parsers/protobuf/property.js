"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const property_1 = require("../property");
class Property extends property_1.default {
    wireType;
    constructor(name, wireType, parser) {
        super(name, parser);
        this.wireType = wireType;
    }
}
exports.default = Property;
//# sourceMappingURL=property.js.map