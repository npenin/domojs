// This file is generated from refrigerator-alarm.xml - do not edit it directly
// Generated on 2025-08-15T06:41:48.408Z

import { Cluster } from '../../server/clients/shared.js';


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

export const refrigeratorAlarm: Cluster<RefrigeratorAlarm['attributes'], RefrigeratorAlarm['commands'], RefrigeratorAlarm['events']> = {
id: 87,
	attributes: {
		Mask:null,
		State:null,
		Supported:null,
},
	commands: {
},
	events: {
		Notify: [
			
			null, 
			null, 
			null, 
			null, ],
	}
}

export default refrigeratorAlarm;