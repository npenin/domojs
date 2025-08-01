

/**
 * Manage the Thread network of Thread Border Router
 */

export interface ThreadBorderRouterManagement {
id: 1106;
	attributes: {
		readonly BorderRouterName: string
		readonly BorderAgentID:import ("@akala/core").IsomorphicBuffer
		readonly ThreadVersion: number
		readonly InterfaceEnabled:boolean
		readonly ActiveDatasetTimestamp?: bigint
		readonly PendingDatasetTimestamp?: bigint
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
				Breadcrumb:  bigint, 
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