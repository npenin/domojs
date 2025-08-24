// This file is generated from sample-mei-cluster.xml - do not edit it directly
// Generated on 2025-08-24T09:48:40.937Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


/**
 * The Sample MEI cluster showcases a cluster manufacturer extensions
 */

export interface SampleMEI {
id: 4294048800;
	attributes: {
		FlipFlop?:boolean
}
	commands: {
		/** Command that takes two uint8 arguments and returns their sum. */
		AddArguments: {
			inputparams: readonly [
				arg1: number, 
				arg2: number, 
			],
			 outputparams: readonly [
				returnValue: number, ]
            }
		/** Simple command without any parameters and without a response. */
		Ping: {
			inputparams: readonly [
			],
			 outputparams: readonly []
            }
}
	events: {
		PingCountEvent: [
			
			count: number, ];
	}
}

export const sampleMEI: ClusterDefinition<SampleMEI> = {
id: 4294048800,
	attributes: [
		"FlipFlop",
	] as const,
	commands: [
		"AddArguments",
		"Ping",
	] as const,
	events: [
		"PingCountEvent",
	] as const
}

export default sampleMEI;