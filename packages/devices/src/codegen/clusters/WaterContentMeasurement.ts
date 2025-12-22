// This file is generated from WaterContentMeasurement.xml - do not edit it directly
// Generated on 2025-12-22T10:19:45.106Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export type RelativeHumidityMeasurement = WaterContentMeasurementClusters & { id: 0x0405};

export interface WaterContentMeasurementClusters {
	attributes: {
		readonly MeasuredValue:number
		readonly MinMeasuredValue:number
		readonly MaxMeasuredValue:number
		readonly Tolerance?:number
}
	commands: {
}
	events: {
	}
}

export const relativeHumidityMeasurement: ClusterDefinition<RelativeHumidityMeasurement> = {
id: 0x0405,
	attributes: [
		"MeasuredValue",
		"MinMeasuredValue",
		"MaxMeasuredValue",
		"Tolerance",
	] as const,
	commands: [
	] as const,
	events: [
	] as const
}