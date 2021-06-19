import PrefixedBuffer from "../buffer-prefixed";
import ProtobufString from "./string";
import FixedLengthArray from "../array-fixed";
import Uint32 from "../uint32";
import Uint64 from "../uint64";
import { AnyParser, ParsersWithMessage, ParserWithMessage, ParserWithMessageWithoutKnownLength, ParserWithoutKnownLength } from "../_common";
import Property, { ArrayItem } from "./property";
import { WireType } from "./field";
import Message, { UnknownMessage } from "./message";
import { Sub } from "./sub";
import PackedProperty from "./packed-property";
import Varint from "./varint";
import { ZeroOrOne } from "../zero-or-one";

export const varint = new Varint();
export const raw: PrefixedBuffer & { wireType: WireType } = Object.assign(new PrefixedBuffer(varint), { wireType: 'length-delimited' } as { wireType: 'length-delimited' });
export const int32: Uint32 & { wireType: WireType } = Object.assign(new Uint32(), { wireType: '32-bit' } as { wireType: WireType });
export const int64: Uint64 & { wireType: WireType } = Object.assign(new Uint64(), { wireType: '64-bit' } as { wireType: WireType });
export { Message, Sub, Varint }

export type ProtobufMessageProperty<T, TKey extends keyof T> = ArrayItem<T[TKey]> | ArrayItem<T[TKey]>[];
export type ProtobufMessage<T> = { [key in keyof T]?: ProtobufMessageProperty<T, key> };
export type ProtobufMessage2<T> = T extends ProtobufMessage<T> ? T : ProtobufMessage<T>;

export function packed<T extends ProtobufMessage<T>>(name: keyof T, parser: AnyParser<T[keyof T], Partial<T>>)
{
    return property<T, typeof name>(name, 'length-delimited', new Sub(varint, new FixedLengthArray(-1, parser) as any));
}

export function sub<T extends ProtobufMessage<T>>(parser: AnyParser<T, Partial<T>>)
    : ParserWithMessageWithoutKnownLength<T, any> & { wireType: WireType }
{
    return new Sub(varint, parser);
}

/**
 * Ensures the first 4 bytes are an int32 informing about the message length
 * @param parser 
 * @returns 
 */
export function root<T extends ProtobufMessage<T>>(parser: AnyParser<T, Partial<T>>)
    : ParserWithMessageWithoutKnownLength<T, any> & { wireType: WireType }
{
    return new Sub(int32, parser);
}

export function property<T extends ProtobufMessage<T>, TKey extends keyof T>(name: TKey, wireType: WireType, parser: AnyParser<T[TKey], T>)
    : ParserWithMessageWithoutKnownLength<T[TKey], T> & { wireType: WireType }
export function property<T extends ProtobufMessage<T>, TKey extends keyof T>(name: TKey, parser: (ParsersWithMessage<T[TKey], Partial<T>> & { wireType: WireType }))
    : ParserWithMessageWithoutKnownLength<T[TKey], T> & { wireType: WireType }
export function property<T extends ProtobufMessage<T>, TKey extends keyof T>(name: TKey, wireType: WireType | (ParsersWithMessage<any, Partial<T>> & { wireType: WireType }), parser?: AnyParser<T[TKey], Partial<T>>)
    : ParserWithMessageWithoutKnownLength<T[TKey], T> & { wireType: WireType }
{
    if (typeof wireType !== 'string')
    {
        parser = wireType;
        wireType = wireType.wireType;
    }
    return new Property<T, typeof name>(name, wireType, new ZeroOrOne(parser)) as any;
}

export function object<T extends ProtobufMessage<T>>(...parsers: (ParserWithMessageWithoutKnownLength<any, Partial<T>> & { wireType: WireType })[]):
    ParserWithMessageWithoutKnownLength<T, Partial<T> | void> & { wireType: WireType }
{
    return new Message<T>(...parsers);
}

/**
 * This a a shortcut for root(object(parsers))
 * @param parsers 
 * @returns 
 */
export function message<T extends ProtobufMessage<T>>(...parsers: (ParserWithMessageWithoutKnownLength<any, Partial<T>> & { wireType: WireType })[]):
    ParserWithMessageWithoutKnownLength<T, Partial<T> | void> & { wireType: WireType }
{
    return root(object(...parsers));
}
export function string<T>(encoding?: BufferEncoding)
{
    return new ProtobufString(varint, encoding);
}

export const debug = new UnknownMessage(varint, string(), int32, int64);