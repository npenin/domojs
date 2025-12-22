// This file is generated from Mode_RVCRun.xml - do not edit it directly
// Generated on 2025-12-22T10:26:07.863Z

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
	Idle = 16384,
	Cleaning = 16385,
	Mapping = 16386,
}

export enum StatusCodeEnum {
	Stuck = 65,
	DustBinMissing = 66,
	DustBinFull = 67,
	WaterTankEmpty = 68,
	WaterTankMissing = 69,
	WaterTankLidOpen = 70,
	MopCleaningPadMissing = 71,
	BatteryLow = 72,
}

export interface ModeOptionStruct {
}

export type RVCRunMode = RVCRunModeCluster & { id: 0x0054};

export interface RVCRunModeCluster {
id: 0x0054;
	attributes: {
		/** Dependency with the OnOff cluster */
		readonly SupportsOnOff: boolean
		/** Cluster supports changing run modes from non-Idle states */
		readonly SupportsDirectModeChange: boolean
}
	commands: {
}
	events: {
	}
}

export const rVCRunMode: ClusterDefinition<RVCRunMode> = {
id: 0x0054,
	attributes: [
		"SupportsOnOff",
		"SupportsDirectModeChange",
	] as const,
	commands: [
	] as const,
	events: [
	] as const
}

export default rVCRunMode;