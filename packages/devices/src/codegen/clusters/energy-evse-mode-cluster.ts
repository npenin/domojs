// This file is generated from energy-evse-mode-cluster.xml - do not edit it directly
// Generated on 2025-08-15T06:41:47.005Z

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
	Manual= 16384,
	TimeOfUse= 16385,
	SolarCharging= 16386,
	V2X= 16387,
}

/**
 * Attributes and commands for selecting a mode from a list of supported options.
 */

export interface EnergyEVSEMode {
id: 157;
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

export const energyEVSEMode: Cluster<EnergyEVSEMode['attributes'], EnergyEVSEMode['commands'], EnergyEVSEMode['events']> = {
id: 157,
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

export default energyEVSEMode;