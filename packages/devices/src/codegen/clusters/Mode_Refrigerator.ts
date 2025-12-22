// This file is generated from Mode_Refrigerator.xml - do not edit it directly
// Generated on 2025-12-22T10:19:38.007Z

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
	RapidCool = 16384,
	RapidFreeze = 16385,
}

export interface ModeOptionStruct {
}

export type RefrigeratorAndTemperatureControlledCabinetMode = RefrigeratorAndTemperatureControlledCabinetModeCluster & { id: 0x0052};

export interface RefrigeratorAndTemperatureControlledCabinetModeCluster {
id: 0x0052;
	attributes: {
		/** Dependency with the OnOff cluster */
		readonly SupportsOnOff: boolean
}
	commands: {
}
	events: {
	}
}

export const refrigeratorAndTemperatureControlledCabinetMode: ClusterDefinition<RefrigeratorAndTemperatureControlledCabinetMode> = {
id: 0x0052,
	attributes: [
		"SupportsOnOff",
	] as const,
	commands: [
	] as const,
	events: [
	] as const
}

export default refrigeratorAndTemperatureControlledCabinetMode;