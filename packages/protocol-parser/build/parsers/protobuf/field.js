"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Field = void 0;
const uint3_1 = require("../uint3");
const uint5_1 = require("../uint5");
class Field {
    length = 1;
    read(buffer, cursor) {
        var wireType = uint3_1.default.prototype.read(buffer, cursor);
        var fieldId = uint5_1.default.prototype.read(buffer, cursor);
        var wireTypeString;
        switch (wireType) {
            case 0:
                wireTypeString = 'varint';
                break;
            case 1:
                wireTypeString = '64-bit';
                break;
            case 2:
                wireTypeString = 'length-delimited';
                break;
            case 3:
                wireTypeString = 'start-group';
                break;
            case 4:
                wireTypeString = 'end-group';
                break;
            case 5:
                wireTypeString = '32-bit';
                break;
            default:
                throw new Error('unsupported wire type: ' + wireType);
        }
        return { fieldId, type: wireTypeString };
    }
    write(buffer, cursor, value) {
        switch (value.type) {
            case 'varint':
                uint3_1.default.prototype.write(buffer, cursor, 0);
                break;
            case '64-bit':
                uint3_1.default.prototype.write(buffer, cursor, 1);
                break;
            case 'length-delimited':
                uint3_1.default.prototype.write(buffer, cursor, 2);
                break;
            case 'start-group':
                uint3_1.default.prototype.write(buffer, cursor, 3);
                break;
            case 'end-group':
                uint3_1.default.prototype.write(buffer, cursor, 4);
                break;
            case '32-bit':
                uint3_1.default.prototype.write(buffer, cursor, 5);
                break;
            default:
                var x = value.type;
                throw new Error('Not supported');
        }
        uint5_1.default.prototype.write(buffer, cursor, value.fieldId);
    }
}
exports.Field = Field;
//# sourceMappingURL=field.js.map