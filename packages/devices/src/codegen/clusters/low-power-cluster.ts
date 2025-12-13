// This file is generated from low-power-cluster.xml - do not edit it directly
// Generated on 2025-12-03T20:57:11.478Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


/**
 * This cluster provides an interface for managing low power mode on a device.
 */

export interface LowPower {
id: 1288;
	attributes: {
}
	commands: {
		/** This command SHALL put the device into low power mode. */
		Sleep: {
			inputparams: readonly [
			],
			 outputparams: readonly []
            }
}
	events: {
	}
}

export const lowPower: ClusterDefinition<LowPower> = {
id: 1288,
	attributes: [
	] as const,
	commands: [
		"Sleep",
	] as const,
	events: [
	] as const
}

export default lowPower;