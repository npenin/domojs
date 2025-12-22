// This file is generated from Mode_EVSE.xml - do not edit it directly
// Generated on 2025-12-22T10:26:07.137Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum ModeTag {
	Auto = 0,
	Quick = 1,
	Quiet = 2,
	LowNoise = 3,
	LowEnergy = 4,
	Vacation = 5,
	Min = 6,
	Max = 7,
	Night = 8,
	Day = 9,
	Manual = 16384,
	TimeOfUse = 16385,
	SolarCharging = 16386,
	V2X = 16387,
}

export interface ModeOptionStruct {
}

export type EnergyEVSEMode = EnergyEVSEModeCluster & { id: 0x009D};

export interface EnergyEVSEModeCluster {
id: 0x009D;
	attributes: {
		/** Dependency with the OnOff cluster */
		readonly SupportsOnOff: boolean
}
	commands: {
}
	events: {
	}
}

export const energyEVSEMode: ClusterDefinition<EnergyEVSEMode> = {
id: 0x009D,
	attributes: [
		"SupportsOnOff",
	] as const,
	commands: [
	] as const,
	events: [
	] as const
}

export default energyEVSEMode;