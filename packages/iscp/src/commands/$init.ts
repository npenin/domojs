import { State } from "../state";
import { Processors, NetSocketAdapter, Metadata, proxy, Processor } from "@akala/commands";
import * as net from 'net'
import * as akala from '@akala/server';
import * as assert from 'assert'

var state: State = null;
const log = akala.log('domojs:iscp:devicetype');

export default function init(this: State, path: string, verbose?: boolean)
{
    assert.ok(path, 'path to @domojs/devicetype is not defined');
    state = this;
    state.collection = {};
    state.getMainDevice = function getMainDevice(name)
    {
        var indexOfDot = name.indexOf('.');
        if (indexOfDot > 0)
            var mainDevice = name.substr(0, indexOfDot);
        else
            var mainDevice = name;

        return this.collection[mainDevice];
    };

    // proxy(require('@akala/devices/devicetype-commands.json'), 
    var metaServer: Metadata.Container = require('@domojs/devices/devicetype-commands.json');

    var server: import('@domojs/devices/dist/server/devicetype-commands').description.deviceTypes = proxy(metaServer, (container) =>
    {
        var processor: Processor<State> = new Processors.JsonRpc(Processors.JsonRpc.getConnection(new NetSocketAdapter(net.connect({ path })), container), true)
        if (verbose)
            processor = new Processors.LogProcessor(processor, (cmd, params) => log({ cmd, params }));
        return processor;
    });

    server.dispatch('register', {
        name: 'iscp',
        view: '@domojs/iscp/device.html',
        commandMode: 'dynamic'
    });
}

init.$inject = ['container', 'options.path']
