"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debug = exports.string = exports.message = exports.object = exports.property = exports.root = exports.sub = exports.packed = exports.Varint = exports.Sub = exports.Message = exports.int64 = exports.int32 = exports.raw = exports.varint = void 0;
const buffer_prefixed_1 = require("../buffer-prefixed");
const string_1 = require("./string");
const array_fixed_1 = require("../array-fixed");
const uint32_1 = require("../uint32");
const uint64_1 = require("../uint64");
const property_1 = require("./property");
const message_1 = require("./message");
exports.Message = message_1.default;
const sub_1 = require("./sub");
Object.defineProperty(exports, "Sub", { enumerable: true, get: function () { return sub_1.Sub; } });
const varint_1 = require("./varint");
exports.Varint = varint_1.default;
const zero_or_one_1 = require("../zero-or-one");
exports.varint = new varint_1.default();
exports.raw = Object.assign(new buffer_prefixed_1.default(exports.varint), { wireType: 'length-delimited' });
exports.int32 = Object.assign(new uint32_1.default(), { wireType: '32-bit' });
exports.int64 = Object.assign(new uint64_1.default(), { wireType: '64-bit' });
function packed(name, parser) {
    return property(name, 'length-delimited', new sub_1.Sub(exports.varint, new array_fixed_1.default(-1, parser)));
}
exports.packed = packed;
function sub(parser) {
    return new sub_1.Sub(exports.varint, parser);
}
exports.sub = sub;
/**
 * Ensures the first 4 bytes are an int32 informing about the message length
 * @param parser
 * @returns
 */
function root(parser) {
    return new sub_1.Sub(exports.int32, parser);
}
exports.root = root;
function property(name, wireType, parser) {
    if (typeof wireType !== 'string') {
        parser = wireType;
        wireType = wireType.wireType;
    }
    return new property_1.default(name, wireType, new zero_or_one_1.ZeroOrOne(parser));
}
exports.property = property;
function object(...parsers) {
    return new message_1.default(...parsers);
}
exports.object = object;
/**
 * This a a shortcut for root(object(parsers))
 * @param parsers
 * @returns
 */
function message(...parsers) {
    return root(object(...parsers));
}
exports.message = message;
function string(encoding) {
    return new string_1.default(exports.varint, encoding);
}
exports.string = string;
exports.debug = new message_1.UnknownMessage(exports.varint, string(), exports.int32, exports.int64);
//# sourceMappingURL=index.js.map