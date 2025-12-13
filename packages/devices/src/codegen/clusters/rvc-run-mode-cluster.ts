// This file is generated from rvc-run-mode-cluster.xml - do not edit it directly
// Generated on 2025-12-03T20:57:12.194Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum StatusCode {
	Stuck= 65,
	DustBinMissing= 66,
	DustBinFull= 67,
	WaterTankEmpty= 68,
	WaterTankMissing= 69,
	WaterTankLidOpen= 70,
	MopCleaningPadMissing= 71,
	BatteryLow= 72,
}

export enum ModeTag {
	Auto= 0,
	Quick= 1,
	Quiet= 2,
	LowNoise= 3,
	LowEnergy= 4,
	Vacation= 5,
	Min= 6,
	Max= 7,
	Night= 8,
	Day= 9,
	Idle= 16384,
	Cleaning= 16385,
	Mapping= 16386,
}

/**
 * Attributes and commands for selecting a mode from a list of supported options.
 */

export interface RVCRunMode {
id: 84;
	attributes: {
		readonly SupportedModes:readonly import("./mode-base-cluster.js").ModeOptionStruct[]
		readonly CurrentMode:number
		/** Cluster supports changing run modes from non-Idle states */
		readonly SupportsDirectModeChange: boolean
}
	commands: {
		/** This command is used to change device modes.
        On receipt of this command the device SHALL respond with a ChangeToModeResponse command. */
		ChangeToMode: {
			inputparams: readonly [
				NewMode: number, 
			],
			 outputparams: readonly [
				Status: number, 
				StatusText: string, ]
            }
}
	events: {
	}
}

export const rVCRunMode: ClusterDefinition<RVCRunMode> = {
id: 84,
	attributes: [
		"SupportedModes",
		"CurrentMode",
		"SupportsDirectModeChange",
	] as const,
	commands: [
		"ChangeToMode",
	] as const,
	events: [
	] as const
}

export default rVCRunMode;