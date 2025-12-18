// This file is generated from Mode_LaundryWasher.xml - do not edit it directly
// Generated on 2025-12-18T03:05:08.232Z

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
	Normal = 16384,
	Delicate = 16385,
	Heavy = 16386,
	Whites = 16387,
}

export interface ModeOptionStruct {
}

export type LaundryWasherMode = LaundryWasherModeCluster & { id: 0x0051};

export interface LaundryWasherModeCluster {
id: 0x0051;
	attributes: {
		/** Dependency with the OnOff cluster */
		readonly SupportsOnOff: boolean
}
	commands: {
}
	events: {
	}
}

export const laundryWasherMode: ClusterDefinition<LaundryWasherMode> = {
id: 0x0051,
	attributes: [
		"SupportsOnOff",
	] as const,
	commands: [
	] as const,
	events: [
	] as const
}

export default laundryWasherMode;