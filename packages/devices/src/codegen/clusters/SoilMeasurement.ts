// This file is generated from SoilMeasurement.xml - do not edit it directly
// Generated on 2025-12-22T10:26:11.317Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export type SoilMeasurement = SoilMeasurementCluster & { id: 0x0430};

export interface SoilMeasurementCluster {
id: 0x0430;
	attributes: {
		readonly SoilMoistureMeasurementLimits:import("./global-Structs.js").MeasurementAccuracyStruct
		readonly SoilMoistureMeasuredValue:number
}
	commands: {
}
	events: {
	}
}

export const soilMeasurement: ClusterDefinition<SoilMeasurement> = {
id: 0x0430,
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