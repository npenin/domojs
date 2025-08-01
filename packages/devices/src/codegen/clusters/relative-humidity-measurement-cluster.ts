

/**
 * Attributes and commands for configuring the measurement of relative humidity, and reporting relative humidity measurements.
 */

export interface RelativeHumidityMeasurement {
id: 1029;
	attributes: {
		readonly MeasuredValue?: number
		readonly MinMeasuredValue?: number
		readonly MaxMeasuredValue?: number
		readonly Tolerance: number
}
	commands: {
}
	events: {
	}
}