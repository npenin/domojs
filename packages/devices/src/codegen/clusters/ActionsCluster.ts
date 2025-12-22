// This file is generated from ActionsCluster.xml - do not edit it directly
// Generated on 2025-12-22T10:19:23.799Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum ActionErrorEnum {
	Unknown = 0,
	Interrupted = 1,
}

export enum ActionStateEnum {
	Inactive = 0,
	Active = 1,
	Paused = 2,
	Disabled = 3,
}

export enum ActionTypeEnum {
	Other = 0,
	Scene = 1,
	Sequence = 2,
	Automation = 3,
	Exception = 4,
	Notification = 5,
	Alarm = 6,
}

export enum EndpointListTypeEnum {
	Other = 0,
	Room = 1,
	Zone = 2,
}

export enum CommandBits {
	__NotSet = 0,
		/** Indicate support for InstantAction command */
	InstantAction= 1<<0,
		/** Indicate support for InstantActionWithTransition command */
	InstantActionWithTransition= 1<<1,
		/** Indicate support for StartAction command */
	StartAction= 1<<2,
		/** Indicate support for StartActionWithDuration command */
	StartActionWithDuration= 1<<3,
		/** Indicate support for StopAction command */
	StopAction= 1<<4,
		/** Indicate support for PauseAction command */
	PauseAction= 1<<5,
		/** Indicate support for PauseActionWithDuration command */
	PauseActionWithDuration= 1<<6,
		/** Indicate support for ResumeAction command */
	ResumeAction= 1<<7,
		/** Indicate support for EnableAction command */
	EnableAction= 1<<8,
		/** Indicate support for EnableActionWithDuration command */
	EnableActionWithDuration= 1<<9,
		/** Indicate support for DisableAction command */
	DisableAction= 1<<10,
		/** Indicate support for DisableActionWithDuration command */
	DisableActionWithDuration= 1<<11,
}

export interface ActionStruct {
	ActionID:number,
	Name:string,
	Type:ActionTypeEnum,
	EndpointListID:number,
	SupportedCommands:CommandBits,
	State:ActionStateEnum,
}

export interface EndpointListStruct {
	EndpointListID:number,
	Name:string,
	Type:EndpointListTypeEnum,
	Endpoints:readonly number[],
}

export type Actions = ActionsCluster & { id: 0x0025};

export interface ActionsCluster {
id: 0x0025;
	attributes: {
		readonly ActionList:readonly ActionStruct[]
		readonly EndpointLists:readonly EndpointListStruct[]
		readonly SetupURL?:string
}
	commands: {
		InstantAction?: {
			inputparams: readonly [
				ActionID: number, 
				InvokeID: number, 
			],
			 outputparams: readonly []
            }
		InstantActionWithTransition?: {
			inputparams: readonly [
				ActionID: number, 
				InvokeID: number, 
				TransitionTime: number, 
			],
			 outputparams: readonly []
            }
		StartAction?: {
			inputparams: readonly [
				ActionID: number, 
				InvokeID: number, 
			],
			 outputparams: readonly []
            }
		StartActionWithDuration?: {
			inputparams: readonly [
				ActionID: number, 
				InvokeID: number, 
				Duration: number, 
			],
			 outputparams: readonly []
            }
		StopAction?: {
			inputparams: readonly [
				ActionID: number, 
				InvokeID: number, 
			],
			 outputparams: readonly []
            }
		PauseAction?: {
			inputparams: readonly [
				ActionID: number, 
				InvokeID: number, 
			],
			 outputparams: readonly []
            }
		PauseActionWithDuration?: {
			inputparams: readonly [
				ActionID: number, 
				InvokeID: number, 
				Duration: number, 
			],
			 outputparams: readonly []
            }
		ResumeAction?: {
			inputparams: readonly [
				ActionID: number, 
				InvokeID: number, 
			],
			 outputparams: readonly []
            }
		EnableAction?: {
			inputparams: readonly [
				ActionID: number, 
				InvokeID: number, 
			],
			 outputparams: readonly []
            }
		EnableActionWithDuration?: {
			inputparams: readonly [
				ActionID: number, 
				InvokeID: number, 
				Duration: number, 
			],
			 outputparams: readonly []
            }
		DisableAction?: {
			inputparams: readonly [
				ActionID: number, 
				InvokeID: number, 
			],
			 outputparams: readonly []
            }
		DisableActionWithDuration?: {
			inputparams: readonly [
				ActionID: number, 
				InvokeID: number, 
				Duration: number, 
			],
			 outputparams: readonly []
            }
}
	events: {
		StateChanged: [
			
			ActionID: number, 
			InvokeID: number, 
			NewState: ActionStateEnum, ];
		ActionFailed: [
			
			ActionID: number, 
			InvokeID: number, 
			NewState: ActionStateEnum, 
			Error: ActionErrorEnum, ];
	}
}

export const actions: ClusterDefinition<Actions> = {
id: 0x0025,
	attributes: [
		"ActionList",
		"EndpointLists",
		"SetupURL",
	] as const,
	commands: [
		"InstantAction",
		"InstantActionWithTransition",
		"StartAction",
		"StartActionWithDuration",
		"StopAction",
		"PauseAction",
		"PauseActionWithDuration",
		"ResumeAction",
		"EnableAction",
		"EnableActionWithDuration",
		"DisableAction",
		"DisableActionWithDuration",
	] as const,
	events: [
	] as const
}

export default actions;