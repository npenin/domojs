// This file is generated from dishwasher-alarm-cluster.xml - do not edit it directly
// Generated on 2025-08-24T09:48:28.788Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum AlarmBitmap {
	InflowError= 0x01,
	DrainError= 0x02,
	DoorError= 0x04,
	TempTooLow= 0x08,
	TempTooHigh= 0x10,
	WaterLevelError= 0x20,
}

/**
 * Attributes and commands for configuring the Dishwasher alarm.
 */

export interface DishwasherAlarm {
id: 93;
	attributes: {
		readonly Mask:AlarmBitmap
		readonly Latch?:AlarmBitmap
		readonly State:AlarmBitmap
		readonly Supported:AlarmBitmap
		/** Supports the ability to reset alarms */
		readonly SupportsReset: boolean
}
	commands: {
		/** This command resets active and latched alarms (if possible). */
		Reset?: {
			inputparams: readonly [
				Alarms: AlarmBitmap, 
			],
			 outputparams: readonly []
            }
		/** This command allows a client to request that an alarm be enabled or suppressed at the server. */
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

export const dishwasherAlarm: ClusterDefinition<DishwasherAlarm> = {
id: 93,
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
		"Notify",
	] as const
}

export default dishwasherAlarm;