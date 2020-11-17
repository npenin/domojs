import { State } from "../state";
import { Processors, NetSocketAdapter, Metadata, proxy, Processor, Container } from "@akala/commands";
import * as net from 'net'
import * as web from '@akala/server'
import Configuration from '@akala/config'
import * as assert from 'assert'

var state: State = null;
const log = web.log('domojs:iscp:devicetype');

export default async function init(this: State, container: Container<State>, pm: Container<void>, path: string, serverSocketPath: string, verbose?: boolean)
{
    console.log(arguments);
    assert.ok(path, 'path to @domojs/devicetype is not defined');
    assert.ok(serverSocketPath, 'path to @akala/server is not defined');
    state = this;

    state.locations = (await Configuration.load("./weather.json")) || new Configuration("./weather.json", []);

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
        name: 'Weather',
        view: '@domojs/weather/new.html',
        commandMode: 'dynamic'
    });

    var socket = await new Promise<net.Socket>((resolve, reject) =>
    {
        var socket = net.connect({ path: serverSocketPath }, function ()
        {
            console.log('connected to ' + serverSocketPath);
            resolve(socket)
        }).on('error', reject);
    });
    var webc = web.connect(socket, container);
    await webc.dispatch('remote-container', '/api/weather')

    await webc.dispatch('asset', 'main', require.resolve('../client'))

}

init.$inject = ['container', 'options.path']
