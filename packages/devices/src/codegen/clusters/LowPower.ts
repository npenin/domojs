// This file is generated from LowPower.xml - do not edit it directly
// Generated on 2025-12-22T10:26:05.634Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export type LowPower = LowPowerCluster & { id: 0x0508};

export interface LowPowerCluster {
id: 0x0508;
	attributes: {
}
	commands: {
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
id: 0x0508,
	attributes: [
	] as const,
	commands: [
		"Sleep",
	] as const,
	events: [
	] as const
}

export default lowPower;