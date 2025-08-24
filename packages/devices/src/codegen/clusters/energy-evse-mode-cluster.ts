// This file is generated from energy-evse-mode-cluster.xml - do not edit it directly
// Generated on 2025-08-24T09:48:30.213Z

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

export const energyEVSEMode: ClusterDefinition<EnergyEVSEMode> = {
id: 157,
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

export default energyEVSEMode;