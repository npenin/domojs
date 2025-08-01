

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
		readonly CurrentMode: number
}
	commands: {
}
	events: {
	}
}