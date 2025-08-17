// This file is generated from low-power-cluster.xml - do not edit it directly
// Generated on 2025-08-15T06:41:47.639Z

import { Cluster } from '../../server/clients/shared.js';


/**
 * This cluster provides an interface for managing low power mode on a device.
 */

export interface LowPower {
id: 1288;
	attributes: {
}
	commands: {
		/** This command shall put the device into low power mode. */
		Sleep: {
			inputparams: readonly [
			],
			 outputparams: readonly []
            }
}
	events: {
	}
}

export const lowPower: Cluster<LowPower['attributes'], LowPower['commands'], LowPower['events']> = {
id: 1288,
	attributes: {
},
	commands: {
		/** This command shall put the device into low power mode. */
		Sleep: {
			inputparams: [
			],
			 outputparams: []
            },
},
	events: {
	}
}

export default lowPower;