

// export * from './devices.js';
import { Metadata } from '@akala/commands';
import { CommandDescription } from './devices.js';
export * from './server/clients/index.js';
import { pubsub, Sidecar, SidecarConfiguration } from '@akala/sidecar';
import devices from './server/device-commands.js'
import { ClusterMap, CommissionningCluster, EndpointProxy, RootNode } from './server/clients/index.js';
import { MqttClient, MqttEvents } from '@domojs/mqtt';
import { ReasonCodes } from '../../mqtt/dist/protocol/_shared.js';
import { ProxyConfiguration } from '@akala/config';
import { BridgeConfiguration } from './server/clients/RootNode.js';

declare module '@akala/pm'
{
    export interface SidecarMap
    {
        '@domojs/devices': devices.container;
    }
}

export { BridgeConfiguration }

export async function registerNode(name: string, self: Sidecar<any, MqttEvents>, config: ProxyConfiguration<BridgeConfiguration>): Promise<RootNode<never>>
{
    if (!self.pubsub && self.config.pubsub?.transport || self.pubsub && !self.config.pubsub.transportOptions)
    {
        if (self.pubsub)
        {
            await (self.pubsub as MqttClient).disconnect();
            delete self.pubsub
        }
        await pubsub(self, { transport: self.config.pubsub.transport, transportOptions: { username: 'domojs-guest', password: 'domojs' } });
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
            await pubsub(self, pubsubConfig);
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

export type PubSubConfiguration = SidecarConfiguration['pubsub'];

export function command(name: string, cmd: CommandDescription): Metadata.Command[]
{
    switch (cmd.type)
    {
        case 'onoff':
            return [{ name, config: { "": { inject: ["params.0"] }, "cli": { inject: ["params.0"] }, '@domojs/devicetype': cmd } }];
        case 'button':
            return [{ name, config: { "": { inject: [] }, "cli": { inject: [] }, '@domojs/devicetype': cmd } }];
        case 'range':
        case 'input':
            return [{ name, config: { "": { inject: ["params.0"] }, "cli": { inject: ["params.0"] }, '@domojs/devicetype': cmd } }];
        case 'toggle':
            return [
                { name, config: { "": { inject: [] }, "cli": { inject: [] }, '@domojs/devicetype': cmd } }
            ];

    }
}

declare module '@akala/commands'
{
    interface ConfigurationMap
    {
        '@domojs/devicetype': CommandDescription
    }
}