// This file is generated from illuminance-measurement-cluster.xml - do not edit it directly
// Generated on 2025-08-15T06:41:47.453Z

import { Cluster } from '../../server/clients/shared.js';


export enum LightSensorTypeEnum {
	Photodiode= 0,
	CMOS= 1,
}

/**
 * Attributes and commands for configuring the measurement of illuminance, and reporting illuminance measurements.
 */

export interface IlluminanceMeasurement {
id: 1024;
	attributes: {
		readonly MeasuredValue?:number
		readonly MinMeasuredValue?:number
		readonly MaxMeasuredValue?:number
		readonly Tolerance?:number
		readonly LightSensorType?:LightSensorTypeEnum
}
	commands: {
}
	events: {
	}
}

export const illuminanceMeasurement: Cluster<IlluminanceMeasurement['attributes'], IlluminanceMeasurement['commands'], IlluminanceMeasurement['events']> = {
id: 1024,
	attributes: {
		MeasuredValue:0,
		MinMeasuredValue:0,
		MaxMeasuredValue:0,
		Tolerance:0,
		LightSensorType:null,
},
	commands: {
},
	events: {
	}
}

export default illuminanceMeasurement;