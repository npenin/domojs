

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
		readonly MeasuredValue?: number
		readonly MinMeasuredValue?: number
		readonly MaxMeasuredValue?: number
		readonly Tolerance?: number
		readonly LightSensorType?:LightSensorTypeEnum
}
	commands: {
}
	events: {
	}
}