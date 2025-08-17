// This file is generated from washer-controls-cluster.xml - do not edit it directly
// Generated on 2025-08-15T06:41:49.060Z

import { Cluster } from '../../server/clients/shared.js';


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
		readonly SpinSpeeds?:readonly string[]
		SpinSpeedCurrent?:number
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

export const laundryWasherControls: Cluster<LaundryWasherControls['attributes'], LaundryWasherControls['commands'], LaundryWasherControls['events']> = {
id: 83,
	attributes: {
		SpinSpeeds:[],
		SpinSpeedCurrent:0,
		NumberOfRinses:null,
		SupportedRinses:[],
		/** Multiple spin speeds supported */
	SupportsSpin: false,
		/** Multiple rinse cycles supported */
	SupportsRinse: false,
},
	commands: {
},
	events: {
	}
}

export default laundryWasherControls;