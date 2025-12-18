// This file is generated from Mode_WaterHeater.xml - do not edit it directly
// Generated on 2025-12-18T03:05:09.289Z

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
	Off = 16384,
	Manual = 16385,
	Timed = 16386,
}

export interface ModeOptionStruct {
}

export type WaterHeaterMode = WaterHeaterModeCluster & { id: 0x009E};

export interface WaterHeaterModeCluster {
id: 0x009E;
	attributes: {
		/** Dependency with the OnOff cluster */
		readonly SupportsOnOff: boolean
}
	commands: {
}
	events: {
	}
}

export const waterHeaterMode: ClusterDefinition<WaterHeaterMode> = {
id: 0x009E,
	attributes: [
		"SupportsOnOff",
	] as const,
	commands: [
	] as const,
	events: [
	] as const
}

export default waterHeaterMode;