import Bit from './bit.js'
import Boolean from './boolean.js'
import Uint2 from './uint2.js'
import Uint3 from './uint3.js'
import Uint4 from './uint4.js'
import Uint5 from './uint5.js'
import Uint6 from './uint6.js'
import Uint7 from './uint7.js'
import Uint8 from './uint8.js'
import Uint16 from './uint16.js'
import Uint24 from './uint24.js'
import Uint32 from './uint32.js'
import Uint64 from './uint64.js'
import Uint16LE from './uint16LE.js'
import Uint24LE from './uint24LE.js'
import Uint32LE from './uint32LE.js'
import Uint64LE from './uint64LE.js'
import Vuint from './vuint.js'
import VuintLE from './vuintLE.js'
import Int16 from './int16.js'
import Int24 from './int24.js'
import Int32 from './int32.js'
import Int64 from './int64.js'
import Int16LE from './int16LE.js'
import Int24LE from './int24LE.js'
import Int32LE from './int32LE.js'
import Int64LE from './int64LE.js'
import Float from './float.js'
import FloatLE from './floatLE.js'
import Double from './double.js'
import DoubleLE from './doubleLE.js'

import PrefixedString from './string-prefixed.js'
import FixedString from './string-fixed.js'
import PreparsedLengthString from './string-preparsed.js'
import PrefixedArray from './array-prefixed.js'
import FixedArray from './array-fixed.js'
import PreparsedLengthArray from './array-preparsed.js'
import { AnyParser, Parser, Parsers, ParsersWithMessage, ParserWithMessage, ParserWithMessageWithoutKnownLength, ParserWithoutKnownLength } from './_common.js'
import Skip from './skip.js'
import PrefixedBuffer from './buffer-prefixed.js'
import BufferRaw from './buffer-fixed.js'
import Object from './object.js'
import Switch from './switch.js'
import SwitchProperty from './property-switch.js'
import Sequence from './sequence.js'
import Series from './series.js'
import PrefixedLengthSeries from './series-prefixed.js'
import Property from './property.js'
import PropertyObject from './property-object.js'
import { Prepare } from './prepare.js'
import { ZeroOrOne } from './zero-or-one.js'
import Between from './between.js'
import * as protobuf from './protobuf/index.js'
import { Sub } from './sub.js'
import { Conditional } from './conditional-parser.js'
import * as types from '../core.js'

export { protobuf };

export const bit: Parser<number> = new Bit();
export const uint2: Parser<number> = new Uint2();
export const uint3: Parser<number> = new Uint3();
export const uint4: Parser<number> = new Uint4();
export const uint5: Parser<number> = new Uint5();
export const uint6: Parser<number> = new Uint6();
export const uint7: Parser<number> = new Uint7();
export const uint8: Parser<number> = new Uint8();
export const uint16: Parser<number> = new Uint16();
export const uint24: Parser<number> = new Uint24();
export const uint32: Parser<number> = new Uint32();
export const uint64: Parser<bigint> = new Uint64();
export const uint16LE: Parser<number> = new Uint16LE();
export const uint24LE: Parser<number> = new Uint24LE();
export const uint32LE: Parser<number> = new Uint32LE();
export const uint64LE: Parser<bigint> = new Uint64LE();
export const int16: Parser<number> = new Int16();
export const int24: Parser<number> = new Int24();
export const int32: Parser<number> = new Int32();
export const int64: Parser<bigint> = new Int64();
export const int16LE: Parser<number> = new Int16LE();
export const int24LE: Parser<number> = new Int24LE();
export const int32LE: Parser<number> = new Int32LE();
export const int64LE: Parser<bigint> = new Int64LE();
export const vuint: ParserWithoutKnownLength<number> = new Vuint();
export const vuintLE: ParserWithoutKnownLength<number> = new VuintLE();

export const floatLE: Parser<types.float> = new FloatLE();
export const float: Parser<types.float> = new Float();
export const double: Parser<types.double> = new Double();
export const doubleLE: Parser<types.double> = new DoubleLE();

export { Parser, ParserWithMessage, ParserWithMessageWithoutKnownLength, ParserWithoutKnownLength, Parsers, ParsersWithMessage, AnyParser };

export
{
    Bit,
    Uint2,
    Uint3,
    Uint4,
    Uint5,
    Uint6,
    Uint7,
    Uint8,
    Uint16,
    Uint24,
    Uint32,
    Uint64,
    Uint16LE,
    Uint24LE,
    Uint32LE,
    Uint64LE,
    Int16,
    Int24,
    Int32,
    Int64,
    Int16LE,
    Int24LE,
    Int32LE,
    Int64LE,
    Vuint,
    VuintLE,
    PrefixedString as String,
    FixedString,
    PrefixedArray as Array,
    Sequence,
    Series,
    Between,
    Float,
    FloatLE,
    Double,
    DoubleLE
};

export function skip<T = void>(length: number): Parsers<T>
{
    return new Skip<T>(length);
}
export function sub<TResult, TMessage>(length: AnyParser<number, TMessage>, inner: AnyParser<TResult, TMessage>): ParserWithMessageWithoutKnownLength<TResult, TMessage>
{
    return new Sub(length, inner);
}
export function boolean(parser?: Parser<number>): Parser<boolean>
{
    return new Boolean(parser || bit);
}
export function string<TString extends string = string>(length: number, encoding?: BufferEncoding): Parser<TString>
export function string<TString extends string = string>(length: Parsers<number>, encoding?: BufferEncoding): ParserWithoutKnownLength<TString>
export function string<T, TString extends string = string>(length: keyof T, encoding?: BufferEncoding): ParserWithMessageWithoutKnownLength<TString, T>
export function string<T, TString extends string = string>(length: Parsers<number> | number | keyof T, encoding?: BufferEncoding): AnyParser<TString, T>
{
    if (typeof (length) === 'number')
        return new FixedString<TString>(length, encoding);
    if (typeof (length) === 'string' || typeof (length) === 'symbol')
        return new PreparsedLengthString<T, typeof length, TString>(length, encoding);
    return new PrefixedString<TString>(length as Parsers<number>, encoding);
}
export function buffer(length: Parser<number> | ParserWithoutKnownLength<number> | number): Parsers<Buffer>
{
    if (typeof length == 'number')
        return new BufferRaw(length);
    return new PrefixedBuffer(length);
}
export function array<T, TMessage>(length: Parser<number>, value: Parser<T>): Parser<T[]>
export function array<T, TMessage>(length: ParserWithoutKnownLength<number>, value: AnyParser<T, TMessage>): ParserWithoutKnownLength<T[]>
export function array<T, TMessage>(length: -1, value: Parser<T>): ParserWithoutKnownLength<T[]>
export function array<T, TMessage>(length: -1, value: ParserWithMessage<T, unknown>): ParserWithMessageWithoutKnownLength<T[], TMessage>
export function array<T, TMessage>(length: -1, value: ParserWithMessageWithoutKnownLength<T, unknown>): ParserWithMessageWithoutKnownLength<T[], TMessage>
export function array<T, TMessage>(length: number, value: Parser<T>): Parser<T[]>
export function array<T, TMessage>(length: keyof TMessage, value: AnyParser<T, Partial<T>>): ParserWithMessageWithoutKnownLength<T[], TMessage>
export function array<T, TMessage>(length: keyof TMessage | number | Parsers<number>, value: AnyParser<T, TMessage>): AnyParser<T[], TMessage>
{
    if (typeof (length) === 'number')
        return new FixedArray<T, TMessage>(length, value);
    if (typeof (length) === 'string' || typeof length === 'symbol')
        return new PreparsedLengthArray<T, TMessage>(length, value);
    return new PrefixedArray<T, TMessage>(length as Parser<number>, value);
}

export function object<T extends object>(...maps: AnyParser<T[keyof T] | T, T>[]): ParserWithMessageWithoutKnownLength<T, Partial<T>>
{
    var mapTriaged: AnyParser<T[keyof T], T>[][] = [];
    var lastKnowsLength: boolean;
    maps.forEach((parser) =>
    {
        if (typeof (lastKnowsLength) == 'undefined' || lastKnowsLength !== (parser.length !== -1))
        {
            mapTriaged.push([]);
            lastKnowsLength = parser.length !== -1;
        }

        mapTriaged[mapTriaged.length - 1].push(parser as any);
    });

    if (mapTriaged.length == 1)
        return new Object<T>(...maps);
    return new Object<T>(...mapTriaged.map(map => new Series<T>(...map)));
}

function seriesOrSingle<T>(...map: AnyParser<T[keyof T], T>[])
{
    if (map.length == 1)
        return map[0];
    return new Series(...map);
}

export function series<T extends object>(...maps: AnyParser<T[keyof T], T>[]): ParserWithMessageWithoutKnownLength<T, Partial<T>>
{
    var mapTriaged: AnyParser<T[keyof T], T>[][] = [];
    var lastKnowsLength: boolean;
    maps.forEach((parser) =>
    {
        if (typeof (lastKnowsLength) == 'undefined' || lastKnowsLength !== (parser.length !== -1))
        {
            mapTriaged.push([]);
            lastKnowsLength = parser.length !== -1;
        }

        mapTriaged[mapTriaged.length - 1].push(parser);
    });

    if (mapTriaged.length == 1)
        return new Series<T>(...maps);
    if (mapTriaged.length == 3 && mapTriaged[0][0].length > -1 && mapTriaged[1][0].length == -1 && mapTriaged[2][0].length > -1)
        return new Between<T>(seriesOrSingle(...mapTriaged[0]) as Parser<T> | ParserWithMessage<T, Partial<T>>, seriesOrSingle(...mapTriaged[1]) as ParserWithoutKnownLength<T> | ParserWithMessageWithoutKnownLength<T, Partial<T>>, seriesOrSingle(...mapTriaged[2]) as Parser<T> | ParserWithMessage<T, Partial<T>>);
    return new Series<T>(...mapTriaged.map(map => seriesOrSingle(...map)));
}

export function prefixedSeries<T extends object>(length: Parsers<number>, ...maps: AnyParser<T[keyof T] | T, T>[]): ParserWithMessageWithoutKnownLength<T, Partial<T>>
{
    return new PrefixedLengthSeries(length, series<T>(...maps as any));
}

export function choose<T extends { [key in TKey]: number | string }, TKey extends Exclude<keyof T, number | symbol>, TResult>(name: TKey, parsers: { [key in T[TKey]]: AnyParser<TResult, T> })
{
    return new Switch<T, TKey, TResult, T[TKey]>(name, parsers);
}

export function chooseProperty<T, TKey extends keyof T = keyof T, TKeyAssign extends keyof T = keyof T, TResult = T[TKeyAssign], TValue extends (T[TKey] extends string | number | symbol ? T[TKey] : never) = (T[TKey] extends string | number | symbol ? T[TKey] : never)>(name: TKey, assignProperty: TKeyAssign, parsers: { [key in TValue]: AnyParser<TResult, T[TKeyAssign]> })
// : ParserWithMessageWithoutKnownLength<TResult, T>
{
    return new SwitchProperty<T, TKey, TKeyAssign, TResult, TValue>(name, assignProperty, parsers);
}

export function optional<T, TMessage>(parser: AnyParser<T, TMessage>)
{
    return new ZeroOrOne<T, TMessage>(parser);
}

export function condition<T, TMessage>(condition: (message: TMessage) => boolean, parser: AnyParser<T, TMessage>): ParserWithMessage<T, TMessage>
{
    return new Conditional<T, TMessage>(condition, parser);
}

export function property<T, TKey extends keyof T>(name: TKey, valueParser: Parser<T[TKey]>): AnyParser<T[TKey], T>
export function property<T, TKey extends keyof T>(name: TKey, valueParser: ParserWithoutKnownLength<T[TKey]>): AnyParser<T[TKey], T>
export function property<T, TKey extends keyof T>(name: TKey, valueParser: ParserWithMessage<T[TKey], T>): AnyParser<T[TKey], T>
export function property<T, TKey extends keyof T>(name: TKey, valueParser: ParserWithMessageWithoutKnownLength<T[TKey], T>): AnyParser<T[TKey], T>
export function property<T, TKey extends keyof T>(name: TKey, valueParser: AnyParser<T[TKey], T>): AnyParser<T[TKey], T>
{
    return new Property<T, TKey>(name, valueParser);
}
export function complexProperty<T extends object, TKey extends keyof T>(name: TKey, valueParser: AnyParser<T[TKey], T[TKey]>): ParserWithMessage<T[TKey], T>
{
    return new PropertyObject<T, TKey>(name, valueParser);
}

export function prepare<T, TMessage>(fn: (t: T) => void, parser: AnyParser<T, TMessage>)
{
    return new Prepare<T, TMessage>(fn, parser);
}