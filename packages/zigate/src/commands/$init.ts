import { adminCommissioningCluster, Binding, BridgeConfiguration, clusterFactory, ClusterIds, generalCommissioningCluster, globalEnums, identify, MatterClusterIds, registerNode, RootNode, localizationTimeFormat, timeSync, localizationUnit, Endpoint, MatterClusterMap, ClusterIdNames } from '@domojs/devices';
import { State } from '../state.js'
import { Zigate, MessageType, Cluster as ZigbeeCluster, MessageTypes, descriptors, attributes } from '@domojs/zigate-parsers';
import { createMatterClusterFromZigbee } from '../cluster-converter.js';
import { CliContext } from '@akala/cli';
import { Container } from '@akala/commands';
import app, { SidecarConfiguration } from '@akala/sidecar'
import { ProxyConfiguration } from '@akala/config';
import os from 'os';
import { eachAsync, mapAsync } from '@akala/core';
import { zigbeeToMatterClusterMap } from '../cluster-mapping.js';

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

                    const endpointMap: Record<number, Record<number, Endpoint>> = {};

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
                    gw.on(MessageType.DeviceAnnounce, async (deviceAnnounce: MessageTypes.DeviceAnnounce) =>
                    {
                        context.logger.info(`New device announced: ${deviceAnnounce.IEEEAddress.toString(16)} (${deviceAnnounce.shortAddress.toString(16)})`);

                        // Create device endpoint with basic information
                        const deviceEndpoint = await fabric.newEndpoint(`${serial}-device-${deviceAnnounce.IEEEAddress.toString(16)}`, {
                            fixedLabel: clusterFactory({
                                id: MatterClusterIds.FixedLabel,
                                LabelList: [
                                    {
                                        Label: 'Name',
                                        Value: `Zigbee Device ${deviceAnnounce.shortAddress.toString(16)}`
                                    },
                                    {
                                        Label: 'Address',
                                        Value: deviceAnnounce.shortAddress.toString(16)
                                    }
                                ]
                            })
                        });

                        endpointMap[deviceAnnounce.shortAddress] = {};

                        const endpoints = await gw.dialog(MessageType.ActiveEndpoint, { targetShortAddress: deviceAnnounce.shortAddress });
                        const endpointDescs = await mapAsync(endpoints.endpoints, async endpoint =>
                        {
                            const desc = await gw.dialog(MessageType.SimpleDescriptor, { targetShortAddress: deviceAnnounce.shortAddress, endpoint });
                            return desc;
                        }, true);

                        gw.on(MessageType.ReadAttribute | MessageType.Response, x =>
                        {
                            const m = x as attributes.AttributeResponse;
                            if (m.sourceAddress !== deviceAnnounce.shortAddress)
                                return;

                            const clusterMap = zigbeeToMatterClusterMap.get(m.clusterId);
                            const attr = clusterMap.attributes.find(att => att.zigbeeId == m.attribute);

                            endpointMap[m.sourceAddress][m.endpoint].patch({ [MatterClusterMap[clusterMap.matterId]]: { [attr.matterId]: attr.convert ? attr.convert(m.value) : m.value } });
                        });


                        for (const endpointDesc of endpointDescs)
                        {
                            endpointMap[deviceAnnounce.shortAddress][endpointDesc.endpoint] = await fabric.newEndpoint(
                                `${serial}-device-${deviceAnnounce.IEEEAddress.toString(16)}-${endpointDesc.endpoint}`,
                                Object.fromEntries(endpointDesc.inputClusterList.map(zClusterId =>
                                {
                                    const clusterMap = zigbeeToMatterClusterMap.get(zClusterId);
                                    return [ClusterIdNames[clusterMap.matterId], clusterFactory({
                                        id: clusterMap.matterId,
                                    })]
                                })) as any);


                            // fabric.endpoints.push(deviceEndpoint);
                        }
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