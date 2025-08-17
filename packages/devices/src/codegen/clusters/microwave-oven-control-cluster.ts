// This file is generated from microwave-oven-control-cluster.xml - do not edit it directly
// Generated on 2025-08-15T06:41:47.807Z

import { Cluster } from '../../server/clients/shared.js';


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

export const microwaveOvenControl: Cluster<MicrowaveOvenControl['attributes'], MicrowaveOvenControl['commands'], MicrowaveOvenControl['events']> = {
id: 95,
	attributes: {
		CookTime:0,
		MaxCookTime:0,
		PowerSetting:0,
		MinPower:0,
		MaxPower:0,
		PowerStep:0,
		SupportedWatts:[],
		SelectedWattIndex:0,
		WattRating:0,
		/** Power is specified as a unitless number or a percentage */
	SupportsPowerAsNumber: false,
		/** Power is specified in Watts */
	SupportsPowerInWatts: false,
		/** Supports the limit attributes used with the PWRNUM feature */
	SupportsPowerNumberLimits: false,
},
	commands: {
		/** This command is used to set the cooking parameters associated with the operation of the device. */
		SetCookingParameters: {
			inputparams: [
				0, 
				0, 
				0, 
				0, 
				null, 
			],
			 outputparams: []
            },
		/** This command is used to add more time to the CookTime attribute of the server. */
		AddMoreTime: {
			inputparams: [
				0, 
			],
			 outputparams: []
            },
},
	events: {
	}
}

export default microwaveOvenControl;