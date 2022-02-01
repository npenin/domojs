import { State } from "../state";
import * as akala from '@akala/core';
import { Rfxtrx } from "@domojs/rfx-parsers";
import * as path from 'path'
import * as fs from 'fs/promises';
import { registerDeviceType } from '@domojs/devices';
import { usb as usbType } from 'usb'

var state: State = null;
var setGateway: (gw: Rfxtrx) => void = null;
const logger = akala.log('@domojs/rfx');

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
        const { usb } = await import('usb')
        await addDeviceIfMatch(usb);
        usb.on('attach', function ()
        {
            logger('detected new usb device');
            addDeviceIfMatch(usb);
        });
    }
    catch (e)
    {
        console.error(e);
    }

    return p;
}


async function addDeviceIfMatch(usb: typeof usbType)
{
    var serials = await Rfxtrx.listEligibleSerials();
    if (serials && serials.length > 0)
    {
        var device = serials[0]
        logger('idenfified a RFXCOM potential serial device');
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
        logger('no RFXCOM device found');
}

init.$inject = ['container', 'options.path']
