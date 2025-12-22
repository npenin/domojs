// This file is generated from Mode_RVCClean.xml - do not edit it directly
// Generated on 2025-12-22T10:26:07.719Z

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
	DeepClean = 16384,
	Vacuum = 16385,
	Mop = 16386,
	VacuumThenMop = 16387,
}

export enum StatusCodeEnum {
	CleaningInProgress = 64,
}

export interface ModeOptionStruct {
}

export type RVCCleanMode = RVCCleanModeCluster & { id: 0x0055};

export interface RVCCleanModeCluster {
id: 0x0055;
	attributes: {
		/** Dependency with the OnOff cluster */
		readonly SupportsOnOff: boolean
		/** Cluster supports changing clean modes from non-Idle states */
		readonly SupportsDirectModeChange: boolean
}
	commands: {
}
	events: {
	}
}

export const rVCCleanMode: ClusterDefinition<RVCCleanMode> = {
id: 0x0055,
	attributes: [
		"SupportsOnOff",
		"SupportsDirectModeChange",
	] as const,
	commands: [
	] as const,
	events: [
	] as const
}

export default rVCCleanMode;