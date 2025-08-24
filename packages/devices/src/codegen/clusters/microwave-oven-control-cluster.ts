// This file is generated from microwave-oven-control-cluster.xml - do not edit it directly
// Generated on 2025-08-24T09:48:35.886Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


/**
 * Attributes and commands for configuring the microwave oven control, and reporting cooking stats.
 */

export interface MicrowaveOvenControl {
id: 95;
	attributes: {
		readonly CookTime:number
		readonly MaxCookTime:number
		readonly PowerSetting:number
		readonly MinPower:number
		readonly MaxPower:number
		readonly PowerStep:number
		readonly SupportedWatts:readonly number[]
		readonly SelectedWattIndex:number
		readonly WattRating:number
		/** Power is specified as a unitless number or a percentage */
		readonly SupportsPowerAsNumber: boolean
		/** Power is specified in Watts */
		readonly SupportsPowerInWatts: boolean
		/** Supports the limit attributes used with the PWRNUM feature */
		readonly SupportsPowerNumberLimits: boolean
}
	commands: {
		/** This command is used to set the cooking parameters associated with the operation of the device. */
		SetCookingParameters: {
			inputparams: readonly [
				CookMode: number, 
				CookTime: number, 
				PowerSetting: number, 
				WattSettingIndex: number, 
				StartAfterSetting: boolean, 
			],
			 outputparams: readonly []
            }
		/** This command is used to add more time to the CookTime attribute of the server. */
		AddMoreTime: {
			inputparams: readonly [
				TimeToAdd: number, 
			],
			 outputparams: readonly []
            }
}
	events: {
	}
}

export const microwaveOvenControl: ClusterDefinition<MicrowaveOvenControl> = {
id: 95,
	attributes: [
		"CookTime",
		"MaxCookTime",
		"PowerSetting",
		"MinPower",
		"MaxPower",
		"PowerStep",
		"SupportedWatts",
		"SelectedWattIndex",
		"WattRating",
		"SupportsPowerAsNumber",
		"SupportsPowerInWatts",
		"SupportsPowerNumberLimits",
	] as const,
	commands: [
		"SetCookingParameters",
		"AddMoreTime",
	] as const,
	events: [
	] as const
}

export default microwaveOvenControl;