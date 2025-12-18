// This file is generated from MicrowaveOvenControl.xml - do not edit it directly
// Generated on 2025-12-18T03:05:07.132Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export type MicrowaveOvenControl = MicrowaveOvenControlCluster & { id: 0x005F};

export interface MicrowaveOvenControlCluster {
id: 0x005F;
	attributes: {
		readonly CookTime:number
		readonly MaxCookTime:number
		readonly PowerSetting?:number
		readonly MinPower?:number
		readonly MaxPower?:number
		readonly PowerStep?:number
		readonly SupportedWatts?:readonly number[]
		readonly SelectedWattIndex?:number
		readonly WattRating?:number
		/** Power is specified as a unitless number or a percentage */
		readonly SupportsPowerAsNumber: boolean
		/** Power is specified in Watts */
		readonly SupportsPowerInWatts: boolean
		/** Supports the limit attributes used with the PWRNUM feature */
		readonly SupportsPowerNumberLimits: boolean
}
	commands: {
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
		AddMoreTime?: {
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
id: 0x005F,
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