import { registerDeviceType } from '@domojs/devices';
import { State } from '../state'
import fs from 'fs/promises'
import path from 'path';
import { Zigate } from '@domojs/zigate-parsers';
import { CliContext } from '@akala/cli';
import { Container } from '@akala/commands';
import app from '@akala/sidecar'

var setGateway: (gw: Zigate) => void = null;

export default async function (this: State, context: CliContext, container: Container<void>)
{
    this.devicesByAddress = {};
    this.devices = {};
    this.logger = context.logger;

    this.gateway = new Promise((resolve) =>
    {
        setGateway = resolve;
    });
    this.setGateway = async (gw: Zigate) =>
    {
        // await gw.start();
        setGateway(gw);
        return gw;
    };

    await fs.readFile(path.resolve(__dirname, '../../views/device.html'), 'utf-8').then(newDeviceTemplate =>
        registerDeviceType(container, {
            name: 'zigate',
            commandMode: 'static',
            view: newDeviceTemplate
        })
    );

    try
    {
        Zigate.listEligibleSerials().then(async serials =>
        {
            if (serials && serials.length)
                setGateway(await Zigate.getSerial(serials[0]));
        });
    }
    catch (e)
    {
        console.error(e);
    }
    Object.assign(this, await app(context, require.resolve('../../devicetype-app.json')));

    // this.deviceServer = await sidecar()['@domojs/devices'];
}