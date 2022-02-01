import * as common from "@domojs/rfx-parsers"
import { Rfy } from "@domojs/rfx-parsers"
import https from 'https'


(async function (host: string, port: number, cmd: Rfy.Internal.Commands)
{
    const req = https.request(`https://${host}:${port}/serial/ttyUSB0?baud=38400`, { headers: { connection: 'Upgrade', upgrade: 'raw' } }, async res =>
    {
        if (res.statusCode == 101)
        {
            const socket = res.socket;
            var gw = new common.Rfxtrx(socket)
            await new Promise<void>((resolve, reject) =>
            {
                socket.once('error', reject);
                socket.connect({ port, host }, resolve);
            });
            await gw.start();
            console.log('gateway started')
            console.log(await gw.send(common.Type.RFY.Standard, { command: cmd, unitCode: Rfy.Internal.RfyStandard.UnitCode.Unit3, id1: 0, id2: 0, id3: 3 }))
            res.socket.end();
        }
        else
        {
            console.log(res.statusCode);
            console.log(res.headers);
            req.socket.end();
        }
    });

    req.flushHeaders();
})(process.argv[2], Number.parseInt(process.argv[3]), Rfy.Internal.Commands[process.argv[4] || 'up'])