// This file is generated from refrigerator-and-temperature-controlled-cabinet-mode-cluster.xml - do not edit it directly
// Generated on 2025-08-15T06:41:48.429Z

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
	RapidCool= 16384,
	RapidFreeze= 16385,
}

/**
 * Attributes and commands for selecting a mode from a list of supported options.
 */

export interface RefrigeratorAndTemperatureControlledCabinetMode {
id: 82;
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

export const refrigeratorAndTemperatureControlledCabinetMode: Cluster<RefrigeratorAndTemperatureControlledCabinetMode['attributes'], RefrigeratorAndTemperatureControlledCabinetMode['commands'], RefrigeratorAndTemperatureControlledCabinetMode['events']> = {
id: 82,
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

export default refrigeratorAndTemperatureControlledCabinetMode;