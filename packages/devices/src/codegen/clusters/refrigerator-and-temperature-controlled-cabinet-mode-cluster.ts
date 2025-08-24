// This file is generated from refrigerator-and-temperature-controlled-cabinet-mode-cluster.xml - do not edit it directly
// Generated on 2025-08-24T09:48:40.025Z

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

export const refrigeratorAndTemperatureControlledCabinetMode: ClusterDefinition<RefrigeratorAndTemperatureControlledCabinetMode> = {
id: 82,
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

export default refrigeratorAndTemperatureControlledCabinetMode;