import * as common from "@domojs/rfx-parsers"
import { Rfy } from "@domojs/rfx-parsers"
import { punch } from 'http-punch-hole'

(async function (host: string, port: number, cmd: Rfy.Internal.Commands)
{
    try
    {
        const socket = await punch(`https://${host}:${port}/serial/ttyUSB0?baud=38400`, 'raw');
        var gw = new common.Rfxtrx(socket)
        await new Promise<void>((resolve, reject) =>
        {
            socket.once('error', reject);
            socket.connect({ port, host }, resolve);
        });
        await gw.start();
        console.log('gateway started')
        console.log(await gw.send(common.Type.RFY.Standard, { command: cmd, unitCode: Rfy.Internal.RfyStandard.UnitCode.Unit3, id1: 0, id2: 0, id3: 3 }));
        socket.end();
    }
    catch (e)
    {
        console.error(e.statusCode);
        console.error(e.statusMessage);
        e.socket.end();
    }
})(process.argv[2], Number.parseInt(process.argv[3]), Rfy.Internal.Commands[process.argv[4] || 'up'])