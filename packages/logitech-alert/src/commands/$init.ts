import { CliContext } from '@akala/cli'
import { ProxyConfiguration } from '@akala/config';
import { BridgeConfiguration, clusterFactory, EndpointProxy, MatterClusterIds, occupancySensingCluster, OccupancySensor, registerNode, zoneManagementCluster } from '@domojs/devices'
import sidecar, { SidecarConfiguration } from '@akala/sidecar'
import { base64, ErrorWithStatus, Http, HttpStatusCode, logger, ObservableArray, TcpSocketAdapter } from '@akala/core';
import { XMLParser } from 'fast-xml-parser';
import net from 'node:net'
import { Jabber } from '../jabberCommandHandler.js';

const log = logger.use('domojs:logitech-alert');

export default async function (context: CliContext<any, ProxyConfiguration<SidecarConfiguration & BridgeConfiguration>>, http: Http)
{
    const app = await sidecar(context);
    const fabric = await registerNode('logitech-alert', app, context.state, context.abort.signal);

    await fabric.attach(app.pubsub);

    const cameras = await EndpointProxy.fromBus(app.pubsub, 'domojs/upnp', 'urn:upnp-logitech-com:service:SecurityDeviceControl:1');

    cameras.clusters.descriptor.target.ServerList.onChanged(async ev =>
    {
        console.log('ServerList changed:', ev);
        if (ev.value && !ev.oldValue)
            cameras.clusters.descriptor.target.PartsList;
    }, true);

    cameras.clusters.descriptor.target.PartsList.onChanged(async ev =>
    {
        console.log('PartsList changed:', ev);
        if (!ev.value && !ev.oldValue)
            return;
        cameras.endpoints.replaceArray(await Promise.all(ev.value.map(async id =>
            cameras.endpoints.find(ep => ep.id == id) ||
            await EndpointProxy.fromBus(app.pubsub, 'domojs/upnp', id))
        ));
    });

    cameras.endpoints.addListener(ev =>
    {
        console.log('Cameras changed:', ev);
        if ('newItems' in ev)
        {
            for (const camera of ev.newItems)
            {
                const labels = camera.clusters.fixedLabel.target.LabelList;
                labels.onChanged(async ev =>
                {
                    const labels = Object.fromEntries(ev.value?.map(l => [l.Label, l.Value]) || []);
                    console.log(labels);

                    const usn = labels.uniqueServiceName;
                    if (!usn)
                    {
                        console.warn('No uniqueServiceName label found for Logitech Alert camera');
                        return;
                    }
                    let secretPassword = context.state.get('auth.' + labels.uniqueServiceName);
                    if (!secretPassword)
                    {
                        console.info('No password configured for ' + labels.uniqueServiceName);
                        return;
                    }

                    const res = await http.invokeSOAP('urn:upnp-logitech-com:service:SecurityDeviceControl:1', 'GetExternalServiceConfiguration', labels.location + labels.controlURL, {
                        ExternalServiceName: 'XMPP',
                        ExternalServiceType: ''
                    });
                    const xmlParser = new XMLParser({});
                    const soapRes = await res.text().then(t => xmlParser.parse(t, false));
                    const port = soapRes['s:Envelope']['s:Body']['u:GetExternalServiceConfigurationResponse']['ExternalServicePort'];
                    const data = base64.UTF8ArrToStr(base64.base64DecToArr(soapRes['s:Envelope']['s:Body']['u:GetExternalServiceConfigurationResponse']['ExternalServiceData']));
                    const serverJid = data.substring('serverJID='.length);

                    const socket = new net.Socket();
                    const jabber = new Jabber(new TcpSocketAdapter(socket));
                    await new Promise<void>(resolve => socket.connect({ port, host: new URL(labels.location + labels.controlURL).hostname }, resolve));
                    const features = await jabber.dialog({ type: 'stream:stream', to: labels.address });
                    const jid = `admin@${labels.address}/domojs`;
                    if (features.mechanisms?.length)
                    {
                        if (features.mechanisms[0] == 'PLAIN')
                        {
                            if (typeof secretPassword == 'string')
                                context.state.setSecret('auth.' + labels.uniqueServiceName, secretPassword);

                            const password = typeof secretPassword == 'string' ? secretPassword : await context.state.getSecret('auth.' + labels.uniqueServiceName);

                            await jabber.dialog({
                                type: 'auth',
                                mechanism: features.mechanisms[0],
                                data: base64.base64EncArr(base64.strToUTF8Arr('\x00admin\x00' + password))
                            });
                        }
                    }
                    const authFeatures = await jabber.dialog({
                        type: 'stream:stream',
                        to: labels.address,
                        version: '1.0'
                    });

                    if (authFeatures.bind)
                        await jabber.dialog({
                            type: 'set',
                            from: jid,
                            bind: {
                                resource: 'domojs'
                            }
                        });

                    if (authFeatures.session)
                        await jabber.dialog({
                            type: 'set',
                            from: jid,
                            session: {}
                        });

                    await jabber.dialog({
                        type: 'get',
                        query: {
                            '@_xmlns': 'jabber:iq:roster',
                            '#text': ''
                        }
                    });

                    const device = await jabber.dialog({
                        type: 'set',
                        from: jid,
                        to: serverJid,
                        command: {
                            '@': {
                                xmlns: 'http://jabber.org/protocol/commands',
                                node: 'urn:logitech-com:logitech-alert:nvr:devices:get',
                                action: 'execute',
                                status: 'executing'
                            },
                            x: {
                                '@_xmlns': 'jabber:x:data',
                                '@_type': 'submit'
                                , title: 'Get NVR Devices Request',
                                field: {
                                    '@_type': 'hidden',
                                    '@_var': 'FORM_TYPE',
                                    value: 'urn:logitech-com:logitech-alert:nvr:devices:get'
                                }
                            }
                        }
                    });
                    const nvr: Record<string, string> = Object.fromEntries(device.command.x['item']['field'].map(f => [f['@_var'], f.value]));

                    const motionDetection = await jabber.dialog({
                        type: 'get',
                        from: jid,
                        to: serverJid,
                        MotionDetection: {
                            Device: {
                                '@_id': nvr.DeviceUniqueId,
                            }
                        }
                    })

                    const sub = await jabber.dialog({
                        type: 'set',
                        to: serverJid,
                        from: jid,
                        pubsub: {
                            subscribe: {
                                '@': {
                                    'node': 'urn:logitech-com:logitech-alert:remote-event:device:media:recording:started',
                                    'jid': jid
                                },
                                options: {
                                    x: {
                                        '@': {
                                            'xmlns': 'jabber:x:data',
                                            'type': 'submit'
                                        },
                                        field: [{
                                            '@': {
                                                'type': 'hidden',
                                                'var': 'FORM_TYPE'
                                            },
                                            value: 'http://jabber.org/protocol/pubsub#subscribe_options',
                                        }, {
                                            '@_var': 'pubsub#subscription_type',
                                            value: 'items'
                                        }]
                                    }
                                }
                            }
                        }
                    });

                    // Extract motion detection zones from response
                    const zones = new ObservableArray<zoneManagementCluster.ZoneInformationStruct>([]);
                    let zoneId: 1;
                    if (motionDetection.MotionDetection?.zones.zones)
                    {
                        for (const zone of motionDetection.MotionDetection.zones.zones)
                        {
                            zones.push({
                                ZoneID: zoneId++,
                                ZoneType: zoneManagementCluster.ZoneTypeEnum.TwoDCARTZone,
                                ZoneSource: zoneManagementCluster.ZoneSourceEnum.User,
                                TwoDCartesianZone: {
                                    Name: `Zone ${zones.length + 1}`,
                                    Use: zoneManagementCluster.ZoneUseEnum.Motion,
                                    Vertices: [
                                        { X: zone.x, Y: zone.y },
                                        { X: zone.x + zone.width, Y: zone.y },
                                        { X: zone.x + zone.width, Y: zone.y + zone.height },
                                        { X: zone.x, Y: zone.y + zone.height }
                                    ]
                                }
                            });
                        }
                    }

                    const cameraEndpoint = await fabric.newEndpoint(usn, {
                        fixedLabel: clusterFactory({
                            id: MatterClusterIds.FixedLabel,
                            LabelList: Object.entries(labels).map(kv => ({ Label: kv[0], Value: kv[1] }))
                        }),
                        occupancySensing: clusterFactory({
                            id: MatterClusterIds.OccupancySensing,
                            Occupancy: occupancySensingCluster.OccupancyBitmap.Occupied,
                            OccupancySensorType: occupancySensingCluster.OccupancySensorTypeEnum.PIR,
                            PIROccupiedToUnoccupiedDelay: 30,
                            PIRUnoccupiedToOccupiedDelay: 0,
                            SupportsActiveInfrared: false,
                            SupportsVision: true,
                            SupportsOther: false,
                            SupportsPassiveInfrared: false,
                            SupportsPhysicalContact: false,
                            SupportsRadar: false,
                            SupportsRFSensing: false,
                            SupportsUltrasonic: false,
                            OccupancySensorTypeBitmap: occupancySensingCluster.OccupancySensorTypeBitmap.PIR,
                        }),
                        // Zone Management cluster for motion detection
                        zoneManagement: clusterFactory({
                            id: MatterClusterIds.ZoneManagement,
                            MaxZones: motionDetection.MotionDetection?.zones.maxCount || 10,
                            Zones: zones.array,
                            Triggers: [] as any,
                            SensitivityMax: 100,
                            Sensitivity: motionDetection.MotionDetection?.overall || 50,
                            SupportsTwoDimensionalCartesianZone: true,
                            SupportsPerZoneSensitivity: false,
                            SupportsUserDefined: true,
                            SupportsFocusZones: false,
                            CreateOrUpdateTriggerCommand: async () => { },
                            RemoveTriggerCommand: async () => { },
                            MaxUserDefinedZones: motionDetection.MotionDetection?.zones.maxCount,
                            async CreateTwoDCartesianZoneCommand(zone)
                            {
                                if (zone.Use !== zoneManagementCluster.ZoneUseEnum.Motion)
                                    throw new ErrorWithStatus(HttpStatusCode.NotAcceptable);

                                zones.push({
                                    ZoneID: zoneId++,
                                    ZoneSource: zoneManagementCluster.ZoneSourceEnum.User,
                                    ZoneType: zoneManagementCluster.ZoneTypeEnum.TwoDCARTZone,
                                    TwoDCartesianZone: {
                                        Name: `Zone ${zoneId}`,
                                        Use: zoneManagementCluster.ZoneUseEnum.Motion,
                                        Vertices: zone.Vertices,
                                        Color: zone.Color
                                    }
                                });

                                return [zoneId]
                            },
                            async RemoveZoneCommand(zone)
                            {
                                zones.splice(zones.findIndex(z => z.ZoneID == zone), 1);


                            },
                        })
                    });

                    if (sub.type == 'result' && sub.command.pubsub['subscription']['@_subscription'] == 'subscribed')
                    {
                        console.info('subscribed to urn:logitech-com:logitech-alert:remote-event:device:media:recording:started');
                        jabber.on('message', msg =>
                        {
                            if (msg.type == 'message')
                            {
                                console.log(msg.event.items.item);

                                if (msg.event.items.item.MediaRecordingStarted?.Reasons['@_motion'] === '1')
                                {
                                    log.info(`Motion detected on camera ${labels.friendlyName || usn}`);
                                    cameraEndpoint.clusters.occupancySensing.setValue('Occupancy', occupancySensingCluster.OccupancyBitmap.Occupied);
                                    // setTimeout(() =>
                                    // {
                                    //     cameraEndpoint.clusters.occupancySensing.setValue('Occupancy', 0 as any);
                                    //     log.info(`No motion on camera ${labels.friendlyName || usn}`);
                                    // }, 30000);
                                }
                            }
                        })
                    }
                    fabric.endpoints.push(cameraEndpoint);
                })
            }
        }
    }, { triggerAtRegistration: true });
}