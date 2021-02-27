import { State } from "../state";
import { RFXDevice, Type } from "rfxtrx";
import { Rfy } from 'rfxtrx';
import interact from '@akala/pm'

export default async function (this: State, unitCode: number, id1: number, id2: number, id3: number, command: keyof typeof Rfy.Commands)
{
    if (typeof (unitCode) == 'undefined')
        interact('please specify unit code', 'unitCode');
    if (typeof (id1) == 'undefined')
        interact('please specify id1', 'id1');
    if (typeof (id2) == 'undefined')
        interact('please specify id2', 'id2');
    if (typeof (id3) == 'undefined')
        interact('please specify id3', 'id3');
    if (typeof (command) == 'undefined')
        interact('please specify command', 'command');

    var message: Partial<RFXDevice> = { command: Rfy.Commands[command], unitCode, id1, id2, id3 };
    return (await this.gateway).send<RFXDevice>(Type.RFY.Standard, message);
}