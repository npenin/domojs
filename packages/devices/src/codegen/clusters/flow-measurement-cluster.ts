// This file is generated from flow-measurement-cluster.xml - do not edit it directly
// Generated on 2025-12-03T20:57:10.921Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


/**
 * Attributes and commands for configuring the measurement of flow, and reporting flow measurements.
 */

export interface FlowMeasurement {
id: 1028;
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

export const flowMeasurement: ClusterDefinition<FlowMeasurement> = {
id: 1028,
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

export default flowMeasurement;