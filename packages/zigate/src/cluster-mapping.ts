import { Cluster as ZigbeeCluster } from '@domojs/zigate-parsers';
import { MatterClusterIds, clusterFactory, ClusterMap } from '@domojs/devices';

export interface AttributeMapping
{
    zigbeeId: number;
    matterId: string;
    convert?: (value: any) => any;
}

export interface ClusterMapping
{
    matterId: number;
    attributes: AttributeMapping[];
    // Add command mappings later if needed
}

// Maps Zigbee cluster IDs to Matter clusters with attribute mappings
export const zigbeeToMatterClusterMap = new Map<ZigbeeCluster, ClusterMapping>([
    // Core clusters
    [ZigbeeCluster.Basic, {
        matterId: MatterClusterIds.BasicInformation,
        attributes: [
            { zigbeeId: 0x0000, matterId: 'VendorName' },    // ZCLVersion -> mapped to vendor
            { zigbeeId: 0x0004, matterId: 'VendorName' },    // ManufacturerName
            { zigbeeId: 0x0005, matterId: 'ProductName' },    // ModelIdentifier
            { zigbeeId: 0x0006, matterId: 'SerialNumber' },   // DateCode -> mapped to serial
            { zigbeeId: 0x0007, matterId: 'HardwareVersion' }, // PowerSource
            { zigbeeId: 0x0010, matterId: 'SoftwareVersion' }  // LocationDesc -> mapped to sw version
        ]
    }],

    // Device control clusters
    [ZigbeeCluster.OnOff, {
        matterId: MatterClusterIds.OnOff,
        attributes: [
            {
                zigbeeId: 0x0000,
                matterId: 'OnOff',
                convert: (value: boolean) => value
            },
            {
                zigbeeId: 0x4000,
                matterId: 'GlobalSceneControl'
            },
            {
                zigbeeId: 0x4001,
                matterId: 'OnTime'
            },
            {
                zigbeeId: 0x4002,
                matterId: 'OffWaitTime'
            }
        ]
    }],

    [ZigbeeCluster.LevelControl, {
        matterId: MatterClusterIds.LevelControl,
        attributes: [
            {
                zigbeeId: 0x0000,
                matterId: 'CurrentLevel',
                convert: (value: number) => Math.round((value / 255) * 100) // Convert 0-255 to 0-100
            },
            {
                zigbeeId: 0x0001,
                matterId: 'RemainingTime'
            }
        ]
    }],

    [ZigbeeCluster.LightingColorControl, {
        matterId: MatterClusterIds.ColorControl,
        attributes: [
            {
                zigbeeId: 0x0000,
                matterId: 'CurrentHue',
                convert: (value: number) => Math.round((value / 255) * 360) // Convert to degrees
            },
            {
                zigbeeId: 0x0001,
                matterId: 'CurrentSaturation',
                convert: (value: number) => Math.round((value / 255) * 100) // Convert to percentage
            },
            {
                zigbeeId: 0x0003,
                matterId: 'RemainingTime'
            },
            {
                zigbeeId: 0x0007,
                matterId: 'ColorTemperatureMireds'
            }
        ]
    }],

    // Measurement clusters
    [ZigbeeCluster.Temperature, {
        matterId: MatterClusterIds.TemperatureMeasurement,
        attributes: [
            {
                zigbeeId: 0x0000,
                matterId: 'MeasuredValue',
                convert: (value: number) => value / 100 // Convert from centi-degrees to degrees
            },
            {
                zigbeeId: 0x0001,
                matterId: 'MinMeasuredValue',
                convert: (value: number) => value / 100
            },
            {
                zigbeeId: 0x0002,
                matterId: 'MaxMeasuredValue',
                convert: (value: number) => value / 100
            }
        ]
    }],

    [ZigbeeCluster.Humidity, {
        matterId: MatterClusterIds.RelativeHumidityMeasurement,
        attributes: [
            {
                zigbeeId: 0x0000,
                matterId: 'MeasuredValue',
                convert: (value: number) => value / 100 // Convert to percentage
            },
            {
                zigbeeId: 0x0001,
                matterId: 'MinMeasuredValue',
                convert: (value: number) => value / 100
            },
            {
                zigbeeId: 0x0002,
                matterId: 'MaxMeasuredValue',
                convert: (value: number) => value / 100
            }
        ]
    }],

    [ZigbeeCluster.Occupancy, {
        matterId: MatterClusterIds.OccupancySensing,
        attributes: [
            {
                zigbeeId: 0x0000,
                matterId: 'Occupancy',
                convert: (value: number) => value === 1 // Convert to boolean
            },
            {
                zigbeeId: 0x0001,
                matterId: 'OccupancySensorType'
            },
            {
                zigbeeId: 0x0002,
                matterId: 'OccupancySensorTypeBitmap'
            }
        ]
    }],

    // Security clusters
    [ZigbeeCluster.IASZone, {
        matterId: MatterClusterIds.ZoneManagement,
        attributes: [
            {
                zigbeeId: 0x0000,
                matterId: 'ZoneState'
            },
            {
                zigbeeId: 0x0001,
                matterId: 'ZoneType'
            },
            {
                zigbeeId: 0x0002,
                matterId: 'ZoneStatus'
            }
        ]
    }],

    // Power Configuration
    [ZigbeeCluster.PowerConfig, {
        matterId: MatterClusterIds.PowerSource,
        attributes: [
            {
                zigbeeId: 0x0000,
                matterId: 'Status'
            },
            {
                zigbeeId: 0x0001,
                matterId: 'Order'
            },
            {
                zigbeeId: 0x0020,
                matterId: 'BatVoltage',
                convert: (value: number) => value / 10 // Convert to actual voltage
            },
            {
                zigbeeId: 0x0021,
                matterId: 'BatPercentageRemaining',
                convert: (value: number) => value / 2 // Convert to percentage
            }
        ]
    }]
]);