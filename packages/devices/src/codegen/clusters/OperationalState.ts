// This file is generated from OperationalState.xml - do not edit it directly
// Generated on 2025-12-22T10:26:09.201Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum ErrorStateEnum {
	NoError = 0,
	UnableToStartOrResume = 1,
	UnableToCompleteOperation = 2,
	CommandInvalidInState = 3,
}

export enum OperationalStateEnum {
	Stopped = 0,
	Running = 1,
	Paused = 2,
	Error = 3,
}

export interface ErrorStateStruct {
	ErrorStateID:ErrorStateEnum,
	ErrorStateLabel?:string,
	ErrorStateDetails?:string,
}

export interface OperationalStateStruct {
	OperationalStateID:OperationalStateEnum,
	OperationalStateLabel?:string,
}

export type OperationalState = OperationalStateCluster & { id: 0x0060};

export interface OperationalStateCluster {
id: 0x0060;
	attributes: {
		readonly PhaseList:readonly string[]
		readonly CurrentPhase:number
		readonly CountdownTime?:number
		readonly OperationalStateList:readonly OperationalStateStruct[]
		readonly OperationalState:OperationalStateEnum
		readonly OperationalError:ErrorStateStruct
}
	commands: {
		Pause?: {
			inputparams: readonly [
			],
			 outputparams: readonly [
				CommandResponseState: ErrorStateStruct, ]
            }
		Stop?: {
			inputparams: readonly [
			],
			 outputparams: readonly [
				CommandResponseState: ErrorStateStruct, ]
            }
		Start?: {
			inputparams: readonly [
			],
			 outputparams: readonly [
				CommandResponseState: ErrorStateStruct, ]
            }
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
		OperationCompletion: [
			
			CompletionErrorCode: number, 
			TotalOperationalTime: number, 
			PausedTime: number, ];
	}
}

export const operationalState: ClusterDefinition<OperationalState> = {
id: 0x0060,
	attributes: [
		"PhaseList",
		"CurrentPhase",
		"CountdownTime",
		"OperationalStateList",
		"OperationalState",
		"OperationalError",
	] as const,
	commands: [
		"Pause",
		"Stop",
		"Start",
		"Resume",
	] as const,
	events: [
	] as const
}

export default operationalState;