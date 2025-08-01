

/**
 * Attributes and commands for configuring the measurement of temperature, and reporting temperature measurements.
 */

export interface TemperatureMeasurement {
id: 1026;
	attributes: {
		readonly MeasuredValue?: number
		readonly MinMeasuredValue?: number
		readonly MaxMeasuredValue?: number
		readonly Tolerance?: number
}
	commands: {
}
	events: {
	}
}