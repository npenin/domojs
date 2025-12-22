// This file is generated from Mode_Oven.xml - do not edit it directly
// Generated on 2025-12-22T10:19:37.493Z

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
	Bake = 16384,
	Convection = 16385,
	Grill = 16386,
	Roast = 16387,
	Clean = 16388,
	ConvectionBake = 16389,
	ConvectionRoast = 16390,
	Warming = 16391,
	Proofing = 16392,
	Steam = 16393,
}

export interface ModeOptionStruct {
}

export type OvenMode = OvenModeCluster & { id: 0x0049};

export interface OvenModeCluster {
id: 0x0049;
	attributes: {
		/** Dependency with the OnOff cluster */
		readonly SupportsOnOff: boolean
}
	commands: {
}
	events: {
	}
}

export const ovenMode: ClusterDefinition<OvenMode> = {
id: 0x0049,
	attributes: [
		"SupportsOnOff",
	] as const,
	commands: [
	] as const,
	events: [
	] as const
}

export default ovenMode;