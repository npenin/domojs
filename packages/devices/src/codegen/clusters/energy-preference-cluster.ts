// This file is generated from energy-preference-cluster.xml - do not edit it directly
// Generated on 2025-08-15T06:41:47.036Z

import { Cluster } from '../../server/clients/shared.js';


export enum EnergyPriorityEnum {
	Comfort= 0,
	Speed= 1,
	Efficiency= 2,
	WaterConsumption= 3,
}

export interface BalanceStruct {
	Step:number,
	Label?:string,
}

/**
 * This cluster provides an interface to specify preferences for how devices should consume energy.
 */

export interface EnergyPreference {
id: 155;
	attributes: {
		readonly EnergyBalances?:readonly BalanceStruct[]
		CurrentEnergyBalance?:number
		readonly EnergyPriorities?:readonly EnergyPriorityEnum[]
		readonly LowPowerModeSensitivities?:readonly BalanceStruct[]
		CurrentLowPowerModeSensitivity?:number
		/** Device can balance energy consumption vs. another priority */
		readonly SupportsEnergyBalance: boolean
		/** Device can adjust the conditions for entering a low power mode */
		readonly SupportsLowPowerModeSensitivity: boolean
}
	commands: {
}
	events: {
	}
}

export const energyPreference: Cluster<EnergyPreference['attributes'], EnergyPreference['commands'], EnergyPreference['events']> = {
id: 155,
	attributes: {
		EnergyBalances:[],
		CurrentEnergyBalance:0,
		EnergyPriorities:[],
		LowPowerModeSensitivities:[],
		CurrentLowPowerModeSensitivity:0,
		/** Device can balance energy consumption vs. another priority */
	SupportsEnergyBalance: false,
		/** Device can adjust the conditions for entering a low power mode */
	SupportsLowPowerModeSensitivity: false,
},
	commands: {
},
	events: {
	}
}

export default energyPreference;