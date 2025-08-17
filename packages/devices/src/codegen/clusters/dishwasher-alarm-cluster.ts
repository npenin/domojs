// This file is generated from dishwasher-alarm-cluster.xml - do not edit it directly
// Generated on 2025-08-15T06:41:46.794Z

import { Cluster } from '../../server/clients/shared.js';


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

export const dishwasherAlarm: Cluster<DishwasherAlarm['attributes'], DishwasherAlarm['commands'], DishwasherAlarm['events']> = {
id: 93,
	attributes: {
		Mask:null,
		Latch:null,
		State:null,
		Supported:null,
		/** Supports the ability to reset alarms */
	SupportsReset: false,
},
	commands: {
		/** This command resets active and latched alarms (if possible). */
		Reset: {
			inputparams: [
				null, 
			],
			 outputparams: []
            },
		/** This command allows a client to request that an alarm be enabled or suppressed at the server. */
		ModifyEnabledAlarms: {
			inputparams: [
				null, 
			],
			 outputparams: []
            },
},
	events: {
		Notify: [
			
			null, 
			null, 
			null, 
			null, ],
	}
}

export default dishwasherAlarm;