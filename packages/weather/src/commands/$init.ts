import { State } from "../state";
import { Processors, NetSocketAdapter, Metadata, proxy, Container } from "@akala/commands";
import * as net from 'net'
import * as web from '@akala/server'
import Configuration from '@akala/config'
import * as assert from 'assert'
import { registerDeviceType } from "@domojs/devices";
import { connect, sidecar, SidecarMap } from "@akala/pm";

var state: State = null;
const log = web.log('domojs:iscp:devicetype');

export default async function init(this: State)
{
    state = this;

    state.locations = (await Configuration.load("./weather.json")) || new Configuration("./weather.json", []);

    await registerDeviceType({
        name: 'Weather',
        view: '@domojs/weather/new.html',
        commandMode: 'dynamic'
    });

    const webc = await sidecar()['@akala/server'];

    await webc.dispatch('remote-container', '/api/weather', require('../../commands.json'))

    await webc.dispatch('asset', 'main', require.resolve('../client'));
}

init.$inject = ['container', 'options.path']
