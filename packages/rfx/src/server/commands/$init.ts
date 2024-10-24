import { State } from "../state.js";
import { Rfxtrx } from "@domojs/rfx-parsers";
import * as path from 'path'
import * as fs from 'fs/promises';
import { registerDeviceType } from '@domojs/devices';
import { usb as usbType } from 'usb'
import { Container } from "@akala/commands";
import { EventEmitter, logger as Logger } from "@akala/core";

var state: State = null;
// var setGateway: (gw: Rfxtrx) => void = null;
const logger = Logger('@domojs/rfx');

export default async function init(this: State, container: Container<void>, signal: AbortSignal)
{
    state = this;
    state.devices = {};
    this.gateways = new EventEmitter();
    const gateways = {};
    this.gateways.on('add', async (path, gateway) =>
    {
        if (gateways[path])
            return gateways[path];
        gateways[path] = gateway;
        await gateway.start();
        signal?.addEventListener('abort', () => this.gateways.emit('del', path, gateway));
        return gateway;
    });
    this.gateways.on('del', async (path, gateway) =>
    {
        delete gateways[path];
        await gateway.close();;
    })
    // this.setGateway = async (gw: Rfxtrx) =>
    // {
    //     signal?.addEventListener('abort', () => gw.close())
    //     await gw.start();
    //     setGateway(gw);
    //     return gw;
    // };

    // var p1 = fs.readFile(path.resolve(__dirname, '../../../views/new-RFXCOM.html'), 'utf-8').then(newDeviceTemplate =>
    await registerDeviceType(container, signal, {
        name: 'RFXCOM',
        view: '',
        commandMode: 'static'
    });

    // var p2 = Promise.resolve();
    // var p2 = fs.readFile(path.resolve(__dirname, '../../../views/new-RFY.html'), 'utf-8').then(newDeviceTemplate =>
    //     registerDeviceType({
    //         name: 'RFY',
    //         view: newDeviceTemplate,
    //         commandMode: 'static'
    //     }));

    try
    {
        const { usb } = await import('usb')
        await addDeviceIfMatch(usb, this);
        usb.on('attach', function ()
        {
            logger.info('detected new usb device');
            addDeviceIfMatch(usb, this);
        });
    }
    catch (e)
    {
        if (e.code !== 'ERR_MODULE_NOT_FOUND')
            console.error(e);
    }

    // return Promise.all([p1, p2]);



    async function addDeviceIfMatch(usb: typeof usbType, state: State)
    {
        var serials = await Rfxtrx.listEligibleSerials();
        if (serials && serials.length > 0)
        {
            var device = serials[0]
            logger.info('idenfified a RFXCOM potential serial device');
            const gateway = await Rfxtrx.getSerial(device)
            state.gateways.emit('add', 'usb://' + device, gateway);
            // setGateway(await Rfxtrx.getSerial(device))
            try
            {
                usb.on('detach', async function ()
                {
                    var newSerials = await Rfxtrx.listEligibleSerials();
                    if ((newSerials.length == 0 || newSerials.indexOf(device) === -1) && ('usb://' + device) in state.gateways)
                        state.gateways.emit('del', 'usb://' + device, gateway);
                });
            }
            catch (e)
            {
                console.error('detaching is not supported on this platform');
            }
            return device;

        }
        else
            logger.warn('no RFXCOM device found');
    }
}

init.$inject = ['container', 'signal']
