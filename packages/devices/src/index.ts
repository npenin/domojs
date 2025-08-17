

export * from './index.browser.js';
import { pubsub, Sidecar } from '@akala/sidecar';

import { ClusterMap, CommissionningCluster, EndpointProxy, RootNode } from './server/clients/index.js';
import { MqttClient, MqttEvents } from '@domojs/mqtt';
import { ReasonCodes } from '../../mqtt/dist/protocol/_shared.js';
import { ProxyConfiguration } from '@akala/config';
import type { BridgeConfiguration } from './server/clients/RootNode.js';

export { type BridgeConfiguration }

export async function registerNode(name: string, self: Sidecar<any, MqttEvents>, config: ProxyConfiguration<BridgeConfiguration>, abort: AbortSignal): Promise<RootNode<never>>
{
    if (!self.pubsub && self.config.pubsub?.transport || self.pubsub && !self.config.pubsub.transportOptions)
    {
        if (self.pubsub)
        {
            await (self.pubsub as MqttClient).disconnect();
            delete self.pubsub
        }
        await pubsub(self, { transport: self.config.pubsub.transport, transportOptions: { username: 'domojs-guest', password: 'domojs' } }, abort);
    }
    const remote = new EndpointProxy<ClusterMap>(0, 'root', { name: 'domojs/devices' }, self.pubsub, { commissionning: CommissionningCluster });
    try
    {
        const [pubsubConfig] = await remote.clusters.commissionning.target.registerCommand(name);
        if (pubsubConfig)
        {
            await (self.pubsub as MqttClient).disconnect();
            delete self.pubsub;
            delete self.config.pubsub;
            await pubsub(self, pubsubConfig, abort);
        }
    }
    catch (e)
    {
        if (e.reason !== ReasonCodes.NotAuthorized)
        {
            delete self.config.pubsub.transportOptions;
            await self.config.commit();
            throw e;
        }
    }
    return new RootNode<never>(name, {}, config)
}
