import { State } from "../state";
import * as usb from 'usb';
import * as akala from '@akala/server';
import { Rfxtrx } from 'rfxtrx';
import * as fs from 'fs/promises';
import { registerDeviceType } from '@domojs/devices';

var state: State = null;
var setGateway: (gw: Rfxtrx) => void = null;

export default async function init(this: State)
{
    state = this;
    state.devices = {};
    this.gateway = new Promise((resolve) =>
    {
        setGateway = resolve;
    })

    await fs.readFile(require.resolve('../../views/new-RFY.html'), 'utf-8').then(newDeviceTemplate =>
        registerDeviceType({
            name: 'RFY',
            view: newDeviceTemplate,
            commandMode: 'static'
        }));

    try
    {
        addDeviceIfMatch();
        usb.on('attach', function ()
        {
            akala.logger.info('detected new usb device');
            addDeviceIfMatch();
        });
    }
    catch (e)
    {
        console.error(e);
    }
}


async function addDeviceIfMatch()
{
    var serials = await Rfxtrx.listEligibleSerials();
    if (serials.length > 0)
    {
        var device = serials[0]
        akala.logger.info('idenfified a RFXCOM potential serial device');
        setGateway(await Rfxtrx.getSerial(device))
        try
        {
            usb.on('detach', async function ()
            {
                var newSerials = await Rfxtrx.listEligibleSerials();
                if (newSerials.length == 0 || newSerials.indexOf(device) === -1)
                    state.gateway = new Promise((resolve) =>
                    {
                        setGateway = resolve;
                    });
            });
        }
        catch (e)
        {
            console.error('detaching is not supported on this platform');
        }
    }
}

init.$inject = ['container', 'options.path']
