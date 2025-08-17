// This file is generated from thread-border-router-management-cluster.xml - do not edit it directly
// Generated on 2025-08-15T06:41:48.813Z

import { Cluster } from '../../server/clients/shared.js';


/**
 * Manage the Thread network of Thread Border Router
 */

export interface ThreadBorderRouterManagement {
id: 1106;
	attributes: {
		readonly BorderRouterName:string
		readonly BorderAgentID:import ("@akala/core").IsomorphicBuffer
		readonly ThreadVersion:number
		readonly InterfaceEnabled:boolean
		readonly ActiveDatasetTimestamp?:bigint
		readonly PendingDatasetTimestamp?:bigint
		/** The ability to change PAN configuration with pending dataset setting request. */
		readonly SupportsPANChange: boolean
}
	commands: {
		/** This command SHALL be used to request the active operational dataset of the Thread network to which the border router is connected. */
		GetActiveDatasetRequest: {
			inputparams: readonly [
			],
			 outputparams: readonly [
				Dataset: import ("@akala/core").IsomorphicBuffer, ]
            }
		/** This command SHALL be used to request the pending dataset of the Thread network to which the border router is connected. */
		GetPendingDatasetRequest: {
			inputparams: readonly [
			],
			 outputparams: readonly [
				Dataset: import ("@akala/core").IsomorphicBuffer, ]
            }
		/** This command SHALL be used to set the active Dataset of the Thread network to which the Border Router is connected, when there is no active dataset already. */
		SetActiveDatasetRequest: {
			inputparams: readonly [
				ActiveDataset: import ("@akala/core").IsomorphicBuffer, 
				Breadcrumb: bigint, 
			],
			 outputparams: readonly []
            }
		/** This command SHALL be used to set or update the pending Dataset of the Thread network to which the Border Router is connected, if the Border Router supports PANChange Feature. */
		SetPendingDatasetRequest: {
			inputparams: readonly [
				PendingDataset: import ("@akala/core").IsomorphicBuffer, 
			],
			 outputparams: readonly []
            }
}
	events: {
	}
}

export const threadBorderRouterManagement: Cluster<ThreadBorderRouterManagement['attributes'], ThreadBorderRouterManagement['commands'], ThreadBorderRouterManagement['events']> = {
id: 1106,
	attributes: {
		BorderRouterName:null,
		BorderAgentID:null,
		ThreadVersion:0,
		InterfaceEnabled:null,
		ActiveDatasetTimestamp:null,
		PendingDatasetTimestamp:null,
		/** The ability to change PAN configuration with pending dataset setting request. */
	SupportsPANChange: false,
},
	commands: {
		/** This command SHALL be used to request the active operational dataset of the Thread network to which the border router is connected. */
		GetActiveDatasetRequest: {
			inputparams: [
			],
			 outputparams: [
				null, ]
            },
		/** This command SHALL be used to request the pending dataset of the Thread network to which the border router is connected. */
		GetPendingDatasetRequest: {
			inputparams: [
			],
			 outputparams: [
				null, ]
            },
		/** This command SHALL be used to set the active Dataset of the Thread network to which the Border Router is connected, when there is no active dataset already. */
		SetActiveDatasetRequest: {
			inputparams: [
				null, 
				null, 
			],
			 outputparams: []
            },
		/** This command SHALL be used to set or update the pending Dataset of the Thread network to which the Border Router is connected, if the Border Router supports PANChange Feature. */
		SetPendingDatasetRequest: {
			inputparams: [
				null, 
			],
			 outputparams: []
            },
},
	events: {
	}
}

export default threadBorderRouterManagement;