import * as common from "@domojs/rfx-parsers"
import { Rfy } from "@domojs/rfx-parsers"
import assert = require('assert');
import net from 'net'
import https from 'https'


(async function (host: string, port: number, cmd: Rfy.Internal.Commands)
{
    const socket = net.connect({ host: 'wrt3200acm.dragon-angel.fr', port: 31415 }, async () =>
    {
        var gw = new common.Rfxtrx(socket)
        await new Promise<void>((resolve, reject) =>
        {
            socket.once('error', reject);
            socket.connect({ port, host }, resolve);
        });
        await gw.start();
        console.log(await gw.send(common.Type.RFY.Standard, { command: cmd, unitCode: Rfy.Internal.RfyStandard.UnitCode.Unit3, id1: 0, id2: 0, id3: 3 }))
    });

})(process.argv[2], Number.parseInt(process.argv[3]), Rfy.Internal.Commands[process.argv[4] || 'up'])