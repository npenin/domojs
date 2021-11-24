import { Container } from '@akala/commands'
import { ISCPProcessor } from '../iscp-processor'
import { Socket } from 'net'

export default function (target: string)
{
    var socket = new Socket();
    socket.on('error', function (err)
    {
        console.log(err);
    })
    socket.connect({ host: target, port: 60128 }, async () =>
    {
        var container = new Container<object>('iscp', {}, new ISCPProcessor(socket));
        console.log(await container.dispatch('PWR', '01'));
        socket.end();
    })
}