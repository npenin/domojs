// This file is generated from rvc-clean-mode-cluster.xml - do not edit it directly
// Generated on 2025-08-17T14:20:46.536Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum StatusCode {
	CleaningInProgress= 64,
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
	DeepClean= 16384,
	Vacuum= 16385,
	Mop= 16386,
	VacuumThenMop= 16387,
}

/**
 * Attributes and commands for selecting a mode from a list of supported options.
 */

export interface RVCCleanMode {
id: 85;
	attributes: {
		readonly SupportedModes:readonly import("./mode-base-cluster.js").ModeOptionStruct[]
		readonly CurrentMode:number
		/** Cluster supports changing clean modes from non-Idle states */
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

export const rVCCleanMode: ClusterDefinition<RVCCleanMode> = {
id: 85,
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

export default rVCCleanMode;