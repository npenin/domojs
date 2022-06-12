"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnknownMessage = void 0;
const core_1 = require("../../core");
const _common_1 = require("../_common");
const field_1 = require("./field");
// type ProtobufParser<TMessage, T = any> = ParserWithMessage<T, TMessage> & { wireType: WireType };
const field = new field_1.Field();
class Message {
    parsers;
    wireType;
    constructor(...parsers) {
        this.parsers = parsers;
    }
    length = -1;
    read(buffer, cursor, message) {
        if (typeof (message) == 'undefined')
            message = {};
        while (cursor.offset < buffer.length) {
            var parsedField = field.read(buffer, cursor);
            var property = this.parsers[parsedField.fieldId - 1];
            // cursor.offset = offset;
            if (property.wireType !== parsedField.type)
                throw new Error(`wire type in model does not match with the wire type received for field ${parsedField.fieldId} (expectedType=${property.wireType}, actualType=${parsedField.type})`);
            property.read(buffer, cursor, message);
        }
        return message;
        // switch (parsedField.type)
        // {
        //     case 'varint':
        //         message[property.name] = varint.read(buffer, cursor) as any;
        //         break;
        //     case '64-bit':
        //         message[property.name] = Uint64LE.prototype.read(buffer, cursor) as any;
        //         break;
        //     case 'length-delimited':
        //         message[property.name] = prefixedBuffer.read(buffer, cursor) as any;
        //         break;
        //     case '32-bit':
        //         message[property.name] = buffer.readFloatLE(cursor.offset) as any;
        //         cursor.offset += 4;
        //         break;
        // }
        // return message;
    }
    write(value) {
        var result = [];
        for (let fieldId = 0; fieldId < this.parsers.length; fieldId++) {
            const fieldParser = this.parsers[fieldId];
            var valueBuffers = (0, _common_1.parserWrite)(fieldParser, value, value);
            if (valueBuffers !== null) {
                var fieldDefinition = core_1.Buffer.alloc(1);
                result.push(fieldDefinition);
                field.write(fieldDefinition, new _common_1.Cursor(), { fieldId: fieldId + 1, type: fieldParser.wireType });
                result.push(...valueBuffers);
            }
            // let buffer: Buffer;
            // if (typeof (value) !== 'undefined')
            // {
            //     switch (fieldParser.wireType)
            //     {
            //         case 'varint':
            //             result.push(...varint.write(value[field.name] as any));
            //             break;
            //         case '64-bit':
            //             buffer = new Buffer(8);
            //             Uint64LE.prototype.write(buffer, new Cursor(), value[field.name] as any);
            //             break;
            //         case 'length-delimited':
            //             if (!Buffer.isBuffer(value[field.name]))
            //                 prefixedBuffer.write(Buffer.from(value[field.name] as any));
            //             else
            //                 prefixedBuffer.write(value[field.name] as any);
            //             break;
            //         case '32-bit':
            //             buffer = new Buffer(4);
            //             Uint64LE.prototype.write(buffer, new Cursor(), value[field.name] as any);
            //             break;
            //     }
            // }
        }
        return result;
    }
}
exports.default = Message;
class UnknownMessage {
    varint;
    raw;
    bit32;
    bit64;
    wireType;
    constructor(varint, raw, bit32, bit64) {
        this.varint = varint;
        this.raw = raw;
        this.bit32 = bit32;
        this.bit64 = bit64;
    }
    length = -1;
    read(buffer, cursor, message) {
        if (typeof (message) == 'undefined')
            message = {};
        while (cursor.offset < buffer.length) {
            var parsedField = field.read(buffer, cursor);
            var value;
            switch (parsedField.type) {
                case '32-bit':
                    value = this.bit32.read(buffer, cursor);
                    break;
                case '64-bit':
                    value = this.bit64.read(buffer, cursor);
                    break;
                case 'end-group':
                case 'start-group':
                case 'length-delimited':
                    value = this.raw.read(buffer, cursor, message);
                    break;
                case 'varint':
                    value = this.varint.read(buffer, cursor);
                    break;
                default:
                    var x = parsedField.type;
                    break;
            }
            if (Array.isArray(message[parsedField.fieldId]))
                message[parsedField.fieldId].push(value);
            else if (typeof message[parsedField.fieldId] != 'undefined')
                message[parsedField.fieldId] = [message[parsedField.fieldId], value];
            else
                message[parsedField.fieldId] = value;
        }
        return message;
    }
    write(value) {
        var result = [];
        // for (let fieldId = 0; fieldId < this.parsers.length; fieldId++)
        // {
        //     const fieldParser = this.parsers[fieldId];
        //     var valueBuffers = parserWrite(fieldParser, value, value);
        //     if (valueBuffers !== null)
        //     {
        //         var fieldDefinition = new Buffer(1);
        //         result.push(fieldDefinition);
        //         field.write(fieldDefinition, new Cursor(), { fieldId: fieldId + 1, type: fieldParser.wireType });
        //         result.push(...valueBuffers);
        //     }
        //     // let buffer: Buffer;
        //     // if (typeof (value) !== 'undefined')
        //     // {
        //     //     switch (fieldParser.wireType)
        //     //     {
        //     //         case 'varint':
        //     //             result.push(...varint.write(value[field.name] as any));
        //     //             break;
        //     //         case '64-bit':
        //     //             buffer = new Buffer(8);
        //     //             Uint64LE.prototype.write(buffer, new Cursor(), value[field.name] as any);
        //     //             break;
        //     //         case 'length-delimited':
        //     //             if (!Buffer.isBuffer(value[field.name]))
        //     //                 prefixedBuffer.write(Buffer.from(value[field.name] as any));
        //     //             else
        //     //                 prefixedBuffer.write(value[field.name] as any);
        //     //             break;
        //     //         case '32-bit':
        //     //             buffer = new Buffer(4);
        //     //             Uint64LE.prototype.write(buffer, new Cursor(), value[field.name] as any);
        //     //             break;
        //     //     }
        //     // }
        // }
        return result;
    }
}
exports.UnknownMessage = UnknownMessage;
//# sourceMappingURL=message.js.map