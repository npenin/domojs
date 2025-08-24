// This file is generated from microwave-oven-mode-cluster.xml - do not edit it directly
// Generated on 2025-08-24T09:48:36.071Z

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
	Defrost= 16385,
}

/**
 * Attributes and commands for selecting a mode from a list of supported options.
 */

export interface MicrowaveOvenMode {
id: 94;
	attributes: {
		readonly SupportedModes:readonly import("./mode-base-cluster.js").ModeOptionStruct[]
		readonly CurrentMode:number
}
	commands: {
}
	events: {
	}
}

export const microwaveOvenMode: ClusterDefinition<MicrowaveOvenMode> = {
id: 94,
	attributes: [
		"SupportedModes",
		"CurrentMode",
	] as const,
	commands: [
	] as const,
	events: [
	] as const
}

export default microwaveOvenMode;