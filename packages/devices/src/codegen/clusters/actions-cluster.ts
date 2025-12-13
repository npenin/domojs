// This file is generated from actions-cluster.xml - do not edit it directly
// Generated on 2025-12-03T20:57:09.954Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum ActionErrorEnum {
	Unknown= 0,
	Interrupted= 1,
}

export enum ActionStateEnum {
	Inactive= 0,
	Active= 1,
	Paused= 2,
	Disabled= 3,
}

export enum ActionTypeEnum {
	Other= 0,
	Scene= 1,
	Sequence= 2,
	Automation= 3,
	Exception= 4,
	Notification= 5,
	Alarm= 6,
}

export enum EndpointListTypeEnum {
	Other= 0,
	Room= 1,
	Zone= 2,
}

export enum CommandBits {
	InstantAction= 0x0001,
	InstantActionWithTransition= 0x0002,
	StartAction= 0x0004,
	StartActionWithDuration= 0x0008,
	StopAction= 0x0010,
	PauseAction= 0x0020,
	PauseActionWithDuration= 0x0040,
	ResumeAction= 0x0080,
	EnableAction= 0x0100,
	EnableActionWithDuration= 0x0200,
	DisableAction= 0x0400,
	DisableActionWithDuration= 0x0800,
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

/**
 * This cluster provides a standardized way for a Node (typically a Bridge, but could be any Node) to expose action information.
 */

export interface Actions {
id: 37;
	attributes: {
		readonly ActionList:readonly ActionStruct[]
		readonly EndpointLists:readonly EndpointListStruct[]
		readonly SetupURL?:string
}
	commands: {
		/** This command is used to trigger an instantaneous action. */
		InstantAction?: {
			inputparams: readonly [
				ActionID: number, 
				InvokeID: number, 
			],
			 outputparams: readonly []
            }
		/** This command is used to trigger an instantaneous action with a transition over a given time. */
		InstantActionWithTransition?: {
			inputparams: readonly [
				ActionID: number, 
				InvokeID: number, 
				TransitionTime: number, 
			],
			 outputparams: readonly []
            }
		/** This command is used to trigger the commencement of an action. */
		StartAction?: {
			inputparams: readonly [
				ActionID: number, 
				InvokeID: number, 
			],
			 outputparams: readonly []
            }
		/** This command is used to trigger the commencement of an action with a duration. */
		StartActionWithDuration?: {
			inputparams: readonly [
				ActionID: number, 
				InvokeID: number, 
				Duration: number, 
			],
			 outputparams: readonly []
            }
		/** This command is used to stop an action. */
		StopAction?: {
			inputparams: readonly [
				ActionID: number, 
				InvokeID: number, 
			],
			 outputparams: readonly []
            }
		/** This command is used to pause an action. */
		PauseAction?: {
			inputparams: readonly [
				ActionID: number, 
				InvokeID: number, 
			],
			 outputparams: readonly []
            }
		/** This command is used to pause an action with a duration. */
		PauseActionWithDuration?: {
			inputparams: readonly [
				ActionID: number, 
				InvokeID: number, 
				Duration: number, 
			],
			 outputparams: readonly []
            }
		/** This command is used to resume an action. */
		ResumeAction?: {
			inputparams: readonly [
				ActionID: number, 
				InvokeID: number, 
			],
			 outputparams: readonly []
            }
		/** This command is used to enable an action. */
		EnableAction?: {
			inputparams: readonly [
				ActionID: number, 
				InvokeID: number, 
			],
			 outputparams: readonly []
            }
		/** This command is used to enable an action with a duration. */
		EnableActionWithDuration?: {
			inputparams: readonly [
				ActionID: number, 
				InvokeID: number, 
				Duration: number, 
			],
			 outputparams: readonly []
            }
		/** This command is used to disable an action. */
		DisableAction?: {
			inputparams: readonly [
				ActionID: number, 
				InvokeID: number, 
			],
			 outputparams: readonly []
            }
		/** This command is used to disable an action with a duration. */
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
id: 37,
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
		"StateChanged",
		"ActionFailed",
	] as const
}

export default actions;