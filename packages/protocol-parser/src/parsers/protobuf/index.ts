import PrefixedBuffer from "../buffer-prefixed";
import PrefixedString from "../string-prefixed";
import FixedLengthArray from "../array-fixed";
import Uint32 from "../uint32";
import Uint64 from "../uint64";
import { AnyParser, ParserWithMessageWithoutKnownLength, ParserWithoutKnownLength } from "../_common";
import PackedProperty, { ArrayItem } from "./property";
import { WireType } from "./field";
import Message, { ProtobufParser } from "./message";
import { Sub } from "./sub";
import UnpackedProperty from "./unpacked-property";
import Varint from "./varint";
import { ZeroOrOne } from "../zero-or-one";

export const varint = new Varint();
export const raw = new PrefixedBuffer(varint);
export const int32 = new Uint32();
export const int64 = new Uint64();
export { Message, ProtobufParser }

export type ProtobufMessage<T> = { [key in keyof T]?: T[key] extends unknown[] ? T[key] | ArrayItem<T[key]> : T[key] | T[key][] };

export function packed<T extends ProtobufMessage<T>>(name: keyof T, parser: AnyParser<ArrayItem<T[typeof name]>, any>): ProtobufParser<T>
{
    return new PackedProperty(name, 'length-delimited', new ZeroOrOne(new Sub(varint, new FixedLengthArray(-1, parser) as any)));
}

export function property<T extends ProtobufMessage<T>>(name: keyof T, type: WireType, parser: AnyParser<ArrayItem<T[typeof name]>, T>): ProtobufParser<T>
{
    if (parser instanceof Message)
        parser = new Sub(varint, parser);
    return new UnpackedProperty(name, type, parser as any);
}

export function object<T extends ProtobufMessage<T>>(...parsers: ProtobufParser<T>[]): ParserWithMessageWithoutKnownLength<T, Partial<T>>
{
    return new Message<T>(...parsers);
}
export function string<T>(encoding?: BufferEncoding)
{
    return new PrefixedString(varint, encoding);
}