import { IsomorphicBuffer } from "@akala/core";
import { Protocol, Rfy, Type } from "../protocol/index.js"
import { describe, it } from 'node:test'

describe('rfy', function ()
{
    it('should read and parse', function ()
    {
        console.log(IsomorphicBuffer.concat(Protocol.write({
            type: Type.RFY.Standard, sequenceNumber: 5, message: {
                command: Rfy.Commands.down, id1: 0, id2: 0, id3: 3,
                unitCode: 3,
                rssi: 0
            } as Rfy.Device
        }, {
            type: Type.RFY.Standard, sequenceNumber: 5, message: {
                command: Rfy.Commands.down, id1: 0, id2: 0, id3: 3,
                unitCode: 3,
                rssi: 0
            } as Rfy.Device
        })));
    })
})