// This file is generated from FlowMeasurement.xml - do not edit it directly
// Generated on 2025-12-22T10:19:32.012Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export type FlowMeasurement = FlowMeasurementCluster & { id: 0x0404};

export interface FlowMeasurementCluster {
id: 0x0404;
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

export const flowMeasurement: ClusterDefinition<FlowMeasurement> = {
id: 0x0404,
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