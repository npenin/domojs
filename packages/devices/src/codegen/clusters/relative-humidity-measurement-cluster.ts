// This file is generated from relative-humidity-measurement-cluster.xml - do not edit it directly
// Generated on 2025-12-03T20:57:12.138Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


/**
 * Attributes and commands for configuring the measurement of relative humidity, and reporting relative humidity measurements.
 */

export interface RelativeHumidityMeasurement {
id: 1029;
	attributes: {
		readonly MeasuredValue?:number
		readonly MinMeasuredValue?:number
		readonly MaxMeasuredValue?:number
		readonly Tolerance:number
}
	commands: {
}
	events: {
	}
}

export const relativeHumidityMeasurement: ClusterDefinition<RelativeHumidityMeasurement> = {
id: 1029,
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

export default relativeHumidityMeasurement;