// This file is generated from laundry-dryer-controls-cluster.xml - do not edit it directly
// Generated on 2025-08-15T06:41:47.547Z

import { Cluster } from '../../server/clients/shared.js';


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

export const laundryDryerControls: Cluster<LaundryDryerControls['attributes'], LaundryDryerControls['commands'], LaundryDryerControls['events']> = {
id: 74,
	attributes: {
		SupportedDrynessLevels:[],
		SelectedDrynessLevel:null,
},
	commands: {
},
	events: {
	}
}

export default laundryDryerControls;