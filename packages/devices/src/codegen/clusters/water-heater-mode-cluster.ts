// This file is generated from water-heater-mode-cluster.xml - do not edit it directly
// Generated on 2025-08-15T06:41:49.098Z

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
	Off= 16384,
	Manual= 16385,
	Timed= 16386,
}

/**
 * Attributes and commands for selecting a mode from a list of supported options.
 */

export interface WaterHeaterMode {
id: 158;
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

export const waterHeaterMode: Cluster<WaterHeaterMode['attributes'], WaterHeaterMode['commands'], WaterHeaterMode['events']> = {
id: 158,
	attributes: {
		SupportedModes:[],
		CurrentMode:0,
		/** Dependency with the OnOff cluster */
	SupportsOnOff: false,
},
	commands: {
		/** This command is used to change device modes. */
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

export default waterHeaterMode;