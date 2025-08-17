// This file is generated from soil-measurement-cluster.xml - do not edit it directly
// Generated on 2025-08-15T06:41:48.640Z

import { Cluster } from '../../server/clients/shared.js';


/**
 * This cluster provides an interface to soil measurement functionality, including configuration and provision of notifications of soil measurements.
 */

export interface SoilMeasurement {
id: 1072;
	attributes: {
		readonly SoilMoistureMeasurementLimits:import("./global-structs.js").MeasurementAccuracyStruct
		readonly SoilMoistureMeasuredValue?:number
}
	commands: {
}
	events: {
	}
}

export const soilMeasurement: Cluster<SoilMeasurement['attributes'], SoilMeasurement['commands'], SoilMeasurement['events']> = {
id: 1072,
	attributes: {
		SoilMoistureMeasurementLimits:null,
		SoilMoistureMeasuredValue:0,
},
	commands: {
},
	events: {
	}
}

export default soilMeasurement;