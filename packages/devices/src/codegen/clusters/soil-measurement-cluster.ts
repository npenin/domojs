

/**
 * This cluster provides an interface to soil measurement functionality, including configuration and provision of notifications of soil measurements.
 */

export interface SoilMeasurement {
id: 1072;
	attributes: {
		readonly SoilMoistureMeasurementLimits:import("./global-structs.js").MeasurementAccuracyStruct
		readonly SoilMoistureMeasuredValue?: number
}
	commands: {
}
	events: {
	}
}