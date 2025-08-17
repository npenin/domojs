// This file is generated from pressure-measurement-cluster.xml - do not edit it directly
// Generated on 2025-08-17T14:20:46.311Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


/**
 * Attributes and commands for configuring the measurement of pressure, and reporting pressure measurements.
 */

export interface PressureMeasurement {
id: 1027;
	attributes: {
		readonly MeasuredValue?:number
		readonly MinMeasuredValue?:number
		readonly MaxMeasuredValue?:number
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
id: 1027,
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