import * as common from 'rfxtrx'
import { Rfy } from 'rfxtrx'
import assert = require('assert');

(async function (cmd: Rfy.Internal.Commands)
{
    var s = await common.Rfxtrx.listEligibleSerials()
    assert.notEqual(s.length, 0, 'no eligible device found');
    if (s.length)
    {
        var gw = await common.Rfxtrx.getSerial(s[0])
        await gw.start()
        console.log(await gw.send(common.Type.RFY.Standard, { command: cmd, unitCode: Rfy.Internal.RfyStandard.UnitCode.Unit3, id1: 0, id2: 0, id3: 3 }))
    }
})(Rfy.Internal.Commands[process.argv[2] || 'up'])