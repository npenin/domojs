import { State } from "../state";
import { Container, Processors, NetSocketAdapter, Metadata, helper, commandList, proxy, Processor } from "@akala/commands";
import * as net from 'net'
import * as usb from 'usb';
import * as akala from '@akala/server';
import { Rfxtrx } from 'rfxtrx';
import * as assert from 'assert'
import * as fs from 'fs/promises';

var state: State = null;
var setGateway: (gw: Rfxtrx) => void = null;
const log = akala.log('domojs:rfx:devicetype');

export default function init(this: State, path: string, verbose?: boolean)
{
    assert.ok(path, 'path to @domojs/devicetype is not defined');
    state = this;
    state.devices = {};
    this.gateway = new Promise((resolve) =>
    {
        setGateway = resolve;
    })

    // proxy(require('@akala/devices/devicetype-commands.json'), 
    var metaServer: Metadata.Container = require('@domojs/devices/devicetype-commands.json');

    var server: import('@domojs/devices/dist/server/devicetype-commands').description.deviceTypes = proxy(metaServer, (container) =>
    {
        var processor: Processor<State> = new Processors.JsonRpc(Processors.JsonRpc.getConnection(new NetSocketAdapter(net.connect({ path })), container))
        if (verbose)
            processor = new Processors.LogProcessor(processor, (cmd, params) => log({ cmd, params }));
        return processor;
    });

    fs.readFile(require.resolve('../../views/new-RFY.html'), 'utf-8').then(newDeviceTemplate =>
        server.dispatch('register', {
            name: 'RFY',
            view: newDeviceTemplate,
            commandMode: 'static'
        }));

    addDeviceIfMatch();
    try
    {
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
