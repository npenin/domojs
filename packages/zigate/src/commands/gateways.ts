import { Zigate } from "zigate";
import * as akala from '@akala/core'

export default async function ()
{
    var serials = await Zigate.listEligibleSerials();
    return akala.map(serials, serial => { return { comName: serial.path } });
}