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
    this.gateways = new Proxy<Record<string, Rfxtrx>>({}, {
        set(target, path, gateway)
        {
            if (!(gateway instanceof Rfxtrx) || typeof path !== 'string')
                return false;

            if (!(path in target))
            {
                target[path] = gateway;
                gateway.start();
                signal?.addEventListener('abort', async () =>
                {
                    await this.gateways[path].close();
                    delete this.gateways[path]
                });
            }
            return true;
        },
        deleteProperty(target, path)
        {
            if (!(path in target) || typeof path !== 'string')
                return false;

            target[path].close();
            delete target[path]
            return true;

        },
    });

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
            if (!state.gateways['usb://' + device])
                state.gateways['usb://' + device] = await Rfxtrx.getSerial(device);

            // setGateway(await Rfxtrx.getSerial(device))
            try
            {
                usb.on('detach', async function ()
                {
                    var newSerials = await Rfxtrx.listEligibleSerials();
                    if ((newSerials.length == 0 || newSerials.indexOf(device) === -1) && ('usb://' + device) in state.gateways)
                        delete state.gateways['usb://' + device];
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
