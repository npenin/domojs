import { Container } from '@akala/commands'
import { ISCPProcessor } from '../iscp-processor'
import * as net from 'net'

export default function (target: string)
{
    var socket = new net.Socket();
    var container = new Container<object>('iscp', {}, new ISCPProcessor(socket));
    socket.connect({ host: target, port: 60128 }, async () =>
    {
        console.log(await container.dispatch('PWR', '00'));
        socket.end();
    })

}