// This file is generated from operational-state-oven-cluster.xml - do not edit it directly
// Generated on 2025-08-15T06:41:48.135Z

import { Cluster } from '../../server/clients/shared.js';


export enum OperationalStateEnum {
	Stopped= 0,
	Running= 1,
	Paused= 2,
	Error= 3,
}

export enum ErrorStateEnum {
	NoError= 0,
	UnableToStartOrResume= 1,
	UnableToCompleteOperation= 2,
	CommandInvalidInState= 3,
}

/**
 * This cluster supports remotely monitoring and, where supported, changing the operational state of an Oven.
 */

export interface OvenCavityOperationalState {
id: 72;
	attributes: {
		readonly PhaseList?:readonly string[]
		readonly CurrentPhase?:number
		readonly CountdownTime?:number
		readonly OperationalStateList:readonly import("./operational-state-cluster.js").OperationalStateStruct[]
		readonly OperationalState:OperationalStateEnum
		readonly OperationalError:import("./operational-state-cluster.js").ErrorStateStruct
}
	commands: {
		/** Upon receipt, the device SHALL stop its operation if it is at a position where it is safe to do so and/or permitted. */
		Stop?: {
			inputparams: readonly [
			],
			 outputparams: readonly [
				CommandResponseState: import("./operational-state-cluster.js").ErrorStateStruct, ]
            }
		/** Upon receipt, the device SHALL start its operation if it is safe to do so and the device is in an operational state from which it can be started. */
		Start?: {
			inputparams: readonly [
			],
			 outputparams: readonly [
				CommandResponseState: import("./operational-state-cluster.js").ErrorStateStruct, ]
            }
}
	events: {
		OperationalError: [
			
			ErrorState: import("./operational-state-cluster.js").ErrorStateStruct, ];
		OperationCompletion?: [
			
			CompletionErrorCode: number, 
			TotalOperationalTime: number, 
			PausedTime: number, ];
	}
}

export const ovenCavityOperationalState: Cluster<OvenCavityOperationalState['attributes'], OvenCavityOperationalState['commands'], OvenCavityOperationalState['events']> = {
id: 72,
	attributes: {
		PhaseList:[],
		CurrentPhase:0,
		CountdownTime:0,
		OperationalStateList:[],
		OperationalState:null,
		OperationalError:null,
},
	commands: {
		/** Upon receipt, the device SHALL stop its operation if it is at a position where it is safe to do so and/or permitted. */
		Stop: {
			inputparams: [
			],
			 outputparams: [
				null, ]
            },
		/** Upon receipt, the device SHALL start its operation if it is safe to do so and the device is in an operational state from which it can be started. */
		Start: {
			inputparams: [
			],
			 outputparams: [
				null, ]
            },
},
	events: {
		OperationalError: [
			
			null, ],
		OperationCompletion: [
			
			0, 
			0, 
			0, ],
	}
}

export default ovenCavityOperationalState;