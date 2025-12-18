// This file is generated from ElectricalPowerMeasurement.xml - do not edit it directly
// Generated on 2025-12-18T03:05:02.395Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum MeasurementTypeEnum {
	Unspecified = 0,
	Voltage = 1,
	ActiveCurrent = 2,
	ReactiveCurrent = 3,
	ApparentCurrent = 4,
	ActivePower = 5,
	ReactivePower = 6,
	ApparentPower = 7,
	RMSVoltage = 8,
	RMSCurrent = 9,
	RMSPower = 10,
	Frequency = 11,
	PowerFactor = 12,
	NeutralCurrent = 13,
	ElectricalEnergy = 14,
	ReactiveEnergy = 15,
	ApparentEnergy = 16,
}

export enum PowerModeEnum {
	Unknown = 0,
	DC = 1,
	AC = 2,
}

export interface HarmonicMeasurementStruct {
	Order:number,
	Measurement:bigint,
}

export interface MeasurementAccuracyRangeStruct {
	RangeMin:bigint,
	RangeMax:bigint,
	PercentMax?:number,
	PercentMin?:number,
	PercentTypical?:number,
	FixedMax?:bigint,
	FixedMin?:bigint,
	FixedTypical?:bigint,
}

export interface MeasurementAccuracyStruct {
	MeasurementType:MeasurementTypeEnum,
	Measured:boolean,
	MinMeasuredValue:bigint,
	MaxMeasuredValue:bigint,
	AccuracyRanges:readonly MeasurementAccuracyRangeStruct[],
}

export interface MeasurementRangeStruct {
	MeasurementType:MeasurementTypeEnum,
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

export type ElectricalPowerMeasurement = ElectricalPowerMeasurementCluster & { id: 0x0090};

export interface ElectricalPowerMeasurementCluster {
id: 0x0090;
	attributes: {
		readonly PowerMode:PowerModeEnum
		readonly NumberOfMeasurementTypes:number
		readonly Accuracy:readonly MeasurementAccuracyStruct[]
		readonly Ranges?:readonly MeasurementRangeStruct[]
		readonly Voltage?:number
		readonly ActiveCurrent?:number
		readonly ReactiveCurrent?:number
		readonly ApparentCurrent?:number
		readonly ActivePower:number
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
		MeasurementPeriodRanges: [
			
			Ranges: readonly MeasurementRangeStruct[], ];
	}
}

export const electricalPowerMeasurement: ClusterDefinition<ElectricalPowerMeasurement> = {
id: 0x0090,
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
	] as const
}

export default electricalPowerMeasurement;