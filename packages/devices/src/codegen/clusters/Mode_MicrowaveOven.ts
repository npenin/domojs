// This file is generated from Mode_MicrowaveOven.xml - do not edit it directly
// Generated on 2025-12-18T03:05:08.405Z

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
	Defrost = 16385,
}

export type MicrowaveOvenMode = MicrowaveOvenModeCluster & { id: 0x005E};

export interface MicrowaveOvenModeCluster {
id: 0x005E;
	attributes: {
		/** Dependency with the OnOff cluster */
		readonly SupportsOnOff: boolean
}
	commands: {
}
	events: {
	}
}

export const microwaveOvenMode: ClusterDefinition<MicrowaveOvenMode> = {
id: 0x005E,
	attributes: [
		"SupportsOnOff",
	] as const,
	commands: [
	] as const,
	events: [
	] as const
}

export default microwaveOvenMode;