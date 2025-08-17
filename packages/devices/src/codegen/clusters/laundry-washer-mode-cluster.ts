// This file is generated from laundry-washer-mode-cluster.xml - do not edit it directly
// Generated on 2025-08-17T14:20:45.821Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


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
	Normal= 16384,
	Delicate= 16385,
	Heavy= 16386,
	Whites= 16387,
}

/**
 * Attributes and commands for selecting a mode from a list of supported options.
 */

export interface LaundryWasherMode {
id: 81;
	attributes: {
		readonly SupportedModes:readonly import("./mode-base-cluster.js").ModeOptionStruct[]
		readonly CurrentMode:number
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

export const laundryWasherMode: ClusterDefinition<LaundryWasherMode> = {
id: 81,
	attributes: [
		"SupportedModes",
		"CurrentMode",
	] as const,
	commands: [
		"ChangeToMode",
	] as const,
	events: [
	] as const
}

export default laundryWasherMode;