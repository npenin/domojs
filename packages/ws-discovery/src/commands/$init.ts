import app, { pubsub, SidecarConfiguration } from '@akala/sidecar';
import { CliContext } from '@akala/cli';
import { ProxyConfiguration } from '@akala/config';
import { State } from '../state.js';
import { WSDiscovery, WSDiscoveryDevice } from '../index.js';
import { AggregatorEndpoint, BridgeConfiguration, clusterFactory, Endpoint, MatterClusterIds, registerNode } from '@domojs/devices';
import { Context } from '@akala/core';

export default async function (this: State, context: Context<ProxyConfiguration<SidecarConfiguration & BridgeConfiguration>>)
{
    if (!context.state.has('endpointsMapping'))
        context.state.set('endpointsMapping', {});

    const self = await app(context);

    const wsDiscovery = this.browser = new WSDiscovery();

    const fabric = await registerNode('ws-discovery', self, context.state, context.abort.signal);

    this.fabric = fabric;

    await fabric.attach(self.pubsub);

    context.abort.signal.addEventListener('abort', async () =>
    {
        await wsDiscovery.close();
    });

    await wsDiscovery.ready;

    // Listen for device discoveries
    wsDiscovery.on('device', async (device: WSDiscoveryDevice) =>
    {
        try
        {
            const endpointId = await fabric.getEndpointId(device.endpointReference);

            if (!fabric.endpoints.find(e => e.id === endpointId))
            {
                // Create new endpoint for discovered device
                const labelList = [
                    { Label: 'FQDN', Value: device.endpointReference },
                    { Label: 'Address', Value: device.address },
                    { Label: 'Types', Value: device.types.join(';') }
                ];

                if (device.scopes.length > 0)
                    labelList.push({ Label: 'Scopes', Value: device.scopes.join(';') });
                if (device.xaddrs.length > 0)
                    labelList.push({ Label: 'XAddrs', Value: device.xaddrs.join(';') });

                const endpoint = new Endpoint(device.endpointReference, endpointId, {
                    fixedLabel: clusterFactory({
                        id: MatterClusterIds.FixedLabel,
                        LabelList: labelList
                    })
                });

                fabric.endpoints.push(endpoint);
            }
        }
        catch (e)
        {
            console.error(`Error processing WS-Discovery device ${device.endpointReference}:`, e);
        }
    });

    return fabric;
}
