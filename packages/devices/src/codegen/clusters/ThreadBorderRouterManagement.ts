// This file is generated from ThreadBorderRouterManagement.xml - do not edit it directly
// Generated on 2025-12-18T03:05:14.560Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export type ThreadBorderRouterManagement = ThreadBorderRouterManagementCluster & { id: 0x0452};

export interface ThreadBorderRouterManagementCluster {
id: 0x0452;
	attributes: {
		readonly BorderRouterName:string
		readonly BorderAgentID:import ("@akala/core").IsomorphicBuffer
		readonly ThreadVersion:number
		readonly InterfaceEnabled:boolean
		readonly ActiveDatasetTimestamp:bigint
		readonly PendingDatasetTimestamp:bigint
		/** The ability to change PAN configuration with pending dataset setting request. */
		readonly SupportsPANChange: boolean
}
	commands: {
		GetActiveDatasetRequest: {
			inputparams: readonly [
			],
			 outputparams: readonly [
				Dataset: import ("@akala/core").IsomorphicBuffer, ]
            }
		GetPendingDatasetRequest: {
			inputparams: readonly [
			],
			 outputparams: readonly [
				Dataset: import ("@akala/core").IsomorphicBuffer, ]
            }
		SetActiveDatasetRequest: {
			inputparams: readonly [
				ActiveDataset: import ("@akala/core").IsomorphicBuffer, 
				Breadcrumb: bigint, 
			],
			 outputparams: readonly []
            }
		SetPendingDatasetRequest?: {
			inputparams: readonly [
				PendingDataset: import ("@akala/core").IsomorphicBuffer, 
			],
			 outputparams: readonly []
            }
}
	events: {
	}
}

export const threadBorderRouterManagement: ClusterDefinition<ThreadBorderRouterManagement> = {
id: 0x0452,
	attributes: [
		"BorderRouterName",
		"BorderAgentID",
		"ThreadVersion",
		"InterfaceEnabled",
		"ActiveDatasetTimestamp",
		"PendingDatasetTimestamp",
		"SupportsPANChange",
	] as const,
	commands: [
		"GetActiveDatasetRequest",
		"GetPendingDatasetRequest",
		"SetActiveDatasetRequest",
		"SetPendingDatasetRequest",
	] as const,
	events: [
	] as const
}

export default threadBorderRouterManagement;