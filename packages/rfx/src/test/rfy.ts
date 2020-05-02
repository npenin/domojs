import * as common from 'rfxtrx'
import * as rfy from 'rfxtrx/dist/rfy'
import assert = require('assert');

(async function (cmd: rfy.Internal.Commands)
{
    var s = await common.Rfxtrx.listEligibleSerials()
    assert.notEqual(s.length, 0, 'no eligible device found');
    if (s.length)
    {
        var gw = await common.Rfxtrx.getSerial(s[0].path)
        await gw.start()
        console.log(await gw.send(common.Type.RFY.Standard, { command: cmd, unitCode: rfy.Internal.RfyStandard.UnitCode.Unit3, id1: 0, id2: 0, id3: 3 }))
    }
})(rfy.Internal.Commands[process.argv[2] || 'up'])