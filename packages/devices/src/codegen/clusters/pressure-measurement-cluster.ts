

/**
 * Attributes and commands for configuring the measurement of pressure, and reporting pressure measurements.
 */

export interface PressureMeasurement {
id: 1027;
	attributes: {
		readonly MeasuredValue?: number
		readonly MinMeasuredValue?: number
		readonly MaxMeasuredValue?: number
		readonly Tolerance?: number
		readonly ScaledValue?: number
		readonly MinScaledValue?: number
		readonly MaxScaledValue?: number
		readonly ScaledTolerance?: number
		readonly Scale?: number
		/** Extended range and resolution */
		readonly SupportsExtended: boolean
}
	commands: {
}
	events: {
	}
}