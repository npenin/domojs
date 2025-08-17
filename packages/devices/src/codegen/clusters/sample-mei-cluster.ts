// This file is generated from sample-mei-cluster.xml - do not edit it directly
// Generated on 2025-08-15T06:41:48.528Z

import { Cluster } from '../../server/clients/shared.js';


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

export const sampleMEI: Cluster<SampleMEI['attributes'], SampleMEI['commands'], SampleMEI['events']> = {
id: 4294048800,
	attributes: {
		FlipFlop:null,
},
	commands: {
		/** Command that takes two uint8 arguments and returns their sum. */
		AddArguments: {
			inputparams: [
				0, 
				0, 
			],
			 outputparams: [
				0, ]
            },
		/** Simple command without any parameters and without a response. */
		Ping: {
			inputparams: [
			],
			 outputparams: []
            },
},
	events: {
		PingCountEvent: [
			
			0, ],
	}
}

export default sampleMEI;