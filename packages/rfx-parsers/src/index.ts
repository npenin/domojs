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
import { Queue, logger, eachAsync } from '@akala/core';
export * from './protocol'
import * as os from 'os';
import { Protocol, Message, PacketType, Type, InterfaceControl, InterfaceMessage, EventMap, Rfy, RFXDevice } from './protocol';
import { Cursor, parserWrite } from '@domojs/protocol-parser';
import { Duplex } from 'stream';
import { readdir } from 'fs';
import { Socket } from 'net';
import { ModeResponse } from './protocol/1.interface.response';
import { Gateway } from '@domojs/devices'

type Modes = Pick<InterfaceControl.ModeCommand, 'msg3' | 'msg4' | 'msg5' | 'msg6'>;
const log = logger('rfxtrx');

export class Rfxtrx extends Gateway
{
    protected splitBuffer(buffer: Buffer): Buffer[]
    {
        const buffers = [];
        for (let offset = 0; buffer.length > offset + buffer[offset] + 1; offset += buffer[offset + 1])
        {
            buffers.push(buffer.slice(offset, buffer[offset] + 1));
            log.debug('frame complete');
        }
        return buffers;
    }
    protected isCompleteFrame(buffer: Buffer): boolean
    {
        return buffer.length < buffer[0] + 1
    }
    protected processFrame(buffer: Buffer): void | Promise<void>
    {
        var message = Protocol.read(buffer, new Cursor(), {});
        // this.sqnce = message.sequenceNumber;
        log.info(message);
        this.emit('message', message);

    }

    private _modes: Modes;
    public get modes() { return Object.assign({}, this._modes); }
    public constructor(wire: Socket | Duplex & { close(cb: (err?: any) => void), drain?(cb: (err?: any) => void), flush(cb: (err?: any) => void) }, isSocketAlreadyOpen?: boolean)
    {
        super(wire, isSocketAlreadyOpen);
    }

    async setModes(modes: Modes)
    {
        var m: Message<ModeResponse> = await this.send(Type.INTERFACE_CONTROL.Mode, Object.assign({
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
            throw new Error('Modes could not be set; Exiting');
        }
        else
            this._modes = m.message;
    }

    async start()
    {
        await this.send(Type.INTERFACE_CONTROL.Mode, {
            command: InterfaceControl.Commands.reset
        })
        var m: Message<ModeResponse> = await this.send(Type.INTERFACE_CONTROL.Mode, {
            command: InterfaceControl.Commands.status
        });
        await new Promise<void>(resolve => setTimeout(() => resolve(), 1000))

        log.info(m);
        this._modes == m.message;

        await new Promise<void>(resolve => setTimeout(() => resolve(), 1000))
        var copyright: Message<InterfaceMessage.CheckRFXCOMDevice> = await this.send(Type.INTERFACE_CONTROL.Mode, { command: InterfaceControl.Commands.start });
        if (copyright.message.copyright != 'Copyright RFXCOM')
        {
            this.close()
            throw new Error(`Invalid RFXCOM device ${copyright.message.copyright}; Exiting`);
        }
    }

    public on<T>(type: keyof Type.INTERFACE_MESSAGE, handler: (message: T) => void): this
    public on<T>(type: Type.INTERFACE_MESSAGE, handler: (message: T) => void): this
    public on<T extends keyof EventMap>(type: T, handler: (message: EventMap[T]) => void): this
    public on(eventName: 'message', handler: (message: Message) => void): this
    public on(eventName: 'message' | keyof Type.INTERFACE_MESSAGE | Type.INTERFACE_MESSAGE | keyof PacketType, handler: (message: Message<any>) => void): this
    {
        return super.on(eventName.toString(), handler);
    }

    public once<T>(type: keyof Type.INTERFACE_MESSAGE, handler: (message: T) => void): this
    public once<T>(type: Type.INTERFACE_MESSAGE, handler: (message: T) => void): this
    public once(eventName: 'message', handler: (message: Message) => void): this
    public once(eventName: 'message' | keyof Type.INTERFACE_MESSAGE | Type.INTERFACE_MESSAGE, handler: (message: Message<any>) => void): this
    {
        return super.once(eventName.toString(), handler);
    }

    public send(type: Type.INTERFACE_CONTROL, message?: Partial<InterfaceControl.ModeCommand>): Promise<Message<any>>
    public send(type: Type.RFY, message?: Partial<Rfy.Device>): Promise<Message<any>>
    public send<T extends RFXDevice>(type: number, message?: Partial<T>): Promise<Message<any>>
    public send<T extends RFXDevice>(type: number, message?: Partial<T>): Promise<Message<any>>
    {
        var msg: Message<Partial<T>> = { type: type, message: message, sequenceNumber: this.sqnce++ };
        log.info(msg);
        var buffer = Buffer.concat(parserWrite(Protocol, msg));
        return new Promise<Message<any>>((resolve, reject) =>
        {
            log.debug(buffer);
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
                            this.flush().then(() => resolve(null), reject)
                        }, 1000)
                }
            };
            this.sendQueue.enqueue({ buffer: buffer, callback: cb });
        })
    }

    public static async getSerial(path?: string)
    {
        const { default: SerialPort } = await import('serialport');

        return await new Promise<Rfxtrx>((resolve, reject) =>
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
        const { getDeviceList } = await import('usb');
        const devices = getDeviceList().filter(d => d.deviceDescriptor.idVendor == 1027 && d.deviceDescriptor.idProduct == 24577);
        const result = [];
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
        try
        {
            const { default: SerialPort } = await import('serialport');

            return (await SerialPort.list()).filter(port => port.manufacturer && port.manufacturer == 'RFXCOM').map(sp => sp.path);
        }
        catch (e)
        {
            if (e.code !== 'MODULE_NOT_FOUND')
                throw e;
        }
    }
}