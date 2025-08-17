// This file is generated from temperature-measurement-cluster.xml - do not edit it directly
// Generated on 2025-08-15T06:41:48.720Z

import { Cluster } from '../../server/clients/shared.js';


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

export const temperatureMeasurement: Cluster<TemperatureMeasurement['attributes'], TemperatureMeasurement['commands'], TemperatureMeasurement['events']> = {
id: 1026,
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

export default temperatureMeasurement;