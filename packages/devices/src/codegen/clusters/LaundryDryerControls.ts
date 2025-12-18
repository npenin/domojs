// This file is generated from LaundryDryerControls.xml - do not edit it directly
// Generated on 2025-12-18T03:05:05.208Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum DrynessLevelEnum {
	Low = 0,
	Normal = 1,
	Extra = 2,
	Max = 3,
}

export type LaundryDryerControls = LaundryDryerControlsCluster & { id: 0x004A};

export interface LaundryDryerControlsCluster {
id: 0x004A;
	attributes: {
		readonly SupportedDrynessLevels:readonly DrynessLevelEnum[]
		readonly SelectedDrynessLevel:DrynessLevelEnum
}
	commands: {
}
	events: {
	}
}

export const laundryDryerControls: ClusterDefinition<LaundryDryerControls> = {
id: 0x004A,
	attributes: [
		"SupportedDrynessLevels",
		"SelectedDrynessLevel",
	] as const,
	commands: [
	] as const,
	events: [
	] as const
}

export default laundryDryerControls;