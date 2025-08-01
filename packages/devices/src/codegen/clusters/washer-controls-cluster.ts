

export enum NumberOfRinsesEnum {
	None= 0,
	Normal= 1,
	Extra= 2,
	Max= 3,
}

/**
 * This cluster supports remotely monitoring and controlling the different types of functionality available to a washing device, such as a washing machine.
 */

export interface LaundryWasherControls {
id: 83;
	attributes: {
		readonly SpinSpeeds?:readonly  string[]
		SpinSpeedCurrent?: number
		NumberOfRinses?:NumberOfRinsesEnum
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