// This file is generated from LaundryWasherControls.xml - do not edit it directly
// Generated on 2025-12-22T10:26:04.888Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum NumberOfRinsesEnum {
	None = 0,
	Normal = 1,
	Extra = 2,
	Max = 3,
}

export type LaundryWasherControls = LaundryWasherControlsCluster & { id: 0x0053};

export interface LaundryWasherControlsCluster {
id: 0x0053;
	attributes: {
		readonly SpinSpeeds?:readonly string[]
		readonly SpinSpeedCurrent?:number
		readonly NumberOfRinses?:NumberOfRinsesEnum
		readonly SupportedRinses?:readonly NumberOfRinsesEnum[]
		/** Multiple spin speeds supported */
		readonly SupportsSpin: boolean
		/** Multiple rinse cycles supported */
		readonly SupportsRinse: boolean
}
	commands: {
}
	events: {
	}
}

export const laundryWasherControls: ClusterDefinition<LaundryWasherControls> = {
id: 0x0053,
	attributes: [
		"SpinSpeeds",
		"SpinSpeedCurrent",
		"NumberOfRinses",
		"SupportedRinses",
		"SupportsSpin",
		"SupportsRinse",
	] as const,
	commands: [
	] as const,
	events: [
	] as const
}

export default laundryWasherControls;