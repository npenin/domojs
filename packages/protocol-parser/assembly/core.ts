export type uint8 = u8;
export type uint16 = u16;
export type uint32 = u32;
export type uint64 = string;
export type int8 = i8;
export type int16 = i16;
export type int32 = i32;
export type float = f32;
export type double = f64;


export function multiPush<T>(array: T[], items: T[]): void
{
    for (let index = 0; index < items.length; index++)
        array.push(items[index]);
}

// export type Partial<T extends object> = Map<keyof T, T[keyof T]>

export type BufferEncoding = string;//'utf8' | 'ascii';


export interface JsonBuffer
{
    data: Uint8Array;
}

export interface IBuffer
{
    toJSON(): JsonBuffer;
    fill(value: uint8): void;
    write(value: string, offset?: number, length?: number, encoding?: BufferEncoding): uint32;
    writeUInt16BE(value: uint16, offset: uint32): void;
    writeUInt16LE(value: uint16, offset: uint32): void;
    writeUInt32BE(value: uint32, offset: uint32): void;
    writeUInt32LE(value: uint32, offset: uint32): void;
    writeBigUInt64BE(value: uint64, offset: uint32): void;
    writeBigUInt64LE(value: uint64, offset: uint32): void;
    readUInt16BE(offset: uint32): uint16;
    readUInt16LE(offset: uint32): uint16;
    readUInt32BE(offset: uint32): uint32;
    readUInt32LE(offset: uint32): uint32;
    readBigUInt64BE(offset: uint32): uint64;
    readBigUInt64LE(offset: uint32): uint64;
    writeUInt8(value: uint8, offset: uint32): void;
    readUInt8(offset: uint32): uint8;
    length: uint32;
    copy(input: IBuffer, offset: uint32, inputOffset?: uint32, length?: uint32): void;
    slice(start?: uint32, end?: uint32): IBuffer;
    toString(encoding?: BufferEncoding, offset?: uint32, length?: uint32): string;
}

const bufferInstance = Symbol('isBufferInstance');

export class Buffer implements IBuffer
{
    static allocUnsafe(length: number): IBuffer
    {
        return new Buffer(new Uint8Array(length), 0, length);
    }
    static of(...args: uint8[]): IBuffer
    {
        const data = new Uint8Array(args.length);
        for (let i = 0; i < args.length; i++)
        {
            data[i] = args[i];
        }
        return new Buffer(data);
    }
    // static [Symbol.hasInstance](instance: any): instance is Buffer
    // {
    //     return instance[bufferInstance]
    // }

    readUInt8(floorOffset: uint32): uint8
    {
        return this.buffer[floorOffset];
    }

    copy(input: IBuffer, offset: uint32, inputOffset?: uint32, length?: uint32): void
    {
        if (!length)
            length = input.length;
        if (typeof inputOffset === 'undefined')
            inputOffset = 0;

        if (input instanceof Buffer)
        {
            for (let index = 0; index < length; index++)
                this.buffer[offset + index] = input.buffer[index + inputOffset];
            return;
        }

        for (let index = 0; index < length; index++)
            this.buffer[offset + index] = input.readUInt8(index + inputOffset);
    }
    public static isBuffer(x: any): boolean
    {
        return typeof x[bufferInstance] != 'undefined';
    }
    private offset: uint32;
    public readonly length: uint32;
    constructor(public buffer: Uint8Array, offset?: uint32, length?: uint32)
    {
        // super();
        if (offset === undefined)
            offset = 0;
        if (length === undefined)
            length = buffer.byteLength;
        this.offset = offset;
        this.length = length;
        return new Proxy(this, {
            get: (target, property) =>
            {
                if (property === bufferInstance)
                    return true;
                if (typeof (property) == 'number' && this.isSafeArrayIndex(property))
                    return target.buffer[property + this.offset];
                else if (typeof (property) == 'string' && this.isSafeArrayIndexString(property))
                    return target.buffer[Number.parseInt(property, 10) + this.offset];
                return Reflect.get(target, property);
            }, set: (target, property, value) =>
            {
                if (typeof (property) == 'number' && this.isSafeArrayIndex(property))
                {
                    target.buffer[property + this.offset] = value;
                    return true;
                }
                else if (typeof (property) == 'string' && this.isSafeArrayIndexString(property))
                {
                    target.buffer[Number.parseInt(property, 10) + this.offset] = value;
                    return true;
                }
                else
                    return Reflect.set(target, property, value);
            }
        })
    }

    fill(arg0: uint8): void
    {
        this.buffer.fill(arg0)
    }
    write(value: string, offset?: uint32, length?: uint32, encoding?: string): uint32
    {
        throw new Error("Method not implemented.");
    }
    read(offset?: uint32, length?: uint32, encoding?: string): string
    {
        throw new Error("Method not implemented.");
    }
    writeUInt16BE(value: uint16, offset: uint32): void
    {
        this.buffer[offset++] = value >> 8 % 256;
        value = value >> 8;
        this.buffer[offset++] = value % 256;
    }
    writeUInt16LE(value: uint16, offset: uint32): void
    {
        this.buffer[offset++] = value % 256;
        value = value >> 8
        this.buffer[offset++] = value % 256;
        value = value >> 8
        this.buffer[offset++] = value % 256;
        value = value >> 8
        this.buffer[offset++] = value % 256;
        value = value >> 8
        this.buffer[offset++] = value % 256;
    }
    writeUInt32BE(value: uint32, offset: uint32): void
    {
        this.buffer[offset++] = value >> 24 % 256;
        this.buffer[offset++] = value >> 16 % 256;
        this.buffer[offset++] = value >> 8 % 256;
        this.buffer[offset++] = value % 256;
    }
    writeUInt32LE(value: uint32, offset: uint32): void
    {
        this.buffer[offset++] = value % 256;
        value = value >> 8
        this.buffer[offset++] = value % 256;
        value = value >> 8
        this.buffer[offset++] = value % 256;
        value = value >> 8
        this.buffer[offset++] = value % 256;
        value = value >> 8
        this.buffer[offset++] = value % 256;
    }
    writeBigUInt64BE(value: uint64, offset: uint32): void
    {
        this.write(value, offset);
    }
    writeBigUInt64LE(value: uint64, offset: uint32): void
    {
        this.write(value, offset);
    }
    readUInt16BE(offset: uint32): uint16
    {
        var value: uint16 = (this.buffer[offset++] as uint16) << 8;
        value += this.buffer[offset++];
        return value;
    }
    readUInt16LE(offset: uint32): uint16
    {
        var value: uint16 = this.buffer[offset++];
        value += (this.buffer[offset++] as uint16) << 8;
        return value;

    }
    readUInt32BE(offset: uint32): uint32
    {
        var value: uint32 = (this.buffer[offset++] as uint32) << 24;
        value += (this.buffer[offset++] as uint32) << 16;
        value += (this.buffer[offset++] as uint32) << 8;
        value += this.buffer[offset++];
        return value;

    }
    readUInt32LE(offset: uint32): uint32
    {
        var value: uint32 = this.buffer[offset++];
        value += (this.buffer[offset++] as uint32) << 8;
        value += (this.buffer[offset++] as uint32) << 16;
        value += (this.buffer[offset++] as uint32) << 24;
        return value;


    }
    readBigUInt64BE(offset: uint32): uint64
    {
        return this.read(offset, 8);

    }
    readBigUInt64LE(offset: uint32): uint64
    {
        return this.read(offset, 8);
    }

    toJSON(): JsonBuffer
    {
        return { data: this.buffer };
    }
    writeUInt8(value: uint8, offset: uint32): void
    {
        this.buffer[offset] = value;
    }

    public static concat(buffers: IBuffer[]): Buffer
    {
        const length = buffers.reduce((previous, current) => previous + current.length, 0);
        const result = Buffer.alloc(length);
        buffers.reduce((previous, v) => { result.copy(v, previous); return v.length + previous }, 0 as uint32)
        return result;
    }
    static alloc(length: number): Buffer
    {
        return new Buffer(new Uint8Array(length), 0, length);
    }
    // static from(value: uint8[]): IBuffer
    // static from(value: string, encoding: BufferEncoding): IBuffer
    // static from(value: string|uint8[], encoding: BufferEncoding): IBuffer
    static from(value: any, encoding?: BufferEncoding): IBuffer
    {
        if (typeof value == 'string')
        {
            if (!encoding)
                encoding = 'ascii';
            const buffer: uint8[] = [];
            for (let i = 0; i < value.length; i++)
            {
                let charCode = value.charCodeAt(i);
                if (charCode <= 0x7f || encoding == 'ascii')
                    if (encoding == 'ascii' && charCode > 0xff)
                        buffer.push(1);
                    else
                        buffer.push(charCode);
                else //utf8
                {
                    while (charCode > 0x7f)
                    {
                        buffer.push(charCode & 0xff);
                        charCode = charCode >> 8;
                    }
                }

            }

            return new Buffer(Uint8Array.from(buffer));
        }
        return new Buffer(Uint8Array.from(value));
    }

    public slice(start?: uint32, end?: uint32): IBuffer
    {
        if (typeof end === 'undefined' || typeof start == 'undefined')
            return new Buffer(this.buffer, this.offset + (start || 0), this.length);
        return new Buffer(this.buffer, this.offset + (start || 0), Math.min(end - start, this.length));
    }

    private isSafeArrayIndexString(propKey: string): boolean
    {
        const uint = Number.parseInt(propKey, 10);
        const s = uint + "";
        return propKey === s && this.isSafeArrayIndex(uint);
    }
    private isSafeArrayIndex(uint: uint32): boolean
    {
        return uint !== 0xffffffff && uint >= 0 && uint < this.length;
    }

    public toString(encoding?: BufferEncoding, offset?: uint32, length?: uint32): string
    {
        var s = ''
        if (typeof length === 'undefined')
            length = this.length;
        else
            length = Math.min(length, this.length);
        if (typeof offset === 'undefined')
            offset = this.offset;
        else
            offset = Math.min(offset + this.offset, length + this.offset);
        if (offset == length + this.offset)
            return s;
        for (let i = offset; i < length; i++)
        {

            if (encoding == 'ascii')
                s += String.fromCharCode(this.readUInt8(i));
            if (encoding === 'utf8')
            {
                var codes: uint8[] = []
                let code = this.readUInt8(i);
                let continuation: uint8;
                if (code > 0x7f)
                {
                    switch (code & 0xf0)
                    {
                        case 0x80: // 1000
                        case 0x90: // 1001
                        case 0xa0: // 1010
                        case 0xb0: // 1011
                            throw new Error('invalid char code'); //potential continuation
                        case 0xc0: // 1100
                        case 0xd0: // 1101
                            code = (code & 0x7f << 8);
                            continuation = this.readUInt8(++i);
                            if ((continuation & 0xc0) != 0xc0)
                                throw new Error('invalid encoding');
                            code += continuation & 0x3f;
                            break;
                        case 0xe0: // 1110
                            code = (code & 0x7f << 8);
                            continuation = this.readUInt8(++i);
                            if ((continuation & 0xc0) != 0xc0)
                                throw new Error('invalid encoding');
                            code += continuation & 0x3f;
                            continuation = this.readUInt8(++i);
                            if ((continuation & 0xc0) != 0xc0)
                                throw new Error('invalid encoding');
                            code += continuation & 0x3f;
                            break;
                        case 0xf0: // 1111
                            if ((code & 0xf8) !== (code & 0xf0))
                                throw new Error('invalid encoding');
                            code = (code & 0x7f << 8);
                            continuation = this.readUInt8(++i);
                            if ((continuation & 0xc0) != 0xc0)
                                throw new Error('invalid encoding');
                            code += continuation & 0x3f;
                            continuation = this.readUInt8(++i);
                            if ((continuation & 0xc0) != 0xc0)
                                throw new Error('invalid encoding');
                            code += continuation & 0x3f;
                            continuation = this.readUInt8(++i);
                            if ((continuation & 0xc0) != 0xc0)
                                throw new Error('invalid encoding');
                            code += continuation & 0x3f;
                            break;
                    }
                }
                codes.push(code);
            }
        }
        return s;
    }
}