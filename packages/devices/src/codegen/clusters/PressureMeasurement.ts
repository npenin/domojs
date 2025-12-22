// This file is generated from PressureMeasurement.xml - do not edit it directly
// Generated on 2025-12-22T10:26:10.102Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export type PressureMeasurement = PressureMeasurementCluster & { id: 0x0403};

export interface PressureMeasurementCluster {
id: 0x0403;
	attributes: {
		readonly MeasuredValue:number
		readonly MinMeasuredValue:number
		readonly MaxMeasuredValue:number
		readonly Tolerance?:number
		readonly ScaledValue?:number
		readonly MinScaledValue?:number
		readonly MaxScaledValue?:number
		readonly ScaledTolerance?:number
		readonly Scale?:number
		/** Extended range and resolution */
		readonly SupportsExtended: boolean
}
	commands: {
}
	events: {
	}
}

export const pressureMeasurement: ClusterDefinition<PressureMeasurement> = {
id: 0x0403,
	attributes: [
		"MeasuredValue",
		"MinMeasuredValue",
		"MaxMeasuredValue",
		"Tolerance",
		"ScaledValue",
		"MinScaledValue",
		"MaxScaledValue",
		"ScaledTolerance",
		"Scale",
		"SupportsExtended",
	] as const,
	commands: [
	] as const,
	events: [
	] as const
}

export default pressureMeasurement;