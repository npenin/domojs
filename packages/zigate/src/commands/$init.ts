import { administratorCommissioningCluster, Binding, BridgeConfiguration, clusterFactory, ClusterIds, generalCommissioningCluster, globalEnums, identifyCluster, MatterClusterIds, registerNode, RootNode, timeFormatLocalizationCluster, timeSynchronizationCluster, unitLocalizationCluster, Endpoint } from '@domojs/devices';
import { State } from '../state.js'
import { Zigate, MessageType, Device, Cluster as ZigbeeCluster } from '@domojs/zigate-parsers';
import { createMatterClusterFromZigbee } from '../cluster-converter.js';
import { CliContext } from '@akala/cli';
import { Container } from '@akala/commands';
import app, { SidecarConfiguration } from '@akala/sidecar'
import { ProxyConfiguration } from '@akala/config';
import os from 'os';

export default async function (this: State, context: CliContext<{ debug: boolean }, ProxyConfiguration<SidecarConfiguration & BridgeConfiguration>>, container: Container<void>, signal: AbortSignal)
{
    this.devicesByAddress = {};
    this.devices = {};
    this.logger = context.logger;

    // await fs.readFile(fileURLToPath(new URL('../../views/device.html', import.meta.url)), 'utf-8').then(newDeviceTemplate =>
    // );

    const self = await app(context);
    const fabric = await registerNode('zigate', self, context.state, context.abort.signal);

    try
    {
        Zigate.listEligibleSerials().then(async serials =>
        {
            if (serials && serials.length)
            {
                for (const serial of serials)
                {

                    const nodeName = serial.replace(/^\/dev\//, '') + '@' + os.hostname();

                    const endpoint = await fabric.newEndpoint(serial,
                        {
                            fixedLabel: clusterFactory({
                                id: MatterClusterIds.FixedLabel,
                                LabelList: [
                                    {
                                        Label: 'Name',
                                        Value: nodeName
                                    }
                                ]
                            })
                        }
                    );
                    fabric.endpoints.push(endpoint);
                    const gw = await Zigate.getSerial(serial);
                    const gwEndpoint = await fabric.newEndpoint(serial, {
                        fixedLabel: clusterFactory({
                            id: MatterClusterIds.FixedLabel,
                            LabelList: [
                                {
                                    Label: 'Name',
                                    Value: nodeName
                                }
                            ]
                        })
                    });

                    // Store gateway endpoint in fabric
                    fabric.endpoints.push(gwEndpoint);

                    // Set up device announce handler before starting the gateway
                    gw.on('DeviceAnnounce', async (deviceAnnounce: any) =>
                    {
                        const zigbeeDevice = new Device(
                            deviceAnnounce.shortAddress,
                            deviceAnnounce.IEEEAddress,
                            deviceAnnounce.MacCapability
                        );

                        context.logger.info(`New device announced: ${zigbeeDevice.IEEEAddress.toString(16)} (${zigbeeDevice.shortAddress.toString(16)})`);

                        // Create device endpoint with basic information
                        const deviceEndpoint = await fabric.newEndpoint(`${serial}-device-${zigbeeDevice.IEEEAddress.toString(16)}`, {
                            fixedLabel: clusterFactory({
                                id: MatterClusterIds.FixedLabel,
                                LabelList: [
                                    {
                                        Label: 'Name',
                                        Value: `Zigbee Device ${zigbeeDevice.shortAddress.toString(16)}`
                                    },
                                    {
                                        Label: 'Address',
                                        Value: zigbeeDevice.shortAddress.toString(16)
                                    }
                                ]
                            })
                        });

                        // Add mapped clusters from Zigbee device
                        const basicClusters = [
                            ZigbeeCluster.Basic,
                            ZigbeeCluster.PowerConfig,
                            ZigbeeCluster.Identify
                        ];

                        // Store cluster mappings for later use
                        const mappedClusters: number[] = [];

                        for (const clusterId of basicClusters)
                        {
                            const matterCluster = createMatterClusterFromZigbee(clusterId);
                            if (matterCluster)
                            {
                                const clusterName = ZigbeeCluster[clusterId].toLowerCase();
                                fabric.endpoints.push(deviceEndpoint);
                                mappedClusters.push(clusterId);
                            }
                        }

                        // Initialize the gateway's device map if it doesn't exist
                        if (!this.devicesByAddress[serial])
                        {
                            this.devicesByAddress[serial] = {};
                        }

                        // Store device with its mapped clusters
                        this.devicesByAddress[serial][zigbeeDevice.shortAddress] = {
                            type: 'device' as const,
                            address: zigbeeDevice.shortAddress,
                            category: 'zigbee',
                            room: '',
                            gateway: Promise.resolve(gw),
                            name: `Zigbee Device ${zigbeeDevice.shortAddress.toString(16)}`,
                            clusters: mappedClusters,
                            attributes: {}
                        };

                        this.devices[serial][zigbeeDevice.IEEEAddress.toString(16)] = this.devicesByAddress[serial][zigbeeDevice.shortAddress];

                        fabric.endpoints.push(deviceEndpoint);
                    });

                    await gw.start(signal, context.options.debug);

                    // Request list of existing devices after gateway is started
                    gw.send(MessageType.GetDevicesList);
                }
            }
        });
    }
    catch (e)
    {
        console.error(e);
    }
    // Object.assign(this, await app(context, fileURLToPath(new URL('../../devicetype-app.json', import.meta.url))));

    // this.deviceServer = await sidecar()['@domojs/devices'];
}