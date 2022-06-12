"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Buffer = exports.multiPush = void 0;
function multiPush(array, items) {
    for (let index = 0; index < items.length; index++)
        array.push(items[index]);
}
exports.multiPush = multiPush;
const bufferInstance = Symbol('isBufferInstance');
class Buffer {
    buffer;
    static allocUnsafe(length) {
        return new Buffer(new Uint8Array(length), 0, length);
    }
    static of(...args) {
        const data = new Uint8Array(args.length);
        for (let i = 0; i < args.length; i++) {
            data[i] = args[i];
        }
        return new Buffer(data);
    }
    // static [Symbol.hasInstance](instance: any): instance is Buffer
    // {
    //     return instance[bufferInstance]
    // }
    readUInt8(floorOffset) {
        return this.buffer[floorOffset];
    }
    copy(input, offset, inputOffset, length) {
        if (!length)
            length = input.length;
        if (typeof inputOffset === 'undefined')
            inputOffset = 0;
        if (input instanceof Buffer) {
            for (let index = 0; index < length; index++)
                this.buffer[offset + index] = input.buffer[index + inputOffset];
            return;
        }
        for (let index = 0; index < length; index++)
            this.buffer[offset + index] = input.readUInt8(index + inputOffset);
    }
    static isBuffer(x) {
        return typeof x[bufferInstance] != 'undefined';
    }
    offset;
    length;
    constructor(buffer, offset, length) {
        this.buffer = buffer;
        // super();
        if (offset === undefined)
            offset = 0;
        if (length === undefined)
            length = buffer.byteLength;
        this.offset = offset;
        this.length = length;
        return new Proxy(this, {
            get: (target, property) => {
                if (property === bufferInstance)
                    return true;
                if (typeof (property) == 'number' && this.isSafeArrayIndex(property))
                    return target.buffer[property + this.offset];
                else if (typeof (property) == 'string' && this.isSafeArrayIndexString(property))
                    return target.buffer[Number.parseInt(property, 10) + this.offset];
                return Reflect.get(target, property);
            }, set: (target, property, value) => {
                if (typeof (property) == 'number' && this.isSafeArrayIndex(property)) {
                    target.buffer[property + this.offset] = value;
                    return true;
                }
                else if (typeof (property) == 'string' && this.isSafeArrayIndexString(property)) {
                    target.buffer[Number.parseInt(property, 10) + this.offset] = value;
                    return true;
                }
                else
                    return Reflect.set(target, property, value);
            }
        });
    }
    fill(arg0) {
        this.buffer.fill(arg0);
    }
    write(value, offset, length, encoding) {
        throw new Error("Method not implemented.");
    }
    read(offset, length, encoding) {
        throw new Error("Method not implemented.");
    }
    writeUInt16BE(value, offset) {
        this.buffer[offset++] = value >> 8 % 256;
        value = value >> 8;
        this.buffer[offset++] = value % 256;
    }
    writeUInt16LE(value, offset) {
        this.buffer[offset++] = value % 256;
        value = value >> 8;
        this.buffer[offset++] = value % 256;
        value = value >> 8;
        this.buffer[offset++] = value % 256;
        value = value >> 8;
        this.buffer[offset++] = value % 256;
        value = value >> 8;
        this.buffer[offset++] = value % 256;
    }
    writeUInt32BE(value, offset) {
        this.buffer[offset++] = value >> 24 % 256;
        this.buffer[offset++] = value >> 16 % 256;
        this.buffer[offset++] = value >> 8 % 256;
        this.buffer[offset++] = value % 256;
    }
    writeUInt32LE(value, offset) {
        this.buffer[offset++] = value % 256;
        value = value >> 8;
        this.buffer[offset++] = value % 256;
        value = value >> 8;
        this.buffer[offset++] = value % 256;
        value = value >> 8;
        this.buffer[offset++] = value % 256;
        value = value >> 8;
        this.buffer[offset++] = value % 256;
    }
    writeBigUInt64BE(value, offset) {
        this.write(value, offset);
    }
    writeBigUInt64LE(value, offset) {
        this.write(value, offset);
    }
    readUInt16BE(offset) {
        var value = this.buffer[offset++] << 8;
        value += this.buffer[offset++];
        return value;
    }
    readUInt16LE(offset) {
        var value = this.buffer[offset++];
        value += this.buffer[offset++] << 8;
        return value;
    }
    readUInt32BE(offset) {
        var value = this.buffer[offset++] << 24;
        value += this.buffer[offset++] << 16;
        value += this.buffer[offset++] << 8;
        value += this.buffer[offset++];
        return value;
    }
    readUInt32LE(offset) {
        var value = this.buffer[offset++];
        value += this.buffer[offset++] << 8;
        value += this.buffer[offset++] << 16;
        value += this.buffer[offset++] << 24;
        return value;
    }
    readBigUInt64BE(offset) {
        return this.read(offset, 8);
    }
    readBigUInt64LE(offset) {
        return this.read(offset, 8);
    }
    toJSON() {
        return { data: this.buffer };
    }
    writeUInt8(value, offset) {
        this.buffer[offset] = value;
    }
    static concat(buffers) {
        const length = buffers.reduce((previous, current) => previous + current.length, 0);
        const result = Buffer.alloc(length);
        buffers.reduce((previous, v) => { result.copy(v, previous); return v.length + previous; }, 0);
        return result;
    }
    static alloc(length) {
        return new Buffer(new Uint8Array(length), 0, length);
    }
    // static from(value: uint8[]): IBuffer
    // static from(value: string, encoding: BufferEncoding): IBuffer
    // static from(value: string|uint8[], encoding: BufferEncoding): IBuffer
    static from(value, encoding) {
        if (typeof value == 'string') {
            if (!encoding)
                encoding = 'ascii';
            const buffer = [];
            for (let i = 0; i < value.length; i++) {
                let charCode = value.charCodeAt(i);
                if (charCode <= 0x7f || encoding == 'ascii')
                    if (encoding == 'ascii' && charCode > 0xff)
                        buffer.push(1);
                    else
                        buffer.push(charCode);
                else //utf8
                 {
                    while (charCode > 0x7f) {
                        buffer.push(charCode & 0xff);
                        charCode = charCode >> 8;
                    }
                }
            }
            return new Buffer(Uint8Array.from(buffer));
        }
        return new Buffer(Uint8Array.from(value));
    }
    slice(start, end) {
        if (typeof end === 'undefined' || typeof start == 'undefined')
            return new Buffer(this.buffer, this.offset + (start || 0), this.length);
        return new Buffer(this.buffer, this.offset + (start || 0), Math.min(end - start, this.length));
    }
    isSafeArrayIndexString(propKey) {
        const uint = Number.parseInt(propKey, 10);
        const s = uint + "";
        return propKey === s && this.isSafeArrayIndex(uint);
    }
    isSafeArrayIndex(uint) {
        return uint !== 0xffffffff && uint >= 0 && uint < this.length;
    }
    toString(encoding, offset, length) {
        var s = '';
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
        for (let i = offset; i < length; i++) {
            if (encoding == 'ascii')
                s += String.fromCharCode(this.readUInt8(i));
            if (encoding === 'utf8') {
                var codes = [];
                let code = this.readUInt8(i);
                let continuation;
                if (code > 0x7f) {
                    switch (code & 0xf0) {
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
exports.Buffer = Buffer;
//# sourceMappingURL=core.js.map