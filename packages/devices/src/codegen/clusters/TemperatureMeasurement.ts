// This file is generated from TemperatureMeasurement.xml - do not edit it directly
// Generated on 2025-12-18T03:05:14.036Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export type TemperatureMeasurement = TemperatureMeasurementCluster & { id: 0x0402};

export interface TemperatureMeasurementCluster {
id: 0x0402;
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

export const temperatureMeasurement: ClusterDefinition<TemperatureMeasurement> = {
id: 0x0402,
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

export default temperatureMeasurement;