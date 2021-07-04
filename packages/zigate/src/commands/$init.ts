import { sidecar } from '@akala/pm';
import { registerDeviceType } from '@domojs/devices';
import { State } from '../state'


export default async function (this: State)
{
    this.devices = {};
    this.devicesByAddress = {};

    await registerDeviceType({
        name: 'zigate',
        commandMode: 'static',
        view: (await import('../../views/device.html')).value
    });

    this.deviceServer = await sidecar()['@domojs/devices'];
}