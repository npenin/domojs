import { sidecar } from '@akala/pm';
import { State } from '../state'


export default async function (this: State)
{
    this.devices = {};
    this.devicesByAddress = {};

    this.server = await sidecar()['@domojs/devicetype'];

    await this.server.dispatch('register', {
        name: 'zigate',
        commandMode: 'static',
        view: (await import('../../views/device.html')).value
    });

    this.deviceServer = await sidecar()['@domojs/devices'];
}