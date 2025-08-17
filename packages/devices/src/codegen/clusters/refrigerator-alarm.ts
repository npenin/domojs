// This file is generated from refrigerator-alarm.xml - do not edit it directly
// Generated on 2025-08-17T14:20:46.451Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum AlarmBitmap {
	DoorOpen= 0x01,
}

/**
 * Attributes and commands for configuring the Refrigerator alarm.
 */

export interface RefrigeratorAlarm {
id: 87;
	attributes: {
		readonly Mask:AlarmBitmap
		readonly State:AlarmBitmap
		readonly Supported:AlarmBitmap
}
	commands: {
}
	events: {
		Notify: [
			
			Active: AlarmBitmap, 
			Inactive: AlarmBitmap, 
			State: AlarmBitmap, 
			Mask: AlarmBitmap, ];
	}
}

export const refrigeratorAlarm: ClusterDefinition<RefrigeratorAlarm> = {
id: 87,
	attributes: [
		"Mask",
		"State",
		"Supported",
	] as const,
	commands: [
	] as const,
	events: [
		"Notify",
	] as const
}

export default refrigeratorAlarm;