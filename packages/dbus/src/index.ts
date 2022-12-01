import { double, int16, int32, parsers, uint16, uint32, uint64, uint8 } from '@domojs/protocol-parser'
import { Cursor, ParserWithMessage, ParserWithMessageWithoutKnownLength } from '@domojs/protocol-parser/dist/parsers/_common';

export enum MessageType
{
    Invalid = 0,
    MethodCall = 1,
    MethodReturn = 2,
    Error = 3,
    Signal = 4,
}

export enum MessageFlags
{
    None = 0,
    NoReplyExpected = 1,
    NoAutoStart = 2,
    AllowInteractiveAuthorization = 4,
}

export interface Message
{
    endianness: 'l' | 'B';
    type: uint8;
    flags: MessageFlags;
    version: uint8;
    lengthInBytes: uint32;
    sequence: uint32;
    fields: MessageHeaderFields[]
}

interface MessageHeaderFields
{
    code: uint8;
    value: any;
}

type ObjectPath = string
type Signature = string
const signature = parsers.string(parsers.uint8, 'ascii');
// type Variant= uint8|boolean|int16|uint16|int32|uint32|uint64|double|string|ObjectPath|Signature|;

class Uint32lebe implements ParserWithMessage<uint32, Message>
{
    length: number = 4;
    read(buffer: Buffer, cursor: Cursor, message: Message): uint32
    {
        switch (message.endianness)
        {
            case 'l': // littleEndian
                return parsers.uint32LE.read(buffer, cursor);
            case 'B': // BigEndian
                return parsers.uint32.read(buffer, cursor);
        }
    }
    write(buffer: Buffer, cursor: Cursor, value: uint32, message: Message): void
    {
        switch (message.endianness)
        {
            case 'l': // littleEndian
                return parsers.uint32LE.write(buffer, cursor, value);
            case 'B': // BigEndian
                return parsers.uint32.write(buffer, cursor, value);
        }
    }
}

const signatureParsers: { [key in Message['endianness']]: { [signature: Signature]: parsers.Parser<any>[] } } = { 'l': {}, 'B': {} };

function getOrcreateSignatureParsers(endianness: Message['endianness'], signature: Signature)
{
    return signatureParsers[endianness][signature] || (signature[endianness][signature] = createSignatureParsers(endianness, signature));
}
function createSignatureParsers(endianness: Message['endianness'], signature: Signature)
{
    const signatureParsers: parsers.AnyParser<any, object>[] = [];

    for (var i = 0; i < signature.length; i++)
    {
        if (endianness == 'B' && signature[i] in parserBEMap)
            signatureParsers.push(parserBEMap[signature[i]]);
        else if (endianness == 'l' && signature[i] in parserLEMap)
            signatureParsers.push(parserLEMap[signature[i]]);
        else 
        {
            switch (signature[i])
            {
                case 'a':
                    if (signature[i + 1] == '(')
                    {
                        const indexOfRParen = signature.indexOf(')', i);
                        signatureParsers.push(...getOrcreateSignatureParsers(endianness, signature.substring(i, indexOfRParen)));
                        i = indexOfRParen;
                    }
                    else
                        signatureParsers.push(...getOrcreateSignatureParsers(endianness, signature[++i]));
                    break;
                case '(':
                    const indexOfRParen = signature.indexOf(')', i);
                    signatureParsers.push(...getOrcreateSignatureParsers(endianness, signature.substring(i, indexOfRParen)));
                    i = indexOfRParen;
                    break;
                case '{':
                    const indexOfRBrace = signature.indexOf('}', i);
                    signatureParsers.push(...getOrcreateSignatureParsers(endianness, signature.substring(i, indexOfRBrace)));
                    i = indexOfRBrace;
                    break;
                default:
                    throw new Error('Invalid endianness');
            }
        }
    }

    return signatureParsers;
}

class VariantParser implements ParserWithMessageWithoutKnownLength<Variant, Message>
{
    length: -1;
    read(buffer: Buffer, cursor: Cursor, partial: Message)
    {
        const endianness = partial.endianness;
        const parsedSignature = signature.read(buffer, cursor);
        const parser = getOrcreateSignatureParsers(endianness, parsedSignature);
        if (parser.length !== 1)
            throw new Error('Variant only supports one single type');
        return parser[0].read(buffer, cursor, partial);
    }
    write(value: any, message: Message): Buffer[]
    {
        throw new Error('Method not implemented.');
    }

}
interface Variant
{
    signature: Signature;
    value: any;
}

const uint32lebe = new Uint32lebe();
const variant = parsers.object<Variant>(
    parsers.property('signature', signature),

);

const parserLEMap = {
    'y': parsers.uint8,
    'b': parsers.boolean(parsers.uint8),
    'n': parsers.uint16LE,
    'q': parsers.int16LE,
    'i': parsers.int32LE,
    'u': parsers.uint32LE,
    'x': parsers.int64LE,
    't': parsers.uint64LE,
    'd': parsers.doubleLE,
    's': parsers.string(parsers.uint32LE, 'utf-8'),
    'o': parsers.string(parsers.uint32LE, 'utf-8'),
    'g': signature,
    'a': <T>(sub: parsers.Parser<T>) => parsers.array(parsers.uint32LE as parsers.Parser<number>, sub),
    'v': variant,
    'h': parsers.uint32LE,
};

const parserBEMap = {
    'y': parsers.uint8,
    'b': parsers.boolean(parsers.uint8),
    'n': parsers.uint16,
    'q': parsers.int16,
    'i': parsers.int32,
    'u': parsers.uint32,
    'x': parsers.int64,
    't': parsers.uint64,
    'd': parsers.double,
    's': parsers.string(parsers.uint32, 'utf-8'),
    'o': parsers.string(parsers.uint32, 'utf-8'),
    'g': signature,
    'a': <T>(sub: parsers.Parser<T>) => parsers.array(parsers.uint32 as parsers.Parser<number>, sub),
    'v': variant,
    'h': parsers.uint32,
}

export var Protocol = parsers.object<Message>(
    parsers.property('endianness', parsers.string<'l' | 'B'>(1, 'ascii')),
    parsers.property('type', parsers.uint8),
    parsers.property('flags', parsers.uint8),
    parsers.property('version', parsers.uint8),
    parsers.property('lengthInBytes', uint32lebe),
    parsers.property('sequence', uint32lebe),
    parsers.property('fields', parsers.array(uint32lebe,
        parsers.object<MessageHeaderFields>(
            parsers.property('code', parsers.uint8),
            parsers.property('value', variant))))
);