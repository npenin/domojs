import { registerDeviceType } from '@domojs/devices';
import { State } from '../state'
import fs from 'fs/promises'
import path from 'path';
import { Zigate } from '@domojs/zigate-parsers';
import { Container } from '@akala/commands';

export default async function (this: State, container: Container<void>)
{
    this.devices = {};
    this.devicesByAddress = {};


    await fs.readFile(path.resolve(__dirname, '../../views/device.html'), 'utf-8').then(newDeviceTemplate =>
        registerDeviceType(container, {
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