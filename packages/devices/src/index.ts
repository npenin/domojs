

export * from './index.browser.js';
import { pubsub, Sidecar } from '@akala/sidecar';

import { clusterFactory, ClusterIds, ClusterMap, CommissionningCluster, descriptorCluster, Endpoint, EndpointProxy, MatterClusterIds, RootNode } from './server/clients/index.js';
import { MqttClient, MqttEvents } from '@domojs/mqtt';
import { protocol } from '@domojs/mqtt';
import { ProxyConfiguration } from '@akala/config';
import type { BridgeConfiguration } from './server/clients/RootNode.js';

export { type BridgeConfiguration }

export async function registerNode(name: string, self: Sidecar<any, MqttEvents>, config: ProxyConfiguration<BridgeConfiguration>, abort: AbortSignal, grantRoot?: boolean): Promise<RootNode<never>>
{
    let id = config.id;
    if (!self.pubsub && self.config.pubsub?.transport || self.pubsub && !self.config.pubsub.transportOptions)
    {
        if (self.pubsub)
        {
            await (self.pubsub as MqttClient).disconnect(protocol.ReasonCodes.NormalDisconnection);
            delete self.pubsub
        }
        await pubsub(self, { transport: self.config.pubsub.transport, transportOptions: { username: 'domojs-guest', password: 'domojs' } }, abort);
    }
    if (!self.pubsub)
    {
        const result = await (await self.sidecars['@domojs/devices']).dispatch('register-adapter', name, grantRoot);
        if (result.transport)
        {
            id = result.id;
            await pubsub(self, result?.transportOptions ? { transport: result.transport, transportOptions: result.transportOptions } : null, abort);
        }
    }
    const remote = new EndpointProxy(0, { name: 'domojs/devices' }, self.pubsub, { commissionning: CommissionningCluster });
    try
    {
        const [pubsubConfig, clientId] = await remote.clusters.commissionning.target.registerCommand(name, grantRoot);
        if (pubsubConfig)
        {
            id = clientId;
            await (self.pubsub as MqttClient).disconnect(protocol.ReasonCodes.NormalDisconnection);
            delete self.pubsub;
            delete self.config.pubsub;
            await pubsub(self, pubsubConfig, abort);
        }
        else
            id = clientId;
    }
    catch (e)
    {
        if (e.disconnect.reason !== protocol.ReasonCodes.NotAuthorized)
        {
            delete self.config.pubsub.transportOptions;
            await self.config.commit();
            throw e;
        }
    }

    const endpoint = new Endpoint(id, {
        fixedLabel: clusterFactory({
            id: MatterClusterIds.FixedLabel,
            LabelList: [
                { Label: 'name', Value: name },
                { Label: 'redirectTopic', Value: `domojs/${name}` }
            ]
        })
    });

    const root = new RootNode<never>(name, {}, config)

    await endpoint.attach(self.pubsub, 'domojs/devices');
    await self.pubsub.emit(`domojs/devices/${id}/descriptor/ServerList`, JSON.stringify(Object.values(endpoint.clusters).map(c => c.target.id)), { qos: 1 });

    // root.clusters.descriptor.on('ServerList', l => endpoint.clusters.descriptor.setValue(l.property, l.value));

    return root;
}
