// This file is generated from pressure-measurement-cluster.xml - do not edit it directly
// Generated on 2025-08-15T06:41:48.262Z

import { Cluster } from '../../server/clients/shared.js';


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

export const pressureMeasurement: Cluster<PressureMeasurement['attributes'], PressureMeasurement['commands'], PressureMeasurement['events']> = {
id: 1027,
	attributes: {
		MeasuredValue:0,
		MinMeasuredValue:0,
		MaxMeasuredValue:0,
		Tolerance:0,
		ScaledValue:0,
		MinScaledValue:0,
		MaxScaledValue:0,
		ScaledTolerance:0,
		Scale:0,
		/** Extended range and resolution */
	SupportsExtended: false,
},
	commands: {
},
	events: {
	}
}

export default pressureMeasurement;