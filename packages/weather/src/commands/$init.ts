import { State } from "../state.js";
import { ProxyConfiguration } from '@akala/config'
import { BridgeConfiguration, ClusterMap, CommissionningCluster, EndpointProxy, registerNode, RootNode } from "@domojs/devices";
import { Context } from "@akala/core";
import app, { pubsub, SidecarConfiguration } from '@akala/sidecar'
import { MqttEvents } from "@domojs/mqtt";

var state: State = null;


export default async function init(this: State, context: Context<ProxyConfiguration<SidecarConfiguration & BridgeConfiguration>>)
{
    state = this;

    state.config = context.state;

    const sidecar = await app<unknown, MqttEvents>(context);

    const fabric = await registerNode('weather', sidecar, context.state);

    await fabric.attach(sidecar.pubsub);

    // await fabric.announce({
    //     commissioningMode: true,
    //     deviceName: 'Mulhouse',
    //     deviceType: DeviceTypes.TemperatureSensor,
    //     manufacturer: 'domojs',
    //     pairingHint: PairingHints.Custom,
    //     pairingInstruction: 'Please select a city',
    //     discriminator: 1,
    //     rotatingId: false,
    //     vendorProductId: '31416+0002'
    // })

    try
    {
        const webc = await sidecar.sidecars['@akala/server'];

        await webc.dispatch('remote-container', '/api/weather', require('../../commands.json'))

        await webc.dispatch('asset', 'main', require.resolve('../client'));
    }
    catch (e)
    {
        context.logger.warn(e);
    }
}

init.$inject = ['container', 'options.path']
