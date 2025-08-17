// This file is generated from operational-state-cluster.xml - do not edit it directly
// Generated on 2025-08-15T06:41:48.115Z

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

export interface OperationalStateStruct {
	OperationalStateID:number,
	OperationalStateLabel?:string,
}

export interface ErrorStateStruct {
	ErrorStateID:number,
	ErrorStateLabel?:string,
	ErrorStateDetails?:string,
}

/**
 * This cluster supports remotely monitoring and, where supported, changing the operational state of any device where a state machine is a part of the operation.
 */

export interface OperationalState {
id: 96;
	attributes: {
		readonly PhaseList?:readonly string[]
		readonly CurrentPhase?:number
		readonly CountdownTime?:number
		readonly OperationalStateList:readonly OperationalStateStruct[]
		readonly OperationalState:OperationalStateEnum
		readonly OperationalError:ErrorStateStruct
}
	commands: {
		/** Upon receipt, the device SHALL pause its operation if it is possible based on the current function of the server. */
		Pause?: {
			inputparams: readonly [
			],
			 outputparams: readonly [
				CommandResponseState: ErrorStateStruct, ]
            }
		/** Upon receipt, the device SHALL stop its operation if it is at a position where it is safe to do so and/or permitted. */
		Stop?: {
			inputparams: readonly [
			],
			 outputparams: readonly [
				CommandResponseState: ErrorStateStruct, ]
            }
		/** Upon receipt, the device SHALL start its operation if it is safe to do so and the device is in an operational state from which it can be started. */
		Start?: {
			inputparams: readonly [
			],
			 outputparams: readonly [
				CommandResponseState: ErrorStateStruct, ]
            }
		/** Upon receipt, the device SHALL resume its operation from the point it was at when it received the Pause command, or from the point when it was paused by means outside of this cluster (for example by manual button press). */
		Resume?: {
			inputparams: readonly [
			],
			 outputparams: readonly [
				CommandResponseState: ErrorStateStruct, ]
            }
}
	events: {
		OperationalError: [
			
			ErrorState: ErrorStateStruct, ];
		OperationCompletion?: [
			
			CompletionErrorCode: number, 
			TotalOperationalTime: number, 
			PausedTime: number, ];
	}
}

export const operationalState: Cluster<OperationalState['attributes'], OperationalState['commands'], OperationalState['events']> = {
id: 96,
	attributes: {
		PhaseList:[],
		CurrentPhase:0,
		CountdownTime:0,
		OperationalStateList:[],
		OperationalState:null,
		OperationalError:null,
},
	commands: {
		/** Upon receipt, the device SHALL pause its operation if it is possible based on the current function of the server. */
		Pause: {
			inputparams: [
			],
			 outputparams: [
				null, ]
            },
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
		/** Upon receipt, the device SHALL resume its operation from the point it was at when it received the Pause command, or from the point when it was paused by means outside of this cluster (for example by manual button press). */
		Resume: {
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

export default operationalState;