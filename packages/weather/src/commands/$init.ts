import { State } from "../state.js";
import Configuration from '@akala/config'
import { registerDeviceType } from "@domojs/devices";
import { sidecar } from "@akala/pm";
import { SerializableObject } from "@akala/core";
import { Container } from "@akala/commands";

var state: State = null;

export default async function init(this: State, container: Container<void>)
{
    state = this;

    state.locations = (await Configuration.load("./weather.json")) || Configuration.new<Record<string, SerializableObject>>("./weather.json", {});

    await registerDeviceType(container, {
        name: 'Weather',
        view: '@domojs/weather/new.html',
        commandMode: 'dynamic'
    });

    const webc = await sidecar()['@akala/server'];

    await webc.dispatch('remote-container', '/api/weather', require('../../commands.json'))

    await webc.dispatch('asset', 'main', require.resolve('../client'));
}

init.$inject = ['container', 'options.path']
