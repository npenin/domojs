// This file is generated from soil-measurement-cluster.xml - do not edit it directly
// Generated on 2025-12-03T20:57:12.343Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


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

export const soilMeasurement: ClusterDefinition<SoilMeasurement> = {
id: 1072,
	attributes: [
		"SoilMoistureMeasurementLimits",
		"SoilMoistureMeasuredValue",
	] as const,
	commands: [
	] as const,
	events: [
	] as const
}

export default soilMeasurement;