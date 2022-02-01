import { State } from "../state";
import Configuration from '@akala/config'
import { registerDeviceType } from "@domojs/devices";
import { sidecar } from "@akala/pm";

var state: State = null;

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
