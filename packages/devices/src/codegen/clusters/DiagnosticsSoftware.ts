// This file is generated from DiagnosticsSoftware.xml - do not edit it directly
// Generated on 2025-12-18T03:05:00.587Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export interface ThreadMetricsStruct {
	ID:bigint,
	Name?:string,
	StackFreeCurrent?:number,
	StackFreeMinimum?:number,
	StackSize?:number,
}

export type SoftwareDiagnostics = SoftwareDiagnosticsCluster & { id: 0x0034};

export interface SoftwareDiagnosticsCluster {
id: 0x0034;
	attributes: {
		readonly ThreadMetrics?:readonly ThreadMetricsStruct[]
		readonly CurrentHeapFree?:bigint
		readonly CurrentHeapUsed?:bigint
		readonly CurrentHeapHighWatermark?:bigint
		/** Node makes available the metrics for high watermark related to memory consumption. */
		readonly SupportsWatermarks: boolean
}
	commands: {
		ResetWatermarks?: {
			inputparams: readonly [
			],
			 outputparams: readonly []
            }
}
	events: {
		SoftwareFault: [
			
			ID: bigint, 
			Name: string, 
			FaultRecording: import ("@akala/core").IsomorphicBuffer, ];
	}
}

export const softwareDiagnostics: ClusterDefinition<SoftwareDiagnostics> = {
id: 0x0034,
	attributes: [
		"ThreadMetrics",
		"CurrentHeapFree",
		"CurrentHeapUsed",
		"CurrentHeapHighWatermark",
		"SupportsWatermarks",
	] as const,
	commands: [
		"ResetWatermarks",
	] as const,
	events: [
	] as const
}

export default softwareDiagnostics;