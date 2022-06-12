"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.length = void 0;
exports.length = .125;
class Bit {
    constructor() {
    }
    length = exports.length;
    read(buffer, cursor) {
        var currentValue = buffer.readUInt8(cursor.floorOffset);
        var subByteOffset = cursor.subByteOffset;
        let value;
        switch (subByteOffset) {
            case 0:
                value = currentValue & 0b00000001;
                break;
            case 1:
                value = (currentValue & 0b00000010) >> subByteOffset;
                break;
            case 2:
                value = (currentValue & 0b00000100) >> subByteOffset;
                break;
            case 3:
                value = (currentValue & 0b00001000) >> subByteOffset;
                break;
            case 4:
                value = (currentValue & 0b00010000) >> subByteOffset;
                break;
            case 5:
                value = (currentValue & 0b00100000) >> subByteOffset;
                break;
            case 6:
                value = (currentValue & 0b01000000) >> subByteOffset;
                break;
            case 7:
                value = (currentValue & 0b10000000) >> subByteOffset;
                break;
            default:
                throw new Error('Invalid subbyte offset');
        }
        ;
        cursor.offset += exports.length;
        return value;
    }
    write(buffer, cursor, value) {
        var currentValue = buffer.readUInt8(cursor.floorOffset);
        var numberValue = (value & 1) << cursor.subByteOffset;
        buffer.writeUInt8(currentValue | numberValue, cursor.floorOffset);
        cursor.offset += exports.length;
    }
}
exports.default = Bit;
//# sourceMappingURL=bit.js.map