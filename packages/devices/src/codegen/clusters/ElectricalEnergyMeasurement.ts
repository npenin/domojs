// This file is generated from ElectricalEnergyMeasurement.xml - do not edit it directly
// Generated on 2025-12-18T03:05:02.040Z

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

export interface CumulativeEnergyResetStruct {
	ImportedResetTimestamp?:number,
	ExportedResetTimestamp?:number,
	ImportedResetSystime?:number,
	ExportedResetSystime?:number,
}

export interface EnergyMeasurementStruct {
	Energy:number,
	StartTimestamp?:number,
	EndTimestamp?:number,
	StartSystime?:number,
	EndSystime?:number,
	ApparentEnergy?:number,
	ReactiveEnergy?:number,
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

export type ElectricalEnergyMeasurement = ElectricalEnergyMeasurementCluster & { id: 0x0091};

export interface ElectricalEnergyMeasurementCluster {
id: 0x0091;
	attributes: {
		readonly Accuracy:MeasurementAccuracyStruct
		readonly CumulativeEnergyImported?:EnergyMeasurementStruct
		readonly CumulativeEnergyExported?:EnergyMeasurementStruct
		readonly PeriodicEnergyImported?:EnergyMeasurementStruct
		readonly PeriodicEnergyExported?:EnergyMeasurementStruct
		readonly CumulativeEnergyReset?:CumulativeEnergyResetStruct
		/** Measurement of energy imported by the server */
		readonly SupportsImportedEnergy: boolean
		/** Measurement of energy provided by the server */
		readonly SupportsExportedEnergy: boolean
		/** Measurements are cumulative */
		readonly SupportsCumulativeEnergy: boolean
		/** Measurements are periodic */
		readonly SupportsPeriodicEnergy: boolean
		/** Measurements report apparent energy */
		readonly SupportsApparentEnergy: boolean
		/** Measurements report reactive energy */
		readonly SupportsReactiveEnergy: boolean
}
	commands: {
}
	events: {
		CumulativeEnergyMeasured: [
			
			EnergyImported: EnergyMeasurementStruct, 
			EnergyExported: EnergyMeasurementStruct, ];
		PeriodicEnergyMeasured: [
			
			EnergyImported: EnergyMeasurementStruct, 
			EnergyExported: EnergyMeasurementStruct, ];
	}
}

export const electricalEnergyMeasurement: ClusterDefinition<ElectricalEnergyMeasurement> = {
id: 0x0091,
	attributes: [
		"Accuracy",
		"CumulativeEnergyImported",
		"CumulativeEnergyExported",
		"PeriodicEnergyImported",
		"PeriodicEnergyExported",
		"CumulativeEnergyReset",
		"SupportsImportedEnergy",
		"SupportsExportedEnergy",
		"SupportsCumulativeEnergy",
		"SupportsPeriodicEnergy",
		"SupportsApparentEnergy",
		"SupportsReactiveEnergy",
	] as const,
	commands: [
	] as const,
	events: [
	] as const
}

export default electricalEnergyMeasurement;