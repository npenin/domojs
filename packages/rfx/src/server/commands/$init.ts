import { State } from "../state";
import * as akala from '@akala/core';
import { Rfxtrx } from "@domojs/rfx-parsers";
import * as path from 'path'
import * as fs from 'fs/promises';
import { registerDeviceType } from '@domojs/devices';
import { usb as usbType } from 'usb'
import { Container } from "@akala/commands";

var state: State = null;
var setGateway: (gw: Rfxtrx) => void = null;
const logger = akala.logger('@domojs/rfx');

export default async function init(this: State, container: Container<void>)
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

    var p1 = fs.readFile(path.resolve(__dirname, '../../../views/new-RFXCOM.html'), 'utf-8').then(newDeviceTemplate =>
        registerDeviceType(container, {
            name: 'RFXCOM',
            view: newDeviceTemplate,
            commandMode: 'static'
        }));

    var p2 = Promise.resolve();
    // var p2 = fs.readFile(path.resolve(__dirname, '../../../views/new-RFY.html'), 'utf-8').then(newDeviceTemplate =>
    //     registerDeviceType({
    //         name: 'RFY',
    //         view: newDeviceTemplate,
    //         commandMode: 'static'
    //     }));

    try
    {
        const { usb } = await import('usb')
        await addDeviceIfMatch(usb);
        usb.on('attach', function ()
        {
            logger.info('detected new usb device');
            addDeviceIfMatch(usb);
        });
    }
    catch (e)
    {
        console.error(e);
    }

    return Promise.all([p1, p2]);
}


async function addDeviceIfMatch(usb: typeof usbType)
{
    var serials = await Rfxtrx.listEligibleSerials();
    if (serials && serials.length > 0)
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
        logger.warn('no RFXCOM device found');
}

init.$inject = ['container', 'options.path']
