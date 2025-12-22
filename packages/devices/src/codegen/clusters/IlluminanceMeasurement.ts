// This file is generated from IlluminanceMeasurement.xml - do not edit it directly
// Generated on 2025-12-22T10:19:33.065Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum LightSensorTypeEnum {
	Photodiode = 0,
	CMOS = 1,
}

export type IlluminanceMeasurement = IlluminanceMeasurementCluster & { id: 0x0400};

export interface IlluminanceMeasurementCluster {
id: 0x0400;
	attributes: {
		readonly MeasuredValue:number
		readonly MinMeasuredValue:number
		readonly MaxMeasuredValue:number
		readonly Tolerance?:number
		readonly LightSensorType?:LightSensorTypeEnum
}
	commands: {
}
	events: {
	}
}

export const illuminanceMeasurement: ClusterDefinition<IlluminanceMeasurement> = {
id: 0x0400,
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