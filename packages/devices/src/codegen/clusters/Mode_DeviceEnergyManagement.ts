// This file is generated from Mode_DeviceEnergyManagement.xml - do not edit it directly
// Generated on 2025-12-22T10:19:36.582Z

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
	NoOptimization = 16384,
	DeviceOptimization = 16385,
	LocalOptimization = 16386,
	GridOptimization = 16387,
}

export interface ModeOptionStruct {
}

export type DeviceEnergyManagementMode = DeviceEnergyManagementModeCluster & { id: 0x009F};

export interface DeviceEnergyManagementModeCluster {
id: 0x009F;
	attributes: {
		/** Dependency with the OnOff cluster */
		readonly SupportsOnOff: boolean
}
	commands: {
}
	events: {
	}
}

export const deviceEnergyManagementMode: ClusterDefinition<DeviceEnergyManagementMode> = {
id: 0x009F,
	attributes: [
		"SupportsOnOff",
	] as const,
	commands: [
	] as const,
	events: [
	] as const
}

export default deviceEnergyManagementMode;