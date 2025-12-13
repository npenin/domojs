// This file is generated from laundry-dryer-controls-cluster.xml - do not edit it directly
// Generated on 2025-12-03T20:57:11.402Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum DrynessLevelEnum {
	Low= 0,
	Normal= 1,
	Extra= 2,
	Max= 3,
}

/**
 * This cluster provides a way to access options associated with the operation of
            a laundry dryer device type.
 */

export interface LaundryDryerControls {
id: 74;
	attributes: {
		readonly SupportedDrynessLevels:readonly DrynessLevelEnum[]
		SelectedDrynessLevel?:DrynessLevelEnum
}
	commands: {
}
	events: {
	}
}

export const laundryDryerControls: ClusterDefinition<LaundryDryerControls> = {
id: 74,
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