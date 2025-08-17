// This file is generated from low-power-cluster.xml - do not edit it directly
// Generated on 2025-08-17T14:20:45.879Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


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