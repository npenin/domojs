

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