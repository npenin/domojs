// This file is generated from electrical-power-measurement-cluster.xml - do not edit it directly
// Generated on 2025-08-17T14:20:45.356Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum PowerModeEnum {
	Unknown= 0,
	DC= 1,
	AC= 2,
}

export interface MeasurementRangeStruct {
	MeasurementType:import("./global-enums.js").MeasurementTypeEnum,
	Min:bigint,
	Max:bigint,
	StartTimestamp?:number,
	EndTimestamp?:number,
	MinTimestamp?:number,
	MaxTimestamp?:number,
	StartSystime?:number,
	EndSystime?:number,
	MinSystime?:number,
	MaxSystime?:number,
}

export interface HarmonicMeasurementStruct {
	Order:number,
	Measurement:bigint,
}

/**
 * This cluster provides a mechanism for querying data about electrical power as measured by the server.
 */

export interface ElectricalPowerMeasurement {
id: 144;
	attributes: {
		readonly PowerMode:PowerModeEnum
		readonly NumberOfMeasurementTypes:number
		readonly Accuracy:readonly import("./global-structs.js").MeasurementAccuracyStruct[]
		readonly Ranges?:readonly MeasurementRangeStruct[]
		readonly Voltage?:number
		readonly ActiveCurrent?:number
		readonly ReactiveCurrent?:number
		readonly ApparentCurrent?:number
		readonly ActivePower?:number
		readonly ReactivePower?:number
		readonly ApparentPower?:number
		readonly RMSVoltage?:number
		readonly RMSCurrent?:number
		readonly RMSPower?:number
		readonly Frequency?:bigint
		readonly HarmonicCurrents?:readonly HarmonicMeasurementStruct[]
		readonly HarmonicPhases?:readonly HarmonicMeasurementStruct[]
		readonly PowerFactor?:bigint
		readonly NeutralCurrent?:number
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
			
			Ranges: readonly MeasurementRangeStruct[], ];
	}
}

export const electricalPowerMeasurement: ClusterDefinition<ElectricalPowerMeasurement> = {
id: 144,
	attributes: [
		"PowerMode",
		"NumberOfMeasurementTypes",
		"Accuracy",
		"Ranges",
		"Voltage",
		"ActiveCurrent",
		"ReactiveCurrent",
		"ApparentCurrent",
		"ActivePower",
		"ReactivePower",
		"ApparentPower",
		"RMSVoltage",
		"RMSCurrent",
		"RMSPower",
		"Frequency",
		"HarmonicCurrents",
		"HarmonicPhases",
		"PowerFactor",
		"NeutralCurrent",
		"SupportsDirectCurrent",
		"SupportsAlternatingCurrent",
		"SupportsPolyphasePower",
		"SupportsHarmonics",
		"SupportsPowerQuality",
	] as const,
	commands: [
	] as const,
	events: [
		"MeasurementPeriodRanges",
	] as const
}

export default electricalPowerMeasurement;