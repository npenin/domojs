import Bit from './bit'
import Boolean from './boolean'
import Uint2 from './uint2'
import Uint3 from './uint3'
import Uint4 from './uint4'
import Uint5 from './uint5'
import Uint6 from './uint6'
import Uint7 from './uint7'
import Uint8 from './uint8'
import Uint16 from './uint16'
import Uint24 from './uint24'
import Uint32 from './uint32'
import Uint64 from './uint64'
import Uint16LE from './uint16LE'
import Uint24LE from './uint24LE'
import Uint32LE from './uint32LE'
import Uint64LE from './uint64LE'
import Vuint from './vuint'
import VuintLE from './vuintLE'

import PrefixedString from './string-prefixed'
import FixedString from './string-fixed'
import PreparsedLengthString from './string-preparsed'
import PrefixedArray from './array-prefixed'
import FixedArray from './array-fixed'
import PreparsedLengthArray from './array-preparsed'
import { AnyParser, Parser, Parsers, ParsersWithMessage, ParserWithMessage, ParserWithMessageWithoutKnownLength, ParserWithoutKnownLength } from './_common'
import Skip from './skip'
import PrefixedBuffer from './buffer-prefixed'
import BufferRaw from './buffer-fixed'
import Object from './object'
import Switch from './switch'
import SwitchProperty from './property-switch'
import Sequence from './sequence'
import Series from './series'
import Property from './property'
import PropertyObject from './property-object'
import { Prepare } from './prepare'
import { ZeroOrOne } from './zero-or-one'
import Between from './between'

export const bit = new Bit();
export const uint2 = new Uint2();
export const uint3 = new Uint3();
export const uint4 = new Uint4();
export const uint5 = new Uint5();
export const uint6 = new Uint6();
export const uint7 = new Uint7();
export const uint8 = new Uint8();
export const uint16 = new Uint16();
export const uint24 = new Uint24();
export const uint32 = new Uint32();
export const uint64 = new Uint64();
export const uint16LE = new Uint16LE();
export const uint24LE = new Uint24LE();
export const uint32LE = new Uint32LE();
export const uint64LE = new Uint64LE();
export const vuint = new Vuint();
export const vuintLE = new VuintLE();

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
    Vuint,
    VuintLE,
    PrefixedString as String,
    FixedString,
    PrefixedArray as Array,
    Sequence,
    Series,
    Between
};

export function skip<T = void>(length: number): Parsers<T>
{
    return new Skip<T>(length);
}
export function boolean(parser?: Parser<number>): Parser<boolean>
{
    return new Boolean(parser || bit);
}
export function string(length: number, encoding?: BufferEncoding): Parser<string>
export function string(length: Parser<number>, encoding?: BufferEncoding): ParserWithoutKnownLength<string>
export function string<T>(length: keyof T, encoding?: BufferEncoding): ParserWithMessageWithoutKnownLength<string, T>
export function string<T>(length: Parser<number> | number | keyof T, encoding?: BufferEncoding): AnyParser<string, T>
{
    if (typeof (length) === 'number')
        return new FixedString(length, encoding);
    if (typeof (length) === 'string' || typeof (length) === 'symbol')
        return new PreparsedLengthString<T, typeof length>(length, encoding);
    return new PrefixedString(length as Parser<number>, encoding);
}
export function buffer(length: Parser<number> | number): Parsers<Buffer>
{
    if (typeof length == 'number')
        return new BufferRaw(length);
    return new PrefixedBuffer(length);
}
export function array<T, TMessage>(length: Parser<number>, value: Parser<T>): Parser<T[]>
export function array<T, TMessage>(length: -1, value: Parser<T>): ParserWithoutKnownLength<T[]>
export function array<T, TMessage>(length: -1, value: ParserWithMessage<T, unknown>): ParserWithMessageWithoutKnownLength<T[], TMessage>
export function array<T, TMessage>(length: -1, value: ParserWithMessageWithoutKnownLength<T, unknown>): ParserWithMessageWithoutKnownLength<T[], TMessage>
export function array<T, TMessage>(length: number, value: Parser<T>): Parser<T[]>
export function array<T, TMessage>(length: keyof TMessage, value: AnyParser<T, Partial<T>>): ParserWithMessageWithoutKnownLength<T[], TMessage>
export function array<T, TMessage>(length: keyof TMessage | number | Parser<number>, value: AnyParser<T, TMessage>): AnyParser<T[], TMessage>
{
    if (typeof (length) === 'number')
        return new FixedArray<T, TMessage>(length, value);
    if (typeof (length) === 'string' || typeof length === 'symbol')
        return new PreparsedLengthArray<T, TMessage>(length, value);
    return new PrefixedArray<T, TMessage>(length as Parser<number>, value);
}

export function object<T extends object>(...maps: AnyParser<T[keyof T], T>[]): ParserWithMessageWithoutKnownLength<T, Partial<T>>
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

export function choose<T extends { [key in TKey]: number | string }, TResult, TKey extends Exclude<keyof T, number | symbol>>(name: TKey, parsers: { [key in T[TKey]]: AnyParser<TResult, T> })
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