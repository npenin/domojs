import { CliContext, OptionType } from '@akala/cli';
import { Container, helper } from '@akala/commands';
import Configuration, { ProxyConfiguration } from '@akala/config';
import app, { SidecarConfiguration } from '@akala/sidecar'
import State from '../state.js';
import { DeviceType } from '@domojs/devices';

export default async function (this: State, context: CliContext<Record<string, OptionType>, ProxyConfiguration<SidecarConfiguration>>, container: Container<State>)
{
    this.pairedAccessories = {};
    Object.assign(this, helper(container));

    // if (!context.state.has('homekit'))
    //     context.state.set('homekit', {});
    const self = await app(context);
    // self.pubsub?.emit(container, 'device-discovered', '/zeroconf/_hap');

    await (await self.sidecars['@domojs/devicetype']).dispatch('register', { name: 'homekit' } as DeviceType);
}