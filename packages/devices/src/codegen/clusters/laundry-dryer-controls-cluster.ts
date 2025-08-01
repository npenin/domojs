

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