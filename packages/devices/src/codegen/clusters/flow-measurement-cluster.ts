// This file is generated from flow-measurement-cluster.xml - do not edit it directly
// Generated on 2025-08-15T06:41:47.182Z

import { Cluster } from '../../server/clients/shared.js';


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

export const flowMeasurement: Cluster<FlowMeasurement['attributes'], FlowMeasurement['commands'], FlowMeasurement['events']> = {
id: 1028,
	attributes: {
		MeasuredValue:0,
		MinMeasuredValue:0,
		MaxMeasuredValue:0,
		Tolerance:0,
},
	commands: {
},
	events: {
	}
}

export default flowMeasurement;