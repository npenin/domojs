import { Cluster as ZigbeeCluster } from '@domojs/zigate-parsers';
import { MatterClusterIds, clusterFactory, ClusterMap, basicInformationCluster, onoffCluster, levelControlCluster, colorControlCluster, temperatureControlCluster, temperatureMeasurementCluster, relativeHumidityMeasurementCluster, occupancySensingCluster, powerSourceCluster } from '@domojs/devices';

export interface AttributeMapping
{
    zigbeeId: number;
    matterId: string;
    convert?: (value: any) => any;
    unconvert?: (value: any) => any;
}

export interface CommandMapping
{
    zigbeeId: number;
    matterId: string;

}

export interface ClusterMapping
{
    matterId: number;
    attributes: AttributeMapping[];
    commands?: CommandMapping[];
}

// Maps Zigbee cluster IDs to Matter clusters with attribute mappings
export const zigbeeToMatterClusterMap = new Map<ZigbeeCluster, ClusterMapping>([
    // Core clusters
    [ZigbeeCluster.Basic, {
        matterId: MatterClusterIds.BasicInformation,
        attributes: [
            { zigbeeId: 0x0000, matterId: basicInformationCluster.default.attributes.find(a => a == 'VendorName') },    // ZCLVersion -> mapped to vendor
            { zigbeeId: 0x0004, matterId: basicInformationCluster.default.attributes.find(a => a == 'VendorName') },    // ManufacturerName
            { zigbeeId: 0x0005, matterId: basicInformationCluster.default.attributes.find(a => a == 'ProductName') },    // ModelIdentifier
            { zigbeeId: 0x0006, matterId: basicInformationCluster.default.attributes.find(a => a == 'SerialNumber') },   // DateCode -> mapped to serial
            { zigbeeId: 0x0007, matterId: basicInformationCluster.default.attributes.find(a => a == 'HardwareVersion') }, // PowerSource
            { zigbeeId: 0x0010, matterId: basicInformationCluster.default.attributes.find(a => a == 'SoftwareVersion') }  // LocationDesc -> mapped to sw version
        ]
    }],

    // Device control clusters
    [ZigbeeCluster.OnOff, {
        matterId: MatterClusterIds.OnOff,
        attributes: [
            {
                zigbeeId: 0x0000,
                matterId: onoffCluster.default.attributes.find(a => a == 'OnOff'),
                convert: (value: boolean) => value ? 0 : 1
            },
            {
                zigbeeId: 0x4000,
                matterId: onoffCluster.default.attributes.find(a => a == 'GlobalSceneControl')
            },
            {
                zigbeeId: 0x4001,
                matterId: onoffCluster.default.attributes.find(a => a == 'OnTime')
            },
            {
                zigbeeId: 0x4002,
                matterId: onoffCluster.default.attributes.find(a => a == 'OffWaitTime')
            }
        ]
    }],

    [ZigbeeCluster.LevelControl, {
        matterId: MatterClusterIds.LevelControl,
        attributes: [
            {
                zigbeeId: 0x0000,
                matterId: levelControlCluster.default.attributes.find(a => a == 'CurrentLevel'),
                convert: (value: number) => Math.round((value / 255) * 100), // Convert 0-255 to 0-100
                unconvert: (value: number) => Math.round((value / 100) * 255), // Convert 0-100 to 0-255

            },
            {
                zigbeeId: 0x0001,
                matterId: levelControlCluster.default.attributes.find(a => a == 'RemainingTime')
            }
        ]
    }],

    [ZigbeeCluster.LightingColorControl, {
        matterId: MatterClusterIds.ColorControl,
        attributes: [
            {
                zigbeeId: 0x0000,
                matterId: colorControlCluster.default.attributes.find(a => a == 'CurrentHue'),
                convert: (value: number) => Math.round((value / 255) * 360), // Convert to degrees
                unconvert: (value: number) => Math.round((value / 360) * 255), // Convert to degrees
            },
            {
                zigbeeId: 0x0001,
                matterId: colorControlCluster.default.attributes.find(a => a == 'CurrentSaturation'),
                convert: (value: number) => Math.round((value / 255) * 100), // Convert to percentage
                unconvert: (value: number) => Math.round((value / 100) * 255) // Convert to percentage
            },
            {
                zigbeeId: 0x0003,
                matterId: colorControlCluster.default.attributes.find(a => a == 'RemainingTime')
            },
            {
                zigbeeId: 0x0007,
                matterId: colorControlCluster.default.attributes.find(a => a == 'ColorTemperatureMireds')
            }
        ]
    }],

    // Measurement clusters
    [ZigbeeCluster.Temperature, {
        matterId: MatterClusterIds.TemperatureMeasurement,
        attributes: [
            {
                zigbeeId: 0x0000,
                matterId: temperatureMeasurementCluster.default.attributes.find(a => a == 'MeasuredValue'),
                convert: (value: number) => value / 100, // Convert from centi-degrees to degrees
                unconvert: (value: number) => value * 100 // Convert from centi-degrees to degrees
            },
            {
                zigbeeId: 0x0001,
                matterId: temperatureMeasurementCluster.default.attributes.find(a => a == 'MinMeasuredValue'),
                convert: (value: number) => value / 100,
                unconvert: (value: number) => value * 100,
            },
            {
                zigbeeId: 0x0002,
                matterId: temperatureMeasurementCluster.default.attributes.find(a => a == 'MaxMeasuredValue'),
                convert: (value: number) => value / 100,
                unconvert: (value: number) => value * 100,
            }
        ]
    }],

    [ZigbeeCluster.Humidity, {
        matterId: MatterClusterIds.RelativeHumidityMeasurement,
        attributes: [
            {
                zigbeeId: 0x0000,
                matterId: relativeHumidityMeasurementCluster.default.attributes.find(a => a == 'MeasuredValue'),
                convert: (value: number) => value / 100, // Convert to percentage
                unconvert: (value: number) => value * 100,
            },
            {
                zigbeeId: 0x0001,
                matterId: relativeHumidityMeasurementCluster.default.attributes.find(a => a == 'MinMeasuredValue'),
                convert: (value: number) => value / 100,
                unconvert: (value: number) => value * 100,
            },
            {
                zigbeeId: 0x0002,
                matterId: relativeHumidityMeasurementCluster.default.attributes.find(a => a == 'MaxMeasuredValue'),
                convert: (value: number) => value / 100,
                unconvert: (value: number) => value * 100,
            }
        ]
    }],

    [ZigbeeCluster.Occupancy, {
        matterId: MatterClusterIds.OccupancySensing,
        attributes: [
            {
                zigbeeId: 0x0000,
                matterId: occupancySensingCluster.default.attributes.find(a => a == 'Occupancy'),
                convert: (value: number) => value === 1, // Convert to boolean
                unconvert: (value: boolean) => value ? 1 : 0
            },
            {
                zigbeeId: 0x0001,
                matterId: occupancySensingCluster.default.attributes.find(a => a == 'OccupancySensorType')
            },
            {
                zigbeeId: 0x0002,
                matterId: occupancySensingCluster.default.attributes.find(a => a == 'OccupancySensorTypeBitmap')
            }
        ]
    }],

    // Security clusters
    // [ZigbeeCluster.IASZone, {
    //     matterId: MatterClusterIds.ZoneManagement,
    //     attributes: [
    //         {
    //             zigbeeId: 0x0000,
    //             matterId: 'ZoneState'
    //         },
    //         {
    //             zigbeeId: 0x0001,
    //             matterId: 'ZoneType'
    //         },
    //         {
    //             zigbeeId: 0x0002,
    //             matterId: 'ZoneStatus'
    //         }
    //     ]
    // }],

    // Power Configuration
    [ZigbeeCluster.PowerConfig, {
        matterId: MatterClusterIds.PowerSource,
        attributes: [
            {
                zigbeeId: 0x0000,
                matterId: powerSourceCluster.default.attributes.find(a => a == 'Status')
            },
            {
                zigbeeId: 0x0001,
                matterId: powerSourceCluster.default.attributes.find(a => a == 'Order')
            },
            {
                zigbeeId: 0x0020,
                matterId: powerSourceCluster.default.attributes.find(a => a == 'BatVoltage'),
                convert: (value: number) => value / 10, // Convert to actual voltage
                unconvert: (value: number) => value * 10,
            },
            {
                zigbeeId: 0x0021,
                matterId: powerSourceCluster.default.attributes.find(a => a == 'BatPercentRemaining'),
                convert: (value: number) => value / 2, // Convert to percentage
                unconvert: (value: number) => value * 2,
            }
        ]
    }]
]);