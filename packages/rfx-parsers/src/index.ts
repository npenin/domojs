/*
Copyright 2011-2019, RFXCOM
ALL RIGHTS RESERVED.
The RFXtrx protocol is owned by RFXCOM, and is protected under
Netherlands Copyright Laws and Treaties and shall be subject to the 
exclusive jurisdiction of the Netherlands Courts. The information from this
file may freely be used to create programs to exclusively interface with
RFXCOM products only.
The above copyright notice shall be included in all copies or substantial
portions of this file.
'----------------------------------------------------------------------------
*/
import { EventEmitter } from 'events';
import { Queue, log as debug, eachAsync } from '@akala/core';
export * from './protocol'
import * as usb from 'usb'
import SerialPort from 'serialport'
import * as os from 'os';
import { Protocol, Message, PacketType, Type, InterfaceControl, InterfaceMessage, EventMap, Rfy, RFXDevice } from './protocol';
import { Cursor, parserWrite } from '@domojs/protocol-parser';
import { Duplex } from 'stream';
import { readdir } from 'fs';

const log = debug('rfxtrx');

export class Rfxtrx extends EventEmitter
{
    private static emptyBuffer = Buffer.allocUnsafe(0);

    private chunk: Buffer;
    private isOpen = false;
    private sendQueue: Queue<{ buffer: Buffer, callback: (err) => void }> = new Queue((message, next) =>
    {
        if (this.isOpen)
        {
            this.wire.write(message.buffer)
            this.wire.drain(message.callback);
        }
        next(this.isOpen);
    })
    private queue: Queue<Buffer> = new Queue((buffer, next) =>
    {
        log('processing queue')
        if (buffer == Rfxtrx.emptyBuffer)
        {
            buffer = this.chunk;

            log('splitting buffer', buffer);

            let offset = 0;
            while (buffer.length > offset + buffer[offset] + 1)
            {
                this.queue.enqueue(buffer.slice(offset, buffer[offset] + 1));
                offset += buffer[offset] + 1;
                log('frame complete');
            }
            if (buffer.length < offset + buffer[offset] + 1)
            {
                log('incomplete frame', buffer.slice(offset));

                this.chunk = buffer.slice(offset);
                next(true);
                return;
            }
            this.chunk = undefined;
        }

        log(buffer);
        var message = Protocol.read(buffer, new Cursor(), {});
        this.sqnce = message.sequenceNumber;
        log(message);
        this.emit('message', message);
        next(true);
    });
    public constructor(private wire: Duplex & { close(cb: (err?: any) => void), drain(cb: (err?: any) => void), flush(cb: (err?: any) => void) })
    {
        super();

        this.wire.on('error', function (err)
        {
            log(err);
        })
        this.wire.on('open', () =>
        {
            this.isOpen = true;
            this.sendQueue.process();
        })
        this.wire.on('data', (buffer: Buffer) =>
        {
            if (typeof (this.chunk) != 'undefined')
                this.chunk = Buffer.concat([this.chunk, buffer]);
            else
                this.chunk = buffer;

            this.queue.enqueue(Rfxtrx.emptyBuffer);
        })
        this.on('message', (message: Message) =>
        {
            this.emit(message.type.toString(), message.message);

            this.emit(PacketType[(message.type & 0xff00) >> 8] as keyof PacketType, message.message);
            this.emit(Type[PacketType[(message.type & 0xff00) >> 8]][message.type], message.message);
        })
    }

    private isStarted: boolean;

    start(modes?: Partial<InterfaceControl.ModeCommand>)
    {
        modes = modes || {}
        if (typeof (modes.msg3) == 'undefined')
            modes.msg3 = 0;
        if (typeof (modes.msg4) == 'undefined')
            modes.msg4 = 0;
        if (typeof (modes.msg5) == 'undefined')
            modes.msg5 = 0;
        if (typeof (modes.msg6) == 'undefined')
            modes.msg6 = 0;
        return new Promise<void>(async (resolve, reject) =>
        {
            await this.send(Type.INTERFACE_CONTROL.Mode, {
                command: InterfaceControl.Commands.reset
            })
            var m = await this.send(Type.INTERFACE_CONTROL.Mode, {
                command: InterfaceControl.Commands.status
            });
            log(modes);
            log(m);
            if (
                (m.message.msg3 & modes.msg3) != modes.msg3 ||
                (m.message.msg4 & modes.msg4) != modes.msg4 ||
                (m.message.msg5 & modes.msg5) != modes.msg5 ||
                (m.message.msg6 & modes.msg6) != modes.msg6
            )
            {
                m = await this.send(Type.INTERFACE_CONTROL.Mode, Object.assign({
                    command: InterfaceControl.Commands.setMode,
                }, modes));

                if (
                    (m.message.msg3 & modes.msg3) != modes.msg3 ||
                    (m.message.msg4 & modes.msg4) != modes.msg4 ||
                    (m.message.msg5 & modes.msg5) != modes.msg5 ||
                    (m.message.msg6 & modes.msg6) != modes.msg6
                )
                {
                    this.close()
                    reject(new Error('Modes could not be set; Exiting'));
                    return;
                }

                var copyright: Message<InterfaceMessage.CheckRFXCOMDevice> = await this.send(Type.INTERFACE_CONTROL.Mode, { command: InterfaceControl.Commands.start });
                console.log(copyright);
                if (copyright.message.copyright != 'Copyright RFXCOM')
                {
                    this.close()
                    reject(new Error('Invalid RFXCOM devince; Exiting'));
                    return;
                }
                else
                {
                    this.isStarted = true;
                    resolve();
                }
            }
            else
            {
                var copyright: Message<InterfaceMessage.CheckRFXCOMDevice> = await this.send(Type.INTERFACE_CONTROL.Mode, { command: InterfaceControl.Commands.start });
                if (copyright.message.copyright != 'Copyright RFXCOM')
                {
                    this.close()
                    reject(new Error('Invalid RFXCOM devince; Exiting'));
                    return;
                }
                else
                {
                    this.isStarted = true;
                    resolve();
                }
            }
        })
    }

    public on<T>(type: keyof Type.INTERFACE_MESSAGE, handler: (message: T) => void)
    public on<T>(type: Type.INTERFACE_MESSAGE, handler: (message: T) => void)
    public on<T extends keyof EventMap>(type: T, handler: (message: EventMap[T]) => void)
    public on(eventName: 'message', handler: (message: Message) => void)
    public on(eventName: 'message' | keyof Type.INTERFACE_MESSAGE | Type.INTERFACE_MESSAGE | keyof PacketType, handler: (message: Message<any>) => void)
    {
        super.on(eventName.toString(), handler);
    }

    public once<T>(type: keyof Type.INTERFACE_MESSAGE, handler: (message: T) => void)
    public once<T>(type: Type.INTERFACE_MESSAGE, handler: (message: T) => void)
    public once(eventName: 'message', handler: (message: Message) => void)
    public once(eventName: 'message' | keyof Type.INTERFACE_MESSAGE | Type.INTERFACE_MESSAGE, handler: (message: Message<any>) => void)
    {
        super.once(eventName.toString(), handler);
    }

    private sqnce: number = 0;

    public close(): Promise<void>
    {
        return new Promise((resolve, reject) =>
        {
            this.wire.close(function (err)
            {
                if (err)
                    reject(err);
                else
                    resolve();
            });
        })
    }

    public send(type: Type.INTERFACE_CONTROL, message?: Partial<InterfaceControl.ModeCommand>)
    public send(type: Type.RFY, message?: Partial<Rfy.Device>)
    public send<T extends RFXDevice>(type: number, message?: Partial<T>)
    public send<T extends RFXDevice>(type: number, message?: Partial<T>)
    {
        var msg: Message<Partial<T>> = { type: type, message: message, sequenceNumber: this.sqnce++ };
        log(msg);
        var buffer = Buffer.concat(parserWrite(Protocol, msg));
        return new Promise<Message<any>>((resolve, reject) =>
        {
            log(buffer);
            if (type != Type.INTERFACE_CONTROL.Mode || (message as Partial<InterfaceControl.ModeCommand>).command != InterfaceControl.Commands.reset)
                this.once('message', resolve);
            var cb = (err) =>
            {
                if (err)
                    reject(err);
                else
                {
                    if (type == Type.INTERFACE_CONTROL.Mode && (message as Partial<InterfaceControl.ModeCommand>).command == InterfaceControl.Commands.reset)
                        setTimeout(() =>
                        {
                            this.wire.flush(function (err)
                            {
                                if (err)
                                    reject(err);
                                else
                                    resolve(null);
                            });
                        }, 1000)
                }
            };
            this.sendQueue.enqueue({ buffer: buffer, callback: cb });
        })
    }

    public static getSerial(path?: string)
    {
        return new Promise<Rfxtrx>((resolve, reject) =>
        {
            if (!path)
                Rfxtrx.listEligibleSerials().then(devices =>
                {
                    if (devices.length == 0)
                        return reject('no matching port could be found');
                    if (devices.length > 1)
                        return reject('multiple RFXCOM adapters found');
                    resolve(new Rfxtrx(new SerialPort(devices[0], { baudRate: 38400, })));
                });
            else
                resolve(new Rfxtrx(new SerialPort(path, { baudRate: 38400, })));
        });
    }

    public static async listEligibleSerials(): Promise<string[]>
    {
        const devices = usb.getDeviceList().filter(d => d.deviceDescriptor.idVendor == 1027 && d.deviceDescriptor.idProduct == 24577);
        const result: usb.Device[] = [];
        await eachAsync(devices, (d, i, next) =>
        {
            d.open();
            d.getStringDescriptor(d.deviceDescriptor.iManufacturer, function (error, data)
            {
                if (data.toString() == 'RFXCOM')
                    result.push(d);
                d.close();
                next();
            });
        });
        if (os.platform() == "linux" && result.length > 0)
        {
            const serials: string[] = [];
            await eachAsync(result, (d, i, next) =>
            {
                readdir('/sys/bus/usb/devices/' + d.busNumber + '-' + d.portNumbers.join('.') + '/' + d.busNumber + '-' + d.portNumbers.join('.') + ':1.0', function (err, files)
                {

                    if (files)
                    {
                        var tty = files.find(f => f.startsWith('tty'));
                        if (tty)
                            serials.push('/dev/' + tty);
                    }
                    next(err);
                });
            });

            return serials;
        }
        return (await SerialPort.list()).filter(port => port.manufacturer && port.manufacturer == 'RFXCOM').map(sp => sp.path);
    }
}