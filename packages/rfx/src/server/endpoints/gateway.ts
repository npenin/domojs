import { Endpoint, powerSourceCluster, globalEnums, Aggregator, commissionerControlCluster, ClusterMap, Binding, ClusterInstanceLight, clusterFactory, AggregatorEndpoint, RootNode, MatterClusterIds, diagnosticsWiFi, electricalEnergyMeasurement, electricalPowerMeasurement } from "@domojs/devices";
import { Elec1, Elec2, InterfaceControl, InterfaceMessage, Message, PacketType, Rfxtrx, Rfy, TemperatureHumidity, Type } from "@domojs/rfx-parsers";
import { ModeEndpoint } from "./mode.js";
import { IsomorphicBuffer, ObservableArray, ObservableObject } from "@akala/core";
import { RfyWindowCovering } from "./rfy.js";

export class GatewayEndpoint extends AggregatorEndpoint<never>
{
    constructor(id: number, public readonly deviceName: string, public readonly gateway: Rfxtrx, fabric: RootNode<never>)
    {
        super(deviceName.toString(), id, {
            userLabel: clusterFactory({
                id: MatterClusterIds.UserLabel,
                LabelList: [
                    {
                        Label: 'Name',
                        Value: deviceName
                    }
                ]
            })
        });

        const sensors: { [key in PacketType]?: Record<number, Endpoint[]> } = {};

        gateway.on('message', async message =>
        {
            switch (message.type >> 8)
            {
                case PacketType.INTERFACE_MESSAGE:
                    if (message.type === Type.INTERFACE_MESSAGE.listRFYRemotes || message.type === Type.INTERFACE_MESSAGE.listASARemotes)
                    {
                        const remote = (message as Message<InterfaceMessage.ListRFYRemote>).message;
                        const endpointName = `rfy-${remote.id1}-${remote.id2}-${remote.id3}-${remote.unitCode}`;
                        const endpointId = await fabric.getEndpointId(endpointName);
                        if (!this.endpoints.find(ep => ep.id == endpointId))
                            this.endpoints.push(new Endpoint(endpointName, endpointId, { windowCovering: RfyWindowCovering(gateway, remote) }));
                    }
                    break;
                case PacketType.TEMPERATURE_HUMIDITY:
                    {
                        const m = message.message as TemperatureHumidity.Device;
                        let endpoint: Endpoint;
                        const sensorTypes = sensors[message.type];
                        if (!sensorTypes)
                            sensors[message.type] = {};
                        else
                            endpoint = sensorTypes[m.id][0];
                        if (!endpoint)
                            this.endpoints.push(endpoint = await fabric.newEndpoint(`${message.type}-${m.id}`, {
                                temperatureMeasurement: clusterFactory({
                                    id: MatterClusterIds.TemperatureMeasurement,
                                    MeasuredValue: m.temperature,
                                    MaxMeasuredValue: 0x8FFF,
                                    MinMeasuredValue: -0x8FFF,
                                    Tolerance: 10,
                                }),
                                relativeHumidityMeasurement: clusterFactory({
                                    id: MatterClusterIds.RelativeHumidityMeasurement,
                                    MaxMeasuredValue: 0xff,
                                    MinMeasuredValue: 0x00,
                                    MeasuredValue: m.humidity,
                                    Tolerance: 0,
                                }),
                                powerSource: clusterFactory({
                                    id: MatterClusterIds.PowerSource,
                                    Description: '',
                                    EndpointList: [],
                                    Order: 1,
                                    Status: powerSourceCluster.PowerSourceStatusEnum.Active,
                                    BatChargeLevel:
                                        m.batteryLevel > 3 ?
                                            powerSourceCluster.BatChargeLevelEnum.OK :
                                            m.batteryLevel < 1 ?
                                                powerSourceCluster.BatChargeLevelEnum.Critical :
                                                powerSourceCluster.BatChargeLevelEnum.Warning,
                                    BatChargeState: powerSourceCluster.BatChargeStateEnum.IsNotCharging,
                                    BatReplaceability: powerSourceCluster.BatReplaceabilityEnum.UserReplaceable,
                                    BatFunctionalWhileCharging: false,
                                    BatQuantity: 2,
                                    BatReplacementNeeded: false,
                                    BatReplacementDescription: '',
                                    WiredCurrentType: powerSourceCluster.WiredCurrentTypeEnum.AC,
                                    SupportsBattery: false,
                                    SupportsWired: false,
                                    SupportsRechargeable: false,
                                    SupportsReplaceable: false,
                                }),
                                wiFiNetworkDiagnostics: clusterFactory({
                                    id: MatterClusterIds.WiFiNetworkDiagnostics,
                                    RSSI: m.rssi,
                                    BSSID: IsomorphicBuffer.from(this.deviceName),
                                    ChannelNumber: 0,
                                    SecurityType: diagnosticsWiFi.SecurityTypeEnum.Unspecified,
                                    WiFiVersion: diagnosticsWiFi.WiFiVersionEnum.A,
                                    SupportsPacketCounts: false,
                                    SupportsErrorCounts: false,
                                    BeaconLostCount: 0,
                                    BeaconRxCount: 0,
                                    PacketMulticastRxCount: 0,
                                    PacketMulticastTxCount: 0,
                                    PacketUnicastRxCount: 0,
                                    PacketUnicastTxCount: 0,
                                    OverrunCount: 0n,
                                    async ResetCountsCommand()
                                    {
                                        this.BeaconLostCount = 0;
                                        this.BeaconRxCount = 0;
                                        this.PacketMulticastRxCount = 0;
                                        this.PacketMulticastTxCount = 0;
                                        this.PacketUnicastRxCount = 0;
                                        this.PacketUnicastTxCount = 0;
                                        this.OverrunCount = 0n;
                                    }
                                })
                            }));
                        else
                            endpoint.patch({
                                temperatureMeasurement: {
                                    MeasuredValue: m.temperature,
                                },
                                relativeHumidityMeasurement: {
                                    MeasuredValue: m.humidity,
                                },
                                powerSource: {
                                    BatChargeLevel:
                                        m.batteryLevel > 3 ?
                                            powerSourceCluster.BatChargeLevelEnum.OK :
                                            m.batteryLevel < 1 ?
                                                powerSourceCluster.BatChargeLevelEnum.Critical :
                                                powerSourceCluster.BatChargeLevelEnum.Warning
                                },
                                wiFiNetworkDiagnostics: {
                                    RSSI: m.rssi,
                                }
                            })
                    }
                    break;
                case PacketType.ENERGY:
                    {
                        const m = message.message as Elec2.Device;
                        let endpoint: Endpoint;
                        const sensorTypes = sensors[message.type];
                        if (!sensorTypes)
                            sensors[message.type] = {};
                        else
                            endpoint = sensorTypes[m.sensorId][0];
                        if (!endpoint)
                            this.endpoints.push(endpoint = await fabric.newEndpoint(`${message.type}-${m.sensorId}`, {
                                electricalEnergyMeasurement: clusterFactory({
                                    id: MatterClusterIds.ElectricalEnergyMeasurement,
                                    Accuracy: {
                                        AccuracyRanges: [{
                                            RangeMax: 0xffffffffn,
                                            RangeMin: 0x0n,
                                        }],
                                        MaxMeasuredValue: 0xffffffffn,
                                        MinMeasuredValue: 0x0n,
                                        Measured: false,
                                        MeasurementType: electricalEnergyMeasurement.MeasurementTypeEnum.ActivePower
                                    },
                                    CumulativeEnergyImported: {
                                        Energy: m.total / 223.666, // Wh or kWh depending on your data,
                                    },
                                    PeriodicEnergyImported: {
                                        Energy: m.instant,
                                    },
                                    PeriodicEnergyExported: {
                                        Energy: 0,
                                    },
                                    SupportsApparentEnergy: false,
                                    SupportsCumulativeEnergy: true,
                                    SupportsExportedEnergy: false,
                                    SupportsImportedEnergy: true,
                                    SupportsPeriodicEnergy: true,
                                    SupportsReactiveEnergy: false,
                                    CumulativeEnergyExported: null,

                                }),
                                powerSource: clusterFactory({
                                    id: MatterClusterIds.PowerSource,
                                    Description: '',
                                    EndpointList: [],
                                    Order: 1,
                                    Status: powerSourceCluster.PowerSourceStatusEnum.Active,
                                    BatChargeLevel:
                                        m.batteryLevel > 3 ?
                                            powerSourceCluster.BatChargeLevelEnum.OK :
                                            m.batteryLevel < 1 ?
                                                powerSourceCluster.BatChargeLevelEnum.Critical :
                                                powerSourceCluster.BatChargeLevelEnum.Warning,
                                    SupportsBattery: false,
                                    SupportsWired: false,
                                    SupportsRechargeable: false,
                                    SupportsReplaceable: false,
                                    WiredCurrentType: powerSourceCluster.WiredCurrentTypeEnum.AC,
                                    BatChargeState: powerSourceCluster.BatChargeStateEnum.IsNotCharging,
                                    BatReplaceability: powerSourceCluster.BatReplaceabilityEnum.UserReplaceable,
                                    BatFunctionalWhileCharging: false,
                                    BatQuantity: 2,
                                    BatReplacementNeeded: false,
                                    BatReplacementDescription: '',
                                }),
                                wiFiNetworkDiagnostics: clusterFactory({
                                    id: MatterClusterIds.WiFiNetworkDiagnostics,
                                    RSSI: m.rssi,
                                    BSSID: IsomorphicBuffer.from(this.deviceName),
                                    ChannelNumber: 0,
                                    SecurityType: diagnosticsWiFi.SecurityTypeEnum.Unspecified,
                                    WiFiVersion: diagnosticsWiFi.WiFiVersionEnum.A,
                                    SupportsErrorCounts: false,
                                    SupportsPacketCounts: false,
                                    BeaconLostCount: 0,
                                    BeaconRxCount: 0,
                                    PacketMulticastRxCount: 0,
                                    PacketMulticastTxCount: 0,
                                    PacketUnicastRxCount: 0,
                                    PacketUnicastTxCount: 0,
                                    OverrunCount: 0n,
                                    async ResetCountsCommand()
                                    {
                                        this.BeaconLostCount = 0;
                                        this.BeaconRxCount = 0;
                                        this.PacketMulticastRxCount = 0;
                                        this.PacketMulticastTxCount = 0;
                                        this.PacketUnicastRxCount = 0;
                                        this.PacketUnicastTxCount = 0;
                                        this.OverrunCount = 0n;
                                    }
                                })
                            }));
                        else
                            endpoint.patch({
                                electricalEnergyMeasurement: {
                                    CumulativeEnergyImported: {
                                        Energy: m.total / 223.666, // Wh or kWh depending on your data,
                                    },
                                    PeriodicEnergyImported: {
                                        Energy: m.instant,
                                    }
                                },
                                powerSource: {
                                    BatChargeLevel:
                                        m.batteryLevel > 3 ?
                                            powerSourceCluster.BatChargeLevelEnum.OK :
                                            m.batteryLevel < 1 ?
                                                powerSourceCluster.BatChargeLevelEnum.Critical :
                                                powerSourceCluster.BatChargeLevelEnum.Warning
                                },
                                wiFiNetworkDiagnostics: {
                                    RSSI: m.rssi,
                                }
                            })
                    }

                    break;
                case PacketType.CURRENT_ENERGY:
                    {
                        const m = message.message as Elec1.Device;
                        let endpoint: Endpoint;
                        const sensorTypes = sensors[message.type as PacketType.CURRENT_ENERGY];
                        if (!sensorTypes)
                            sensors[message.type] = {};
                        else
                            endpoint = sensorTypes[m.sensorId][0];
                        if (!endpoint)
                        {
                            this.endpoints.push(endpoint = await fabric.newEndpoint(`${message.type}-${m.sensorId}`, {
                                powerSource: clusterFactory({
                                    id: MatterClusterIds.PowerSource,
                                    Description: '',
                                    EndpointList: [],
                                    Order: 1,
                                    Status: powerSourceCluster.PowerSourceStatusEnum.Active,
                                    BatChargeLevel:
                                        m.batteryLevel > 3 ?
                                            powerSourceCluster.BatChargeLevelEnum.OK :
                                            m.batteryLevel < 1 ?
                                                powerSourceCluster.BatChargeLevelEnum.Critical :
                                                powerSourceCluster.BatChargeLevelEnum.Warning,
                                    SupportsBattery: false,
                                    SupportsRechargeable: false,
                                    SupportsReplaceable: false,
                                    SupportsWired: false,
                                    WiredCurrentType: powerSourceCluster.WiredCurrentTypeEnum.AC,
                                    BatChargeState: powerSourceCluster.BatChargeStateEnum.IsNotCharging,
                                    BatReplaceability: powerSourceCluster.BatReplaceabilityEnum.UserReplaceable,
                                    BatFunctionalWhileCharging: false,
                                    BatQuantity: 2,
                                    BatReplacementNeeded: false,
                                    BatReplacementDescription: '',
                                }),
                                wiFiNetworkDiagnostics: clusterFactory({
                                    id: MatterClusterIds.WiFiNetworkDiagnostics,
                                    RSSI: m.rssi,
                                    BSSID: IsomorphicBuffer.from(this.deviceName),
                                    ChannelNumber: 0,
                                    SecurityType: diagnosticsWiFi.SecurityTypeEnum.Unspecified,
                                    WiFiVersion: diagnosticsWiFi.WiFiVersionEnum.A,
                                    SupportsErrorCounts: false,
                                    SupportsPacketCounts: false,
                                    BeaconLostCount: 0,
                                    BeaconRxCount: 0,
                                    PacketMulticastRxCount: 0,
                                    PacketMulticastTxCount: 0,
                                    PacketUnicastRxCount: 0,
                                    PacketUnicastTxCount: 0,
                                    OverrunCount: 0n,
                                    async ResetCountsCommand()
                                    {
                                        this.BeaconLostCount = 0;
                                        this.BeaconRxCount = 0;
                                        this.PacketMulticastRxCount = 0;
                                        this.PacketMulticastTxCount = 0;
                                        this.PacketUnicastRxCount = 0;
                                        this.PacketUnicastTxCount = 0;
                                        this.OverrunCount = 0n;
                                    }
                                })
                            }));

                            const subEndpoints =

                                [await fabric.newEndpoint(`${message.type}-${m.sensorId}-1`, {
                                    electricalPowerMeasurement: clusterFactory({
                                        id: MatterClusterIds.ElectricalPowerMeasurement,
                                        Accuracy: [],
                                        ActivePower: m.channel1,
                                        NumberOfMeasurementTypes: 0,
                                        PowerMode: electricalPowerMeasurement.PowerModeEnum.Unknown,
                                        SupportsAlternatingCurrent: true,
                                        SupportsDirectCurrent: false,
                                        SupportsHarmonics: false,
                                        SupportsPolyphasePower: false,
                                        SupportsPowerQuality: false,
                                        HarmonicCurrents: [],
                                        HarmonicPhases: [],
                                    }),

                                    electricalEnergyMeasurement: clusterFactory({
                                        id: MatterClusterIds.ElectricalEnergyMeasurement,
                                        Accuracy: {
                                            AccuracyRanges: [{
                                                RangeMax: 0xffffffffn,
                                                RangeMin: 0x0n,
                                            }],
                                            MaxMeasuredValue: 0xffffffffn,
                                            MinMeasuredValue: 0x0n,
                                            Measured: false,
                                            MeasurementType: electricalEnergyMeasurement.MeasurementTypeEnum.ActiveCurrent
                                        },
                                        PeriodicEnergyImported: {
                                            Energy: m.channel1,
                                        },
                                        SupportsApparentEnergy: false,
                                        SupportsCumulativeEnergy: false,
                                        SupportsExportedEnergy: false,
                                        SupportsImportedEnergy: true,
                                        SupportsPeriodicEnergy: true,
                                        SupportsReactiveEnergy: false,
                                        CumulativeEnergyExported: {
                                            Energy: 0,
                                        },
                                        CumulativeEnergyImported: {
                                            Energy: 0
                                        },
                                        PeriodicEnergyExported: {
                                            Energy: 0,
                                        }
                                    }),
                                }),
                                await fabric.newEndpoint(`${message.type}-${m.sensorId}-2`, {
                                    electricalPowerMeasurement: clusterFactory({
                                        id: MatterClusterIds.ElectricalPowerMeasurement,
                                        Accuracy: [],
                                        ActivePower: m.channel2,
                                        NumberOfMeasurementTypes: 0,
                                        PowerMode: electricalPowerMeasurement.PowerModeEnum.Unknown,
                                        SupportsAlternatingCurrent: true,
                                        SupportsDirectCurrent: false,
                                        SupportsHarmonics: false,
                                        SupportsPolyphasePower: false,
                                        SupportsPowerQuality: false,
                                        HarmonicCurrents: [],
                                        HarmonicPhases: [],
                                    }),

                                    electricalEnergyMeasurement: clusterFactory({
                                        id: MatterClusterIds.ElectricalEnergyMeasurement,
                                        Accuracy: {
                                            AccuracyRanges: [{
                                                RangeMax: 0xffffffffn,
                                                RangeMin: 0x0n,
                                            }],
                                            MaxMeasuredValue: 0xffffffffn,
                                            MinMeasuredValue: 0x0n,
                                            Measured: false,
                                            MeasurementType: electricalEnergyMeasurement.MeasurementTypeEnum.ActiveCurrent
                                        },
                                        PeriodicEnergyImported: {
                                            Energy: m.channel2,
                                        },
                                        SupportsApparentEnergy: false,
                                        SupportsCumulativeEnergy: false,
                                        SupportsExportedEnergy: false,
                                        SupportsImportedEnergy: true,
                                        SupportsPeriodicEnergy: true,
                                        SupportsReactiveEnergy: false,
                                        CumulativeEnergyExported: {
                                            Energy: 0,
                                        },
                                        CumulativeEnergyImported: {
                                            Energy: 0
                                        },
                                        PeriodicEnergyExported: {
                                            Energy: 0,
                                        }

                                    }),
                                }),
                                await fabric.newEndpoint(`${message.type}-${m.sensorId}-3`, {
                                    electricalPowerMeasurement: clusterFactory({
                                        id: MatterClusterIds.ElectricalPowerMeasurement,
                                        Accuracy: [],
                                        ActivePower: m.channel3,
                                        NumberOfMeasurementTypes: 0,
                                        PowerMode: electricalPowerMeasurement.PowerModeEnum.Unknown,
                                        SupportsAlternatingCurrent: true,
                                        SupportsDirectCurrent: false,
                                        SupportsHarmonics: false,
                                        SupportsPolyphasePower: false,
                                        SupportsPowerQuality: false,
                                        HarmonicCurrents: [],
                                        HarmonicPhases: [],
                                    }),

                                    electricalEnergyMeasurement: clusterFactory({
                                        id: MatterClusterIds.ElectricalEnergyMeasurement,
                                        Accuracy: {
                                            AccuracyRanges: [{
                                                RangeMax: 0xffffffffn,
                                                RangeMin: 0x0n,
                                            }],
                                            MaxMeasuredValue: 0xffffffffn,
                                            MinMeasuredValue: 0x0n,
                                            Measured: false,
                                            MeasurementType: electricalEnergyMeasurement.MeasurementTypeEnum.ActiveCurrent
                                        },
                                        PeriodicEnergyImported: {
                                            Energy: m.channel3,
                                        },
                                        SupportsApparentEnergy: false,
                                        SupportsCumulativeEnergy: false,
                                        SupportsExportedEnergy: false,
                                        SupportsImportedEnergy: true,
                                        SupportsPeriodicEnergy: true,
                                        SupportsReactiveEnergy: false,
                                        CumulativeEnergyExported: {
                                            Energy: 0,
                                        },
                                        CumulativeEnergyImported: {
                                            Energy: 0
                                        },
                                        PeriodicEnergyExported: {
                                            Energy: 0,
                                        }
                                    }),
                                })];

                            sensorTypes[m.sensorId].push(...subEndpoints);
                            this.endpoints.push(...subEndpoints);
                            endpoint.clusters.descriptor.setValue('PartsList', subEndpoints.map(ep => ep.id));
                        }
                        else
                        {
                            endpoint.patch({
                                powerSource: {
                                    BatChargeLevel:
                                        m.batteryLevel > 3 ?
                                            powerSourceCluster.BatChargeLevelEnum.OK :
                                            m.batteryLevel < 1 ?
                                                powerSourceCluster.BatChargeLevelEnum.Critical :
                                                powerSourceCluster.BatChargeLevelEnum.Warning
                                },
                                wiFiNetworkDiagnostics: {
                                    RSSI: m.rssi,
                                }
                            })

                            sensorTypes[m.sensorId][1].patch({
                                electricalEnergyMeasurement: {
                                    PeriodicEnergyImported: {
                                        Energy: m.channel1,
                                    }
                                },
                            })
                            sensorTypes[m.sensorId][2].patch({
                                electricalEnergyMeasurement: {
                                    PeriodicEnergyImported: {
                                        Energy: m.channel2,
                                    }
                                },
                            })
                            sensorTypes[m.sensorId][2].patch({
                                electricalEnergyMeasurement: {
                                    PeriodicEnergyImported: {
                                        Energy: m.channel3,
                                    }
                                },
                            })
                        }
                    }

                    break;
            }
        })
        gateway.send(Type.RFY.Standard, { command: Rfy.Internal.Commands.List });
        ModeEndpoint.getEndpoints(gateway, deviceName, fabric).then(endpoints => this.endpoints.push(...endpoints));

        // TODO: bind on other events to update endpoints
    }

    // public static async fromURL(url: URL)
    // {
    //     const gateway = await rfxGatewayHandler.process(url);
    //     if (!gateway)
    //         throw new Error('no gateway found for ' + url.href);
    //     await gateway.start();
    //     const node = new GatewayNode(gateway);
    //     node.name = url.pathname.replace(/^\/dev\//, '') + '@' + url.hostname;
    //     node.endpoints.push({
    //         name: 'root',
    //         clusters: [{
    //             id: Clusters.BasicInformation,
    //             data: {
    //                 location: 'RFXCOM Gateway',
    //                 vendorProductId: gateway.vendorProductId,
    //                 serialNumber: gateway.serialNumber
    //             },
    //             commands: {

    //             }
    //         }],
    //     })
    //     return new GatewayNode(gateway);
    // }

    offline(): Promise<void>
    {
        return this.gateway.close();
    }

}
