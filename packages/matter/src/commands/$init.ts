import { CliContext } from '@akala/cli';
import app, { SidecarConfiguration } from '@akala/sidecar';
import { ProxyConfiguration } from '@akala/config';
import { registerNode, BridgeConfiguration, clusterFactory, Endpoint, MatterClusterIds, ClusterIdNames } from '@domojs/devices';
import { MqttEvents } from '@domojs/mqtt';
import { logger } from '@akala/core';
import { } from '@matter/nodejs-ble';
import { config } from '@matter/nodejs/config'
import { NodeJsEnvironment, NodeJsNetwork } from '@matter/nodejs'
import { ScannerSet, StructuredReadAttributeData } from '@matter/protocol'
import { CommissioningController } from '@project-chip/matter.js';
import { MqttScanner } from '../environment/mdns/mqtt.js';
import { Network } from '@matter/general';

const log = logger('domojs:matter');

export default async function init(context: CliContext<{}, ProxyConfiguration<SidecarConfiguration & BridgeConfiguration>>, signal: AbortSignal)
{
    const sidecar = await app<unknown, MqttEvents>(context);
    const fabric = await registerNode('matter', sidecar, context.state, context.abort.signal, true);

    // Create and start Matter commissioner with shared configuration
    // const commissioner = new MatterCommissioner(context.state);

    config.loadProcessArgv = false;
    config.defaultConfigFilePath = 'db/matter.json';
    config.defaultStoragePath = 'db/matter/';
    config.installNetwork = false;
    const env = NodeJsEnvironment();
    env.vars.set('fabricLabel', 'Domojs controller');
    env.get(ScannerSet).add(new MqttScanner(sidecar.pubsub));
    env.set(Network, new NodeJsNetwork());

    const commissioner = new CommissioningController({
        adminFabricLabel: 'Domojs',
        environment: {
            environment: env,
            id: 'domojs'
        },
        autoConnect: true,
        autoSubscribe: true
    });

    commissioner.initialize(false);
    await commissioner.start();

    // Handle Matter device events and publish to MQTT
    commissioner.discoverCommissionableDevices(null, { ble: true, onIpNetwork: true, wifiPublicActionFrame: false }, async (device) =>
    {
        log.info(`Matter device discovered: ${JSON.stringify(device)}`);
        // await sidecar.pubsub.emit('matter', JSON.stringify(device));

        // // Create endpoint for discovered device
        // const endpoint = await fabric.newEndpoint(`matter-${device.deviceIdentifier}`, {
        //     fixedLabel: clusterFactory({
        //         id: MatterClusterIds.FixedLabel,
        //         LabelList: [{ Label: 'Name', Value: `Matter Device ${device.deviceIdentifier}` }]
        //     })
        // });
        // fabric.endpoints.push(endpoint);
    });

    for (const node of commissioner.getCommissionedNodes())
    {
        log.info(`Matter device commissioned: ${node}`);
        await sidecar.pubsub.emit('matter/device/commissioned', JSON.stringify(node));


        // Update device endpoint with commissioned state
        const endpointId = await fabric.getEndpointId(`matter-${node}`);
        const endpoint = fabric.endpoints.find(ep => ep.id === endpointId);
        if (endpoint)
        {
            const endpoints = await Promise.all((await commissioner.getNode(node)).getDevices().map(matterEndpoint =>
            {
                return fabric.newEndpoint(node + '-' + matterEndpoint.number, Object.fromEntries(matterEndpoint.getAllClusterServers().map(c =>
                {
                    return [ClusterIdNames[c.id] as any, clusterFactory(c) as any]
                })))
            }));

            fabric.endpoints.push(...endpoints);
        }
    }

    // Start Matter commissioner
    await commissioner.start();
    // await commissioner.startDiscovery();

    await fabric.attach(sidecar.pubsub);

    log.info('Matter adapter initialized');

    // Cleanup on abort
    signal?.addEventListener('abort', async () =>
    {
        log.info('Matter adapter shutting down');
        await commissioner.close();
    });
}
