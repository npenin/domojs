import { sidecar } from '@akala/pm';
import { registerDeviceType } from '@domojs/devices';
import { State } from '../state'
import fs from 'fs/promises'
import path from 'path';
import { Zigate } from '@domojs/zigate-parsers';

export default async function (this: State)
{
    this.devices = {};
    this.devicesByAddress = {};


    await fs.readFile(path.resolve(__dirname, '../../views/device.html'), 'utf-8').then(newDeviceTemplate =>
        registerDeviceType({
            name: 'zigate',
            commandMode: 'static',
            view: newDeviceTemplate
        })
    );

    this.gateway = Zigate.listEligibleSerials().then(serials =>
    {
        if (serials && serials.length)
            return Zigate.getSerial(serials[0].path);
    })

    // this.deviceServer = await sidecar()['@domojs/devices'];
}