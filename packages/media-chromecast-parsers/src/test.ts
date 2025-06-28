import net from 'net'
import { Cursor, protobuf } from '@akala/protocol-parser';
import { IsomorphicBuffer } from '@akala/core'
import { describe, it } from 'node:test'

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
            var cast = protobuf.debug.read(IsomorphicBuffer.fromBuffer(buffer), new Cursor());
            console.log(cast);
        });
    });
});
