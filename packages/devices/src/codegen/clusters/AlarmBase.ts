// This file is generated from AlarmBase.xml - do not edit it directly
// Generated on 2025-12-22T10:25:55.747Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum AlarmBitmap {
	__NotSet = 0,
}

export type AlarmBase = AlarmBaseCluster & { id: undefined};

export interface AlarmBaseCluster {
	attributes: {
		readonly Mask:AlarmBitmap
		readonly Latch?:AlarmBitmap
		readonly State:AlarmBitmap
		readonly Supported:AlarmBitmap
		/** Supports the ability to reset alarms */
		readonly SupportsReset: boolean
}
	commands: {
		Reset?: {
			inputparams: readonly [
				Alarms: AlarmBitmap, 
			],
			 outputparams: readonly []
            }
		ModifyEnabledAlarms?: {
			inputparams: readonly [
				Mask: AlarmBitmap, 
			],
			 outputparams: readonly []
            }
}
	events: {
		Notify: [
			
			Active: AlarmBitmap, 
			Inactive: AlarmBitmap, 
			State: AlarmBitmap, 
			Mask: AlarmBitmap, ];
	}
}

export const alarmBase: ClusterDefinition<AlarmBase> = {
id: undefined,
	attributes: [
		"Mask",
		"Latch",
		"State",
		"Supported",
		"SupportsReset",
	] as const,
	commands: [
		"Reset",
		"ModifyEnabledAlarms",
	] as const,
	events: [
	] as const
}

export default alarmBase;