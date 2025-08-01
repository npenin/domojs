

/**
 * Attributes and commands for configuring the measurement of flow, and reporting flow measurements.
 */

export interface FlowMeasurement {
id: 1028;
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