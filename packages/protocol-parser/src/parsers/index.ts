import Bit, { Boolean } from './bit'
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
import PrefixedArray from './array-prefixed'
import FixedArray from './array-fixed'
import { AnyParser, Parser, Parsers, ParsersWithMessage, ParserWithMessage } from './type'
import Skip from './skip'
import PrefixedBuffer from './buffer-prefixed'
import BufferRaw from './buffer-fixed'
import { ObjectMap } from './object'
import Switch from './switch'
import SwitchProperty from './switch-property'
import Sequence from './sequence'
import Series from './series'
import Property from './property'

export const bit = new Bit();
export const boolean = new Boolean();
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
    ObjectMap,
    Sequence,
    Series
};

export function skip<T = void>(length: number): Parsers<T>
{
    return new Skip<T>(length);
}
export function string(length: Parser<number> | number, encoding?: BufferEncoding): Parsers<string>
{
    if (typeof (length) === 'number')
        return new FixedString(length, encoding);
    return new PrefixedString(length, encoding);
}
export function buffer(length: Parser<number>): Parsers<Buffer>
{
    return new PrefixedBuffer(length);
}
export function raw(length: number): Parsers<Buffer>
{
    return new BufferRaw(length);
}
export function array<T>(length: number | Parser<number>, value: Parser<T>): Parsers<T[]>
{
    if (typeof (length) === 'number')
        return new FixedArray(length, value);
    return new PrefixedArray(length, value);
}

export function object<T extends object>(...maps: AnyParser<T[keyof T], T>[]): ParsersWithMessage<T, Partial<T>>
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
    return new Series<T>(...mapTriaged.map(map => new Series<T>(...map)));
}

export function choose<T extends { [key in TKey]: number | string }, TResult, TKey extends Exclude<keyof T, number | symbol>>(name: TKey, parsers: { [key in T[TKey]]: AnyParser<TResult> })
{
    return new Switch<T, TKey, TResult, T[TKey]>(name, parsers);
}

export function chooseProperty<T extends object, TKey extends keyof T = keyof T, TKeyAssign extends keyof T = keyof T, TResult = T[TKeyAssign], TValue extends (T[TKey] extends string | number | symbol ? T[TKey] : never) = (T[TKey] extends string | number | symbol ? T[TKey] : never)>(name: TKey, assignProperty: TKeyAssign, parsers: { [key in TValue]: AnyParser<TResult> })
{
    return new SwitchProperty<T, TKey, TKeyAssign, TResult, TValue>(name, assignProperty, parsers);
}

export function property<T extends object, TKey extends keyof T>(name: TKey, valueParser: AnyParser<T[TKey], T[TKey]>): ParserWithMessage<T[TKey], T>
{
    return new Property<T, TKey>(name, valueParser);
}