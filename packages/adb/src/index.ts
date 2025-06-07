import { Cursor, parserWrite, parsers, uint32 } from "@akala/protocol-parser";
import { crc32_compute_buffer, crc32_compute_string } from "./crc.js";
import { Socket } from 'net'
import { base64, IsomorphicBuffer, Queue } from '@akala/core'
import { Duplex } from 'stream'
import crypto from 'crypto'
import { EventEmitter } from 'events'

export interface Message
{
    command: Command;
    arg0: uint32;
    arg1: uint32;
    dataLength: uint32;
    dataChecksum?: uint32;
    checksum?: uint32;
    payload?: IsomorphicBuffer;
}

export type ConvenientMessage = Omit<Message, 'dataLength'> & Pick<Partial<Message>, 'dataLength'>
{
}


export enum Command
{
    A_SYNC = 0x434e5953,
    A_CNXN = 0x4e584e43,
    A_AUTH = 0x48545541,
    A_OPEN = 0x4e45504f,
    A_OKAY = 0x59414b4f,
    A_CLSE = 0x45534c43,
    A_WRTE = 0x45545257,
    A_STLS = 0x534C5453,
}

export const message = parsers.prepare((m: ConvenientMessage) =>
{
    m.dataLength = m.payload?.length || 0;
    m.checksum = ~m.command;
    m.dataChecksum = crc32_compute_buffer(0xEDB88320, Buffer.from(m.payload?.toArray() || []))
    console.log(m);
}, parsers.object<Message>(
    parsers.property('command', parsers.uint32LE),
    parsers.property('arg0', parsers.uint32LE),
    parsers.property('arg1', parsers.uint32LE),
    parsers.property('dataLength', parsers.uint32LE),
    parsers.property('dataChecksum', parsers.uint32LE),
    parsers.property('checksum', parsers.int32LE),
    parsers.property('payload', parsers.buffer('dataLength')),
))

export function connect(identity: { systemtype: 'bootloader' | 'host' | 'device', serialno: string, banner: string }, version = 0x01000000, maxData = 256 * 1024)
{
    const msg: ConvenientMessage = {
        command: Command.A_CNXN,
        arg0: version,
        arg1: maxData,
        payload: IsomorphicBuffer.from(`${identity.systemtype}:${identity.serialno}:${identity.banner}`),
    }
    return IsomorphicBuffer.concat(parserWrite(message, msg, msg))
}

export function startTls(type: uint32, version: uint32)
{
    const msg: ConvenientMessage = {
        command: Command.A_STLS,
        arg0: type,
        arg1: version,
    }
    return IsomorphicBuffer.concat(parserWrite(message, msg, msg))
}

export enum AuthType
{
    Token = 1,
    Signature = 2,
    RsaPublicKey = 3
}

export function auth(type: AuthType, data: IsomorphicBuffer)
{
    const msg: ConvenientMessage = {
        command: Command.A_AUTH,
        arg0: type,
        arg1: 0,
        payload: data,
    }
    // console.log(msg)
    return IsomorphicBuffer.concat(parserWrite(message, msg, msg))
}

export const algorithm = 'RSASSA-PKCS1-v1_5';
export const hashAlgorithm = 'SHA-1'
/**
 * 
 * Common destination naming conventions include:
* "tcp:<host>:<port>" - host may be omitted to indicate localhost
* "udp:<host>:<port>" - host may be omitted to indicate localhost
* "vsock:<CID>:<port>"
* "local-dgram:<identifier>"
* "local-stream:<identifier>"
* "shell" - local shell service
* "upload" - service for pushing files across (like aproto's /sync)
* "fs-bridge" - FUSE protocol filesystem bridge

 * @param localId 
 * @param destination 
 */
export function open(localId: number, destination: IsomorphicBuffer)
{
    const msg: ConvenientMessage = {
        command: Command.A_OPEN,
        arg0: localId,
        arg1: 0,
        payload: destination,
    }
    return IsomorphicBuffer.concat(parserWrite(message, msg, msg))
}

export function ready(localId: number, remoteId: number)
{
    const msg: ConvenientMessage = {
        command: Command.A_OKAY,
        arg0: localId,
        arg1: remoteId,
        payload: new IsomorphicBuffer(0)
    }
    return IsomorphicBuffer.concat(parserWrite(message, msg, msg))
}

export function write(localId: number, remoteId: number, data: IsomorphicBuffer)
{
    const msg: ConvenientMessage = {
        command: Command.A_WRTE,
        arg0: localId,
        arg1: remoteId,
        payload: data,
    }
    return IsomorphicBuffer.concat(parserWrite(message, msg, msg))
}

export function close(localId: number, remoteId: number)
{
    const msg: ConvenientMessage = {
        command: Command.A_CLSE,
        arg0: localId,
        arg1: remoteId,
        payload: new IsomorphicBuffer(0)
    }
    return IsomorphicBuffer.concat(parserWrite(message, msg, msg))
}

export class ADB
{
    private readonly queue: Queue<{ data: IsomorphicBuffer, callback?: () => void }>
    private remoteReady?: () => void;
    private incomingMessage?: ConvenientMessage;
    public readonly streams: (Duplex & { remoteId?: number })[] = [];
    private challenge?: IsomorphicBuffer;
    public remotePublicKey?: CryptoKey;
    private alreadySigned: boolean = false;
    private events: EventEmitter = new EventEmitter();

    constructor(private socket: Socket, private key: CryptoKeyPair)
    {
        this.queue = new Queue(this.send.bind(this));
        socket.on('data', async data =>
        {
            if (this.incomingMessage)
                this.incomingMessage.payload = new IsomorphicBuffer(data);
            else
            {
                const msg = message.read(new IsomorphicBuffer(data), new Cursor(), {});
                if (msg.checksum !== ~msg.command)
                    socket.end();

                this.incomingMessage = msg;
                if (msg.dataLength && (!msg.payload || msg.payload.length == 0))
                {
                    return;
                }
                // console.log(msg);
            }
            const msg = this.incomingMessage!;
            this.incomingMessage = undefined;

            this.events.emit(Command[msg.command], msg);
            console.log({ ...msg, command: Command[msg.command] });
            switch (msg.command)
            {
                case Command.A_SYNC:
                    break;
                case Command.A_AUTH:
                    switch (msg.arg0)
                    {
                        case AuthType.Token:
                            console.log('received authentication request');

                            this.incomingMessage = undefined;
                            if (this.remoteReady)
                                this.remoteReady();
                            this.challenge = msg.payload;
                            if (!this.alreadySigned)
                            {
                                this.alreadySigned = true;
                                this.queue.enqueue({
                                    data: auth(AuthType.Signature, new IsomorphicBuffer(base64.strToUTF8Arr(base64.base64EncArrBuff(await crypto.subtle.sign({
                                        name: algorithm,
                                        hash: hashAlgorithm,
                                    }, this.key.privateKey, msg.payload.toArray()))))),
                                })
                            }
                            else
                            {
                                const key = Buffer.from(await crypto.subtle.exportKey('spki', this.key.publicKey));
                                // console.log(key);
                                // console.log(key.toString('base64'))
                                // console.log(Buffer.from(key.toString('ascii')).toString('base64'));

                                this.queue.enqueue({
                                    data: auth(AuthType.RsaPublicKey, IsomorphicBuffer.from(key.toString("base64") + ' domojs')),
                                })
                            }
                            break;
                        case AuthType.Signature:
                            {
                                if (this.remotePublicKey)
                                {
                                    if (await crypto.subtle.verify(algorithm, this.remotePublicKey, msg!.payload.toArray(), this.challenge.toArray()))
                                    {
                                        console.log('authenticated');
                                    }
                                }
                                else
                                {
                                    const key = Buffer.from(await crypto.subtle.exportKey('spki', this.key.publicKey));
                                    console.log(key);
                                    console.log(key.toString('base64'))
                                    console.log(Buffer.from(key.toString('base64')).toString());
                                    this.queue.enqueue({
                                        data: auth(AuthType.RsaPublicKey, new IsomorphicBuffer(key)),
                                    })
                                }
                            }
                            break;
                        case AuthType.RsaPublicKey:
                            throw new Error('not supported')
                    }

                    break;
                case Command.A_CNXN:
                    console.log('authenticated')
                    console.log(msg.payload.toString('ascii'));
                    if (this.remoteReady)
                        this.remoteReady();
                    break;
                case Command.A_OPEN:
                    break;
                case Command.A_CLSE:
                    this.streams[msg.arg0 - 1].end();
                    this.queue.enqueue({ data: ready(msg.arg0, msg.arg1) });
                    break;
                case Command.A_WRTE:
                    const stream = this.streams[msg.arg1 - 1];
                    stream.push(msg.payload);

                case Command.A_STLS:
                    console.log('Received STLS response:', msg);
                    if (this.remoteReady)
                        this.remoteReady();
                    await this.startTls(msg.arg0, msg.arg1)
                    break;
                case Command.A_OKAY:
                    if (msg.arg1)
                    {
                        const stream = this.streams[msg.arg1 - 1];
                        if (!stream.remoteId)
                            stream.remoteId = msg.arg0;
                    }
                    if (this.remoteReady)
                        this.remoteReady();
            }
        });
    }

    private send(msg: { data: IsomorphicBuffer, callback?: () => void }, next: (processed: boolean) => void)
    {
        if (!this.remoteReady)
        {
            console.log('sending data');
            // console.debug(msg.data);
            this.socket.write(msg.data.toArray(), err =>
            {
                if (err)
                {
                    console.error(err);
                    next(true);
                }
                else if (!this.remoteReady)
                    this.remoteReady = () =>
                    {
                        this.remoteReady = undefined;
                        next(true);
                        if (msg.callback)
                            msg.callback();
                    };
            })
        }
        else
            throw new Error('The remote is not ready to receive a new message');
    }

    public async connect(identity: { systemtype: 'bootloader' | 'host' | 'device', serialno: string, banner: string }, version = 0x01000000, maxData = 256 * 1024)
    {
        new Promise<void>(resolve => this.queue.enqueue({ data: connect(identity, version, maxData), callback: resolve }));
        await new Promise((resolve) => this.events.once(Command[Command.A_CNXN], resolve))
    }

    public async startTls(type: uint32, version: uint32)
    {
        this.queue.enqueue({ data: startTls(type, version) });
    }

    public async auth(type: AuthType, data: IsomorphicBuffer)
    {
        this.queue.enqueue({ data: auth(type, data) });
    }

    /**
     * 
     * Common destination naming conventions include:
    * "tcp:<host>:<port>" - host may be omitted to indicate localhost
    * "udp:<host>:<port>" - host may be omitted to indicate localhost
    * "vsock:<CID>:<port>"
    * "local-dgram:<identifier>"
    * "local-stream:<identifier>"
    * "shell" - local shell service
    * "upload" - service for pushing files across (like aproto's /sync)
    * "fs-bridge" - FUSE protocol filesystem bridge

    * @param destination 
    */
    public open(destination: string)
    {
        if (!~destination.indexOf(':'))
            destination += ':';

        const stream: Duplex & { remoteId?: number } = new Duplex({
            write: (chunk) =>
            {
                this.queue.enqueue({ data: write(localId, stream.remoteId!, chunk) });
            },
            read: (size) => { },
        })
        this.streams.push(stream)
        const localId = this.streams.length;

        this.queue.enqueue({ data: open(localId, IsomorphicBuffer.from(destination)) });

        return stream;
    }
    public ready(localId: number, remoteId: number)
    {
        this.queue.enqueue({ data: ready(localId, remoteId) });
    }

    public write(localId: number, remoteId: number, data: IsomorphicBuffer)
    {
        this.queue.enqueue({ data: write(localId, remoteId, data) });
    }

    public close(localId: number, remoteId: number)
    {
        this.queue.enqueue({ data: close(localId, remoteId) });
    }
}