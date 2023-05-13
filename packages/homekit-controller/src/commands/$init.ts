import { CliContext } from '@akala/cli';
import { Container, helper } from '@akala/commands';
import Configuration from '@akala/config';
import app from '@akala/sidecar'
import { devices } from '@domojs/devices';
import State from '../state.js';

export default async function (this: State, context: CliContext, container: Container<State>)
{
    this.pairedAccessories = {};
    Object.assign(this, helper(container));
    const self = await app(context, Configuration.new('./homekit.json', {}));
    self.pubsub.subscribe(container, 'device-discovered', '/zeroconf/_hap');

    await (await self.sidecars['@domojs/devicetype']).dispatch('register', { name: 'homekit' } as devices.DeviceType);
}