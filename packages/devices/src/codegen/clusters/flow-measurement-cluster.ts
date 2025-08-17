// This file is generated from flow-measurement-cluster.xml - do not edit it directly
// Generated on 2025-08-17T14:20:45.505Z

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