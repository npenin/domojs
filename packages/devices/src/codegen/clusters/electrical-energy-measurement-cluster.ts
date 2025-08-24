// This file is generated from electrical-energy-measurement-cluster.xml - do not edit it directly
// Generated on 2025-08-24T09:48:29.510Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


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

/**
 * This cluster provides a mechanism for querying data about the electrical energy imported or provided by the server.
 */

export interface ElectricalEnergyMeasurement {
id: 145;
	attributes: {
		readonly Accuracy:import("./global-structs.js").MeasurementAccuracyStruct
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
		CumulativeEnergyMeasured?: [
			
			EnergyImported: EnergyMeasurementStruct, 
			EnergyExported: EnergyMeasurementStruct, ];
		PeriodicEnergyMeasured?: [
			
			EnergyImported: EnergyMeasurementStruct, 
			EnergyExported: EnergyMeasurementStruct, ];
	}
}

export const electricalEnergyMeasurement: ClusterDefinition<ElectricalEnergyMeasurement> = {
id: 145,
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
		"CumulativeEnergyMeasured",
		"PeriodicEnergyMeasured",
	] as const
}

export default electricalEnergyMeasurement;