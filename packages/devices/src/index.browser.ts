import { Metadata } from '@akala/commands/browser';
import { CommandDescription } from './devices.js';
export * from './server/clients/index.js';
import devices from './server/device-commands.js'
import { MqttClient, MqttEvents, protocol } from '@domojs/mqtt';
import { pubsub, Sidecar } from '@akala/sidecar';
import { clusterFactory, CommissionningCluster, Endpoint, EndpointProxy, MatterClusterIds, RootNode } from './server/clients/index.js';
import { ProxyConfiguration } from '@akala/config';
import { BridgeConfiguration } from './server/clients/RootNode.js';
// import type { SidecarConfiguration } from '@akala/sidecar';
// export * from './server/behaviors/acl.js'
// export * from './server/behaviors/admin-commissionning.js'
export * from './server/behaviors/binding.js'
export * from './server/behaviors/boolean.js'
export * from './server/behaviors/descriptor.js'
export * from './server/behaviors/general-commissionning.js'
export * from './server/behaviors/mode-select.js'
export * from './server/behaviors/operational-credentials.js'
export * from './server/behaviors/ota-requestor.js'

declare module '@akala/pm'
{
    export interface SidecarMap
    {
        '@domojs/devices': devices.container;
    }
}

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
    const remote = await EndpointProxy.fromBus<'commissionning'>(self.pubsub, 'domojs/devices', 0);
    try
    {
        const [pubsubConfig, clientId] = await remote.clusters.commissionning.target.registerCommand(name, grantRoot);
        if (pubsubConfig)
        {
            id = clientId;
            await (self.pubsub as MqttClient).disconnect(protocol.ReasonCodes.NormalDisconnection);
            delete self.pubsub;
            pubsubConfig.transport = self.config.pubsub.transport;
            delete self.config.pubsub;
            await pubsub(self, pubsubConfig, abort);
        }
        else
            id = clientId;
    }
    catch (e)
    {
        if (e?.disconnect?.reason !== protocol.ReasonCodes.NotAuthorized)
        {
            if (self.config?.pubsub?.transportOptions)
                delete self.config.pubsub.transportOptions;
            await self.config.commit();
            throw e;
        }
    }

    const endpoint = new Endpoint(name, id, {
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