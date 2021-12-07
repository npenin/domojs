import * as parsers from './index'
import net from 'net'
import { Cursor, protobuf } from '@domojs/protocol-parser';

describe('cast', function ()
{
    it('should work', async function ()
    {
        const socket = await new Promise<net.Socket>((resolve, reject) =>
        {
            var socket = net.connect(8009, '10.68.3.223', function ()
            {
                resolve(socket);
            });
            socket.on('error', reject);
        });
        socket.on('data', function (buffer)
        {
            var cast = protobuf.debug.read(buffer, new Cursor());
            console.log(cast);
        });
    });
});
