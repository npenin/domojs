import { CliContext, OptionType } from '@akala/cli';
import { Container, helper } from '@akala/commands';
import Configuration, { ProxyConfiguration } from '@akala/config';
import app, { SidecarConfiguration } from '@akala/sidecar'
import State from '../state.js';
import { BridgeConfiguration, DeviceTypes, registerNode } from '@domojs/devices';

export default async function (this: State, context: CliContext<Record<string, OptionType>, ProxyConfiguration<SidecarConfiguration & BridgeConfiguration>>, container: Container<State>)
{
    this.pairedAccessories = {};
    Object.assign(this, helper(container));

    // if (!context.state.has('homekit'))
    //     context.state.set('homekit', {});
    const self = await app(context);
    // self.pubsub?.emit(container, 'device-discovered', '/zeroconf/_hap');

    const fabric = await registerNode('homekit', self, context.state);
}