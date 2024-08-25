import { registerDeviceType } from '@domojs/devices';
import { State } from '../state.js'
import fs from 'fs/promises'
import path from 'path';
import { Zigate } from '@domojs/zigate-parsers';
import { CliContext } from '@akala/cli';
import { Container } from '@akala/commands';
import app from '@akala/sidecar'
import { fileURLToPath } from 'url'

var setGateway: (gw: Zigate) => void = null;

export default async function (this: State, context: CliContext<{ debug: boolean }>, container: Container<void>, signal: AbortSignal)
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
        signal?.addEventListener('abort', () => gw.close())
        await gw.start(context.options.debug);
        setGateway(gw);
        return gw;
    };

    await fs.readFile(fileURLToPath(new URL('../../views/device.html', import.meta.url)), 'utf-8').then(newDeviceTemplate =>
        registerDeviceType(container, signal, {
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
    // Object.assign(this, await app(context, fileURLToPath(new URL('../../devicetype-app.json', import.meta.url))));

    // this.deviceServer = await sidecar()['@domojs/devices'];
}