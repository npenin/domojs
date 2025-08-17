// This file is generated from oven-mode-cluster.xml - do not edit it directly
// Generated on 2025-08-17T14:20:46.233Z

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
	Bake= 16384,
	Convection= 16385,
	Grill= 16386,
	Roast= 16387,
	Clean= 16388,
	ConvectionBake= 16389,
	ConvectionRoast= 16390,
	Warming= 16391,
	Proofing= 16392,
}

/**
 * Attributes and commands for selecting a mode from a list of supported options.
 */

export interface OvenMode {
id: 73;
	attributes: {
		readonly SupportedModes:readonly import("./mode-base-cluster.js").ModeOptionStruct[]
		readonly CurrentMode:number
		/** Dependency with the OnOff cluster */
		readonly SupportsOnOff: boolean
}
	commands: {
		/** This command is used to change device modes. */
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

export const ovenMode: ClusterDefinition<OvenMode> = {
id: 73,
	attributes: [
		"SupportedModes",
		"CurrentMode",
		"SupportsOnOff",
	] as const,
	commands: [
		"ChangeToMode",
	] as const,
	events: [
	] as const
}

export default ovenMode;