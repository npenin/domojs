// This file is generated from EnergyPreference.xml - do not edit it directly
// Generated on 2025-12-22T10:26:02.419Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum EnergyPriorityEnum {
	Comfort = 0,
	Speed = 1,
	Efficiency = 2,
	WaterConsumption = 3,
}

export interface BalanceStruct {
	Step:number,
	Label?:string,
}

export type EnergyPreference = EnergyPreferenceCluster & { id: 0x009B};

export interface EnergyPreferenceCluster {
id: 0x009B;
	attributes: {
		readonly EnergyBalances?:readonly BalanceStruct[]
		readonly CurrentEnergyBalance?:number
		readonly EnergyPriorities?:readonly EnergyPriorityEnum[]
		readonly LowPowerModeSensitivities?:readonly BalanceStruct[]
		readonly CurrentLowPowerModeSensitivity?:number
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

export const energyPreference: ClusterDefinition<EnergyPreference> = {
id: 0x009B,
	attributes: [
		"EnergyBalances",
		"CurrentEnergyBalance",
		"EnergyPriorities",
		"LowPowerModeSensitivities",
		"CurrentLowPowerModeSensitivity",
		"SupportsEnergyBalance",
		"SupportsLowPowerModeSensitivity",
	] as const,
	commands: [
	] as const,
	events: [
	] as const
}

export default energyPreference;