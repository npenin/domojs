// This file is generated from Mode_Dishwasher.xml - do not edit it directly
// Generated on 2025-12-22T10:19:36.759Z

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
	Heavy = 16385,
	Light = 16386,
}

export interface ModeOptionStruct {
}

export type DishwasherMode = DishwasherModeCluster & { id: 0x0059};

export interface DishwasherModeCluster {
id: 0x0059;
	attributes: {
		/** Dependency with the OnOff cluster */
		readonly SupportsOnOff: boolean
}
	commands: {
}
	events: {
	}
}

export const dishwasherMode: ClusterDefinition<DishwasherMode> = {
id: 0x0059,
	attributes: [
		"SupportsOnOff",
	] as const,
	commands: [
	] as const,
	events: [
	] as const
}

export default dishwasherMode;