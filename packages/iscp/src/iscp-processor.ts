import { Container, Metadata, CommandProcessor } from "@akala/commands";
import { logger, MiddlewarePromise } from "@akala/core";
import * as proto from '@akala/protocol-parser'
import { Duplex } from 'stream'
import { EventEmitter } from 'events'
import { parsers } from "@akala/protocol-parser";

const log = logger('domojs:iscp:processor');

export class TimeoutError extends Error
{
    public readonly code = 'TIMEOUT';
    constructor(message?: string)
    {
        super(message || 'Response not received in acceptable time frame');
    }
}

var prot = parsers.prepare(message =>
{
    message.ether = 'ISCP';
    message.hSize = 0x10;
    message.dSize = message.value.length;
    message.version = 1;
}, parsers.object<IscpMessage>(
    parsers.property('ether', parsers.string(4)),
    parsers.property('hSize', parsers.uint32),
    parsers.property('dSize', parsers.uint32),
    parsers.property('version', parsers.uint8),
    parsers.skip(3),
    parsers.property('value', parsers.string<IscpMessage>('dSize')),
));

class IscpMessage
{
    value: string;
    constructor(message: IscpMessage)
    constructor(command: string, arg: string)
    constructor(command: string | IscpMessage, arg?: string)
    {
        if (typeof command == 'string')
            this.value = "!1" + command + arg + '\n';
        else
        {
            this.ether = command.ether;
            this.hSize = command.hSize;
            this.dSize = command.dSize;
            this.version = command.version;
            this.value = command.value;
        }
    }

    public get command()
    {
        return this.value.substr(2, 3);
    }
    public get arg()
    {
        return this.value.substr(5, this.value.length - 6);
    }
    ether = 'ISCP';
    hSize: number;
    dSize: number;
    version: number;
}

export class ISCPProcessor extends CommandProcessor
{
    private messages = new EventEmitter();
    constructor(private socket: Duplex, handler?: (message: IscpMessage) => void)
    {
        super('iscp');
        socket.on('data', data =>
        {
            var response = prot.read(data, new proto.Cursor(), {});
            this.messages.emit('message', new IscpMessage(response));
        });
        if (handler)
            this.messages.on('message', handler);
    }

    handle(container: Container<object>, cmd: Metadata.Command, param: { [key: string]: any; param: string[]; }): MiddlewarePromise
    {
        return new Promise((resolve, reject) =>
        {
            var buffer = prot.write(new IscpMessage(
                cmd.name,
                param.param[0] || ''
            ), undefined);
            var responded = false;
            var handler = (response: IscpMessage) =>
            {
                responded = true;
                if (response.command !== cmd.name)
                    return;
                this.messages.off('message', handler);
                if (response.command == cmd.name && (param.param[0] == 'QSTN' || param.param[0] == response.arg))
                    reject(response);
                else
                    reject(response);
            };
            this.messages.on('message', handler);

            this.socket.write(buffer, (error) =>
            {
                if (error)
                {
                    log.error(error);
                    responded = true;
                    resolve(error);
                }
                log.debug('message written');
                setTimeout(() =>
                {
                    log.warn('timeout');
                    if (!responded)
                    {
                        responded = true;
                        resolve(new TimeoutError())
                    }
                }, 300)
            });
        })
    }
}