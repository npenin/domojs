// This file is generated from dishwasher-mode-cluster.xml - do not edit it directly
// Generated on 2025-08-15T06:41:46.820Z

import { Cluster } from '../../server/clients/shared.js';


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
	Heavy= 16385,
	Light= 16386,
}

/**
 * Attributes and commands for selecting a mode from a list of supported options.
 */

export interface DishwasherMode {
id: 89;
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

export const dishwasherMode: Cluster<DishwasherMode['attributes'], DishwasherMode['commands'], DishwasherMode['events']> = {
id: 89,
	attributes: {
		SupportedModes:[],
		CurrentMode:0,
},
	commands: {
		/** This command is used to change device modes.
        On receipt of this command the device SHALL respond with a ChangeToModeResponse command. */
		ChangeToMode: {
			inputparams: [
				0, 
			],
			 outputparams: [
				0, 
				null, ]
            },
},
	events: {
	}
}

export default dishwasherMode;