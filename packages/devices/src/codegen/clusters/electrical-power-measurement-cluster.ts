

export enum PowerModeEnum {
	Unknown= 0,
	DC= 1,
	AC= 2,
}

export interface MeasurementRangeStruct {
	MeasurementType:import("./global-enums.js").MeasurementTypeEnum,
	Min: bigint,
	Max: bigint,
	StartTimestamp?: number,
	EndTimestamp?: number,
	MinTimestamp?: number,
	MaxTimestamp?: number,
	StartSystime?: number,
	EndSystime?: number,
	MinSystime?: number,
	MaxSystime?: number,
}

export interface HarmonicMeasurementStruct {
	Order: number,
	Measurement: bigint,
}

/**
 * This cluster provides a mechanism for querying data about electrical power as measured by the server.
 */

export interface ElectricalPowerMeasurement {
id: 144;
	attributes: {
		readonly PowerMode:PowerModeEnum
		readonly NumberOfMeasurementTypes: number
		readonly Accuracy:readonly import("./global-structs.js").MeasurementAccuracyStruct[]
		readonly Ranges?:readonly MeasurementRangeStruct[]
		readonly Voltage?: number
		readonly ActiveCurrent?: number
		readonly ReactiveCurrent?: number
		readonly ApparentCurrent?: number
		readonly ActivePower?: number
		readonly ReactivePower?: number
		readonly ApparentPower?: number
		readonly RMSVoltage?: number
		readonly RMSCurrent?: number
		readonly RMSPower?: number
		readonly Frequency?: bigint
		readonly HarmonicCurrents?:readonly HarmonicMeasurementStruct[]
		readonly HarmonicPhases?:readonly HarmonicMeasurementStruct[]
		readonly PowerFactor?: bigint
		readonly NeutralCurrent?: number
		/** Supports measurement of direct current */
		readonly SupportsDirectCurrent: boolean
		/** Supports measurement of alternating current */
		readonly SupportsAlternatingCurrent: boolean
		/** Supports polyphase measurements */
		readonly SupportsPolyphasePower: boolean
		/** Supports measurement of AC harmonics */
		readonly SupportsHarmonics: boolean
		/** Supports measurement of AC harmonic phases */
		readonly SupportsPowerQuality: boolean
}
	commands: {
}
	events: {
		MeasurementPeriodRanges?: [
			
			Ranges: MeasurementRangeStruct, ];
	}
}