"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.object = exports.array = exports.buffer = exports.string = exports.boolean = exports.sub = exports.skip = exports.Between = exports.Series = exports.Sequence = exports.Array = exports.FixedString = exports.String = exports.VuintLE = exports.Vuint = exports.Uint64LE = exports.Uint32LE = exports.Uint24LE = exports.Uint16LE = exports.Uint64 = exports.Uint32 = exports.Uint24 = exports.Uint16 = exports.Uint8 = exports.Uint7 = exports.Uint6 = exports.Uint5 = exports.Uint4 = exports.Uint3 = exports.Uint2 = exports.Bit = exports.vuintLE = exports.vuint = exports.uint64LE = exports.uint32LE = exports.uint24LE = exports.uint16LE = exports.uint64 = exports.uint32 = exports.uint24 = exports.uint16 = exports.uint8 = exports.uint7 = exports.uint6 = exports.uint5 = exports.uint4 = exports.uint3 = exports.uint2 = exports.bit = exports.protobuf = void 0;
exports.prepare = exports.complexProperty = exports.property = exports.condition = exports.optional = exports.chooseProperty = exports.choose = exports.prefixedSeries = exports.series = void 0;
const bit_1 = require("./bit");
exports.Bit = bit_1.default;
const boolean_1 = require("./boolean");
const uint2_1 = require("./uint2");
exports.Uint2 = uint2_1.default;
const uint3_1 = require("./uint3");
exports.Uint3 = uint3_1.default;
const uint4_1 = require("./uint4");
exports.Uint4 = uint4_1.default;
const uint5_1 = require("./uint5");
exports.Uint5 = uint5_1.default;
const uint6_1 = require("./uint6");
exports.Uint6 = uint6_1.default;
const uint7_1 = require("./uint7");
exports.Uint7 = uint7_1.default;
const uint8_1 = require("./uint8");
exports.Uint8 = uint8_1.default;
const uint16_1 = require("./uint16");
exports.Uint16 = uint16_1.default;
const uint24_1 = require("./uint24");
exports.Uint24 = uint24_1.default;
const uint32_1 = require("./uint32");
exports.Uint32 = uint32_1.default;
const uint64_1 = require("./uint64");
exports.Uint64 = uint64_1.default;
const uint16LE_1 = require("./uint16LE");
exports.Uint16LE = uint16LE_1.default;
const uint24LE_1 = require("./uint24LE");
exports.Uint24LE = uint24LE_1.default;
const uint32LE_1 = require("./uint32LE");
exports.Uint32LE = uint32LE_1.default;
const uint64LE_1 = require("./uint64LE");
exports.Uint64LE = uint64LE_1.default;
const vuint_1 = require("./vuint");
exports.Vuint = vuint_1.default;
const vuintLE_1 = require("./vuintLE");
exports.VuintLE = vuintLE_1.default;
const string_prefixed_1 = require("./string-prefixed");
exports.String = string_prefixed_1.default;
const string_fixed_1 = require("./string-fixed");
exports.FixedString = string_fixed_1.default;
const string_preparsed_1 = require("./string-preparsed");
const array_prefixed_1 = require("./array-prefixed");
exports.Array = array_prefixed_1.default;
const array_fixed_1 = require("./array-fixed");
const array_preparsed_1 = require("./array-preparsed");
const skip_1 = require("./skip");
const buffer_prefixed_1 = require("./buffer-prefixed");
const buffer_fixed_1 = require("./buffer-fixed");
const object_1 = require("./object");
const switch_1 = require("./switch");
const property_switch_1 = require("./property-switch");
const sequence_1 = require("./sequence");
exports.Sequence = sequence_1.default;
const series_1 = require("./series");
exports.Series = series_1.default;
const series_prefixed_1 = require("./series-prefixed");
const property_1 = require("./property");
const property_object_1 = require("./property-object");
const prepare_1 = require("./prepare");
const zero_or_one_1 = require("./zero-or-one");
const between_1 = require("./between");
exports.Between = between_1.default;
const protobuf = require("./protobuf");
exports.protobuf = protobuf;
const sub_1 = require("./sub");
const conditional_parser_1 = require("./conditional-parser");
exports.bit = new bit_1.default();
exports.uint2 = new uint2_1.default();
exports.uint3 = new uint3_1.default();
exports.uint4 = new uint4_1.default();
exports.uint5 = new uint5_1.default();
exports.uint6 = new uint6_1.default();
exports.uint7 = new uint7_1.default();
exports.uint8 = new uint8_1.default();
exports.uint16 = new uint16_1.default();
exports.uint24 = new uint24_1.default();
exports.uint32 = new uint32_1.default();
exports.uint64 = new uint64_1.default();
exports.uint16LE = new uint16LE_1.default();
exports.uint24LE = new uint24LE_1.default();
exports.uint32LE = new uint32LE_1.default();
exports.uint64LE = new uint64LE_1.default();
exports.vuint = new vuint_1.default();
exports.vuintLE = new vuintLE_1.default();
function skip(length) {
    return new skip_1.default(length);
}
exports.skip = skip;
function sub(length, inner) {
    return new sub_1.Sub(length, inner);
}
exports.sub = sub;
function boolean(parser) {
    return new boolean_1.default(parser || exports.bit);
}
exports.boolean = boolean;
function string(length, encoding) {
    if (typeof (length) === 'number')
        return new string_fixed_1.default(length, encoding);
    if (typeof (length) === 'string' || typeof (length) === 'symbol')
        return new string_preparsed_1.default(length, encoding);
    return new string_prefixed_1.default(length, encoding);
}
exports.string = string;
function buffer(length) {
    if (typeof length == 'number')
        return new buffer_fixed_1.default(length);
    return new buffer_prefixed_1.default(length);
}
exports.buffer = buffer;
function array(length, value) {
    if (typeof (length) === 'number')
        return new array_fixed_1.default(length, value);
    if (typeof (length) === 'string' || typeof length === 'symbol')
        return new array_preparsed_1.default(length, value);
    return new array_prefixed_1.default(length, value);
}
exports.array = array;
function object(...maps) {
    var mapTriaged = [];
    var lastKnowsLength;
    maps.forEach((parser) => {
        if (typeof (lastKnowsLength) == 'undefined' || lastKnowsLength !== (parser.length !== -1)) {
            mapTriaged.push([]);
            lastKnowsLength = parser.length !== -1;
        }
        mapTriaged[mapTriaged.length - 1].push(parser);
    });
    if (mapTriaged.length == 1)
        return new object_1.default(...maps);
    return new object_1.default(...mapTriaged.map(map => new series_1.default(...map)));
}
exports.object = object;
function seriesOrSingle(...map) {
    if (map.length == 1)
        return map[0];
    return new series_1.default(...map);
}
function series(...maps) {
    var mapTriaged = [];
    var lastKnowsLength;
    maps.forEach((parser) => {
        if (typeof (lastKnowsLength) == 'undefined' || lastKnowsLength !== (parser.length !== -1)) {
            mapTriaged.push([]);
            lastKnowsLength = parser.length !== -1;
        }
        mapTriaged[mapTriaged.length - 1].push(parser);
    });
    if (mapTriaged.length == 1)
        return new series_1.default(...maps);
    if (mapTriaged.length == 3 && mapTriaged[0][0].length > -1 && mapTriaged[1][0].length == -1 && mapTriaged[2][0].length > -1)
        return new between_1.default(seriesOrSingle(...mapTriaged[0]), seriesOrSingle(...mapTriaged[1]), seriesOrSingle(...mapTriaged[2]));
    return new series_1.default(...mapTriaged.map(map => seriesOrSingle(...map)));
}
exports.series = series;
function prefixedSeries(length, ...maps) {
    return new series_prefixed_1.default(length, series(...maps));
}
exports.prefixedSeries = prefixedSeries;
function choose(name, parsers) {
    return new switch_1.default(name, parsers);
}
exports.choose = choose;
function chooseProperty(name, assignProperty, parsers) {
    return new property_switch_1.default(name, assignProperty, parsers);
}
exports.chooseProperty = chooseProperty;
function optional(parser) {
    return new zero_or_one_1.ZeroOrOne(parser);
}
exports.optional = optional;
function condition(condition, parser) {
    return new conditional_parser_1.Conditional(condition, parser);
}
exports.condition = condition;
function property(name, valueParser) {
    return new property_1.default(name, valueParser);
}
exports.property = property;
function complexProperty(name, valueParser) {
    return new property_object_1.default(name, valueParser);
}
exports.complexProperty = complexProperty;
function prepare(fn, parser) {
    return new prepare_1.Prepare(fn, parser);
}
exports.prepare = prepare;
//# sourceMappingURL=index.js.map