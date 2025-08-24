// This file is generated from illuminance-measurement-cluster.xml - do not edit it directly
// Generated on 2025-08-24T09:48:33.174Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum LightSensorTypeEnum {
	Photodiode= 0,
	CMOS= 1,
}

/**
 * Attributes and commands for configuring the measurement of illuminance, and reporting illuminance measurements.
 */

export interface IlluminanceMeasurement {
id: 1024;
	attributes: {
		readonly MeasuredValue?:number
		readonly MinMeasuredValue?:number
		readonly MaxMeasuredValue?:number
		readonly Tolerance?:number
		readonly LightSensorType?:LightSensorTypeEnum
}
	commands: {
}
	events: {
	}
}

export const illuminanceMeasurement: ClusterDefinition<IlluminanceMeasurement> = {
id: 1024,
	attributes: [
		"MeasuredValue",
		"MinMeasuredValue",
		"MaxMeasuredValue",
		"Tolerance",
		"LightSensorType",
	] as const,
	commands: [
	] as const,
	events: [
	] as const
}

export default illuminanceMeasurement;