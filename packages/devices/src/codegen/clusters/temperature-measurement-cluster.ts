// This file is generated from temperature-measurement-cluster.xml - do not edit it directly
// Generated on 2025-12-03T20:57:12.437Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


/**
 * Attributes and commands for configuring the measurement of temperature, and reporting temperature measurements.
 */

export interface TemperatureMeasurement {
id: 1026;
	attributes: {
		readonly MeasuredValue?:number
		readonly MinMeasuredValue?:number
		readonly MaxMeasuredValue?:number
		readonly Tolerance?:number
}
	commands: {
}
	events: {
	}
}

export const temperatureMeasurement: ClusterDefinition<TemperatureMeasurement> = {
id: 1026,
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