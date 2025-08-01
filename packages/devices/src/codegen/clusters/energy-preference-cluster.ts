

export enum EnergyPriorityEnum {
	Comfort= 0,
	Speed= 1,
	Efficiency= 2,
	WaterConsumption= 3,
}

export interface BalanceStruct {
	Step: number,
	Label?: string,
}

/**
 * This cluster provides an interface to specify preferences for how devices should consume energy.
 */

export interface EnergyPreference {
id: 155;
	attributes: {
		readonly EnergyBalances?:readonly BalanceStruct[]
		CurrentEnergyBalance?: number
		readonly EnergyPriorities?:readonly EnergyPriorityEnum[]
		readonly LowPowerModeSensitivities?:readonly BalanceStruct[]
		CurrentLowPowerModeSensitivity?: number
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