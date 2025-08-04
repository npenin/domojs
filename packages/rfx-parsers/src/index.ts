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
import { logger, eachAsync, IsomorphicBuffer, IEvent } from '@akala/core';
export * from './protocol/index.js'
import * as os from 'os';
import { Protocol, Message, PacketType, Type, InterfaceControl, InterfaceMessage, Rfy, RFXDevice } from './protocol/index.js';
import { Cursor, parserWrite } from '@akala/protocol-parser';
import { Duplex } from 'stream';
import { readdir } from 'fs/promises';
import { Socket } from 'net';
import { ModeResponse } from './protocol/1.interface.response.js';
import { Gateway } from '@domojs/devices'
import { EmitPower, Frequences } from './protocol/0.interface.mode.js';

type Modes = Pick<InterfaceControl.ModeCommand, 'msg3' | 'msg4' | 'msg5' | 'msg6'>;
const log = logger('rfxtrx');

export class Rfxtrx extends Gateway<{ message: IEvent<[Message<any>], void> } & { [key in ((keyof typeof Type.INTERFACE_MESSAGE) | (keyof typeof PacketType) | PacketType)]: IEvent<[Message<any>['message']], void> }>
{
    protected splitBuffer(buffer: IsomorphicBuffer): IsomorphicBuffer[]
    {
        const buffers = [];
        let offset = 0
        for (; buffer.length >= offset || buffer.length > offset + buffer.readUInt8(offset) + 1; offset += buffer.readUInt8(offset) + 1)
        {
            buffers.push(buffer.subarray(offset, offset + buffer.readUInt8(offset) + 1));
            log.debug('frame complete');
        }
        if (offset != buffer.length)
            buffers.push(buffer.subarray(offset));
        return buffers;
    }
    protected isCompleteFrame(buffer: IsomorphicBuffer): boolean
    {
        return buffer.length == buffer.readUInt8(0) + 1
    }
    protected processFrame(buffer: IsomorphicBuffer): void | Promise<void>
    {
        const message = Protocol.read(buffer, new Cursor(), {});
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

    private _frequence: Frequences;
    private _emitPower: EmitPower;

    public get frequence() { return this._frequence; }
    public get emitPower() { return this._emitPower; }

    async setModes(modes: Modes)
    {
        var m: Message<ModeResponse> = await this.send(Type.INTERFACE_CONTROL.Mode, {
            command: InterfaceControl.Commands.setMode,
            emitPower: this._emitPower,
            frequenceSelection: this._frequence,
            msg3: modes.msg3,
            msg4: modes.msg4,
            msg5: modes.msg5,
            msg6: modes.msg6,
        });

        if (
            (m.message.msg3 & modes.msg3) != modes.msg3 ||
            (m.message.msg4 & modes.msg4) != modes.msg4 ||
            (m.message.msg5 & modes.msg5) != modes.msg5 ||
            (m.message.msg6 & modes.msg6) != modes.msg6
        )
        {
            await this.stop()
            throw new Error('Modes could not be set; Exiting');
        }
        else
            this._modes = m.message;

        return m.message;
    }

    async start(abort?: AbortSignal)
    {
        await this.send(Type.INTERFACE_CONTROL.Mode, {
            command: InterfaceControl.Commands.reset
        })
        var m: Message<ModeResponse> = await this.send(Type.INTERFACE_CONTROL.Mode, {
            command: InterfaceControl.Commands.status
        });
        await new Promise<void>(resolve => setTimeout(() => resolve(), 1000))

        log.info(m.message);
        this._modes = m.message;
        this._emitPower = m.message.emitPower;
        this._frequence = m.message.transceiverType;

        await new Promise<void>(resolve => setTimeout(() => resolve(), 1000))
        var copyright: Message<InterfaceMessage.CheckRFXCOMDevice> = await this.send(Type.INTERFACE_CONTROL.Mode, { command: InterfaceControl.Commands.start });
        if (copyright.message.copyright != 'Copyright RFXCOM')
        {
            this.close()
            throw new Error(`Invalid RFXCOM device ${copyright.message.copyright}; Exiting`);
        }
        if (m.message.msg3 & InterfaceControl.protocols_msg3.DisplayRaw)
            this.on('message', m => console.log(m));

        await super.start(abort);
    }

    public send(type: Type.INTERFACE_CONTROL, message?: Partial<InterfaceControl.ModeCommand>): Promise<Message<any>>
    public send(type: Type.RFY, message?: Partial<Rfy.Device>): Promise<Message<any>>
    public send<T extends RFXDevice>(type: number, message?: Partial<T>): Promise<Message<any>>
    public send<T extends RFXDevice>(type: number, message?: Partial<T>): Promise<Message<any>>
    {
        const msg: Message<Partial<T>> = { type: type, message: message, sequenceNumber: this.sqnce++ };
        log.info(msg);
        const buffer = parserWrite(Protocol, msg);
        return new Promise<Message<any>>((resolve, reject) =>
        {
            log.debug(buffer);
            if (type != Type.INTERFACE_CONTROL.Mode || (message as Partial<InterfaceControl.ModeCommand>).command != InterfaceControl.Commands.reset)
                this.once('message', resolve);
            if (type == Type.RFY.Standard || type == Type.RFY.Extended || type == Type.RFY.ASA && (message as Partial<Rfy.Device>).command == Rfy.Internal.Commands.List)
                var cb = (err) =>
                {
                    if (err)
                        reject(err);
                    else
                        resolve(null);
                }
            else
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
        const { SerialPort } = await import('serialport');

        return await new Promise<Rfxtrx>((resolve, reject) =>
        {
            if (!path)
                Rfxtrx.listEligibleSerials().then(devices =>
                {
                    if (devices.length == 0)
                        return reject('no matching port could be found');
                    if (devices.length > 1)
                        return reject('multiple RFXCOM adapters found');
                    resolve(new Rfxtrx(new SerialPort({ path: devices[0], baudRate: 38400, })));
                });
            else
                resolve(new Rfxtrx(new SerialPort({ path, baudRate: 38400, })));
        });
    }

    public static async listEligibleSerials(): Promise<string[]>
    {
        const { getDeviceList } = await import('usb');
        const devices = getDeviceList().filter(d => d.deviceDescriptor.idVendor == 1027 && d.deviceDescriptor.idProduct == 24577);
        const result = [];
        await eachAsync(devices, (d, i) =>
        {
            d.open();
            return new Promise(next => d.getStringDescriptor(d.deviceDescriptor.iManufacturer, function (error, data)
            {
                if (data.toString() == 'RFXCOM')
                    result.push(d);
                d.close();
                next();
            }));
        });
        if (os.platform() == "linux" && result.length > 0)
        {
            const serials: string[] = [];
            await eachAsync(result, async (d, i) =>
            {
                const files = await readdir('/sys/bus/usb/devices/' + d.busNumber + '-' + d.portNumbers.join('.') + '/' + d.busNumber + '-' + d.portNumbers.join('.') + ':1.0');

                if (files)
                {
                    var tty = files.find(f => f.startsWith('tty'));
                    if (tty)
                        serials.push('/dev/' + tty);
                }
            });

            return serials;
        }
        try
        {
            const { SerialPort } = await import('serialport');

            return (await SerialPort.list()).filter(port => port.manufacturer && port.manufacturer == 'RFXCOM').map(sp => sp.path);
        }
        catch (e)
        {
            if (e.code !== 'MODULE_NOT_FOUND')
                throw e;
        }
    }
}