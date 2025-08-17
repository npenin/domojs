// This file is generated from software-diagnostics-cluster.xml - do not edit it directly
// Generated on 2025-08-15T06:41:48.622Z

import { Cluster } from '../../server/clients/shared.js';


export interface ThreadMetricsStruct {
	ID:bigint,
	Name?:string,
	StackFreeCurrent?:number,
	StackFreeMinimum?:number,
	StackSize?:number,
}

/**
 * The Software Diagnostics Cluster provides a means to acquire standardized diagnostics metrics that MAY be used by a Node to assist a user or Administrative Node in diagnosing potential problems.
 */

export interface SoftwareDiagnostics {
id: 52;
	attributes: {
		readonly ThreadMetrics?:readonly ThreadMetricsStruct[]
		readonly CurrentHeapFree?:bigint
		readonly CurrentHeapUsed?:bigint
		readonly CurrentHeapHighWatermark?:bigint
		/** Node makes available the metrics for high watermark related to memory consumption. */
		readonly SupportsWatermarks: boolean
}
	commands: {
		/** This command is used to reset the high watermarks for heap and stack memory. */
		ResetWatermarks?: {
			inputparams: readonly [
			],
			 outputparams: readonly []
            }
}
	events: {
		SoftwareFault?: [
			
			ID: bigint, 
			Name: string, 
			FaultRecording: import ("@akala/core").IsomorphicBuffer, ];
	}
}

export const softwareDiagnostics: Cluster<SoftwareDiagnostics['attributes'], SoftwareDiagnostics['commands'], SoftwareDiagnostics['events']> = {
id: 52,
	attributes: {
		ThreadMetrics:[],
		CurrentHeapFree:null,
		CurrentHeapUsed:null,
		CurrentHeapHighWatermark:null,
		/** Node makes available the metrics for high watermark related to memory consumption. */
	SupportsWatermarks: false,
},
	commands: {
		/** This command is used to reset the high watermarks for heap and stack memory. */
		ResetWatermarks: {
			inputparams: [
			],
			 outputparams: []
            },
},
	events: {
		SoftwareFault: [
			
			null, 
			null, 
			null, ],
	}
}

export default softwareDiagnostics;