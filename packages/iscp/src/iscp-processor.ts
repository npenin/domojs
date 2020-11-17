import { CommandNameProcessor } from "@akala/commands";
import { log as debug } from "@akala/core";
import * as proto from '@domojs/protocol-parser'
import { Duplex } from 'stream'
import { EventEmitter } from 'events'

const log = debug('domojs:iscp:processor');

var prot = new proto.Protocol<IscpMessage>([
    { name: 'ether', type: 'string', length: 4 },
    { name: 'hSize', type: 'uint32' },
    { name: 'dSize', type: 'uint32' },
    { name: 'version', type: 'uint8' },
    { name: 'dummy', type: 'uint8' },
    { name: 'dummy', type: 'uint8' },
    { name: 'dummy', type: 'uint8' },
    { name: 'value', type: 'string', length: -5 },
], (message =>
{
    message.ether = 'ISCP';
    message.hSize = 0x10;
    message.dSize = message.value.length;
    message.version = 1;
}));

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
    hSize?: number;
    dSize?: number;
    version?: number;
    dummy?: number;
}

export class ISCPProcessor<T> extends CommandNameProcessor<T>
{
    private messages = new EventEmitter();
    constructor(private socket: Duplex, handler?: (message: IscpMessage) => void)
    {
        super('iscp');
        socket.on('data', data =>
        {
            var response = prot.read(data);
            this.messages.emit('message', new IscpMessage(response));
        });
        if (handler)
            this.messages.on('message', handler);
    }

    process(cmd: string, param: { [key: string]: any; param: any[]; })
    {
        return new Promise((resolve, reject) =>
        {
            var buffer = prot.write(new IscpMessage(
                cmd,
                param.param[0]
            ));
            var responded = false;
            var handler = (response: IscpMessage) =>
            {
                responded = true;
                if (response.command !== cmd)
                    return;
                this.socket.off('data', handler);
                if (response.command == cmd && (param.param[0] == 'QSTN' || param.param[0] == response.arg))
                    resolve(response);
                else
                    reject(response);
            };
            this.messages.on('message', handler);

            this.socket.write(buffer, (error) =>
            {
                if (error)
                {
                    log(error.toString());
                    responded = true;
                    reject(error);
                }
            });

            setTimeout(() =>
            {
                log('timeout');
                if (!responded)
                {
                    responded = true;
                    reject(new Error('Timeout'))
                }
            }, 300)
        })
    }
}