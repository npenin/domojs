import { State } from "../state";
import * as usb from 'usb';
import * as akala from '@akala/server';
import { Rfxtrx } from 'rfxtrx';
import * as path from 'path'
import * as fs from 'fs/promises';
import { registerDeviceType } from '@domojs/devices';

var state: State = null;
var setGateway: (gw: Rfxtrx) => void = null;
const logger = akala.logger('@domojs/rfx');

export default async function init(this: State)
{
    state = this;
    state.devices = {};
    this.gateway = new Promise((resolve) =>
    {
        setGateway = resolve;
    });
    this.setGateway = async (gw: Rfxtrx) =>
    {
        await gw.start();
        setGateway(gw);
        return gw;
    };

    var p = fs.readFile(path.resolve(__dirname, '../../../views/new-RFXCOM.html'), 'utf-8').then(newDeviceTemplate =>
        registerDeviceType({
            name: 'RFXCOM',
            view: newDeviceTemplate,
            commandMode: 'static'
        }));

    var p = fs.readFile(path.resolve(__dirname, '../../../views/new-RFY.html'), 'utf-8').then(newDeviceTemplate =>
        registerDeviceType({
            name: 'RFY',
            view: newDeviceTemplate,
            commandMode: 'static'
        }));

    try
    {
        await addDeviceIfMatch();
        usb.on('attach', function ()
        {
            logger.info('detected new usb device');
            addDeviceIfMatch();
        });
    }
    catch (e)
    {
        console.error(e);
    }

    return p;
}


async function addDeviceIfMatch()
{
    var serials = await Rfxtrx.listEligibleSerials();
    if (serials.length > 0)
    {
        var device = serials[0]
        logger.info('idenfified a RFXCOM potential serial device');
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
    else
        logger.info('no RFXCOM device found');
}

init.$inject = ['container', 'options.path']
