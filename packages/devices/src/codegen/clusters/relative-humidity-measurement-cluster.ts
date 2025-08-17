// This file is generated from relative-humidity-measurement-cluster.xml - do not edit it directly
// Generated on 2025-08-15T06:41:48.450Z

import { Cluster } from '../../server/clients/shared.js';


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

export const relativeHumidityMeasurement: Cluster<RelativeHumidityMeasurement['attributes'], RelativeHumidityMeasurement['commands'], RelativeHumidityMeasurement['events']> = {
id: 1029,
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

export default relativeHumidityMeasurement;