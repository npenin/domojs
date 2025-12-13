// This file is generated from messages-cluster.xml - do not edit it directly
// Generated on 2025-12-03T20:57:11.611Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum FutureMessagePreferenceEnum {
	Allowed= 0,
	Increased= 1,
	Reduced= 2,
	Disallowed= 3,
	Banned= 4,
}

export enum MessagePriorityEnum {
	Low= 0,
	Medium= 1,
	High= 2,
	Critical= 3,
}

export enum MessageControlBitmap {
	ConfirmationRequired= 0x1,
	ResponseRequired= 0x2,
	ReplyMessage= 0x4,
	MessageConfirmed= 0x8,
	MessageProtected= 0x10,
}

export interface MessageStruct {
	MessageID:import ("@akala/core").IsomorphicBuffer,
	Priority:MessagePriorityEnum,
	MessageControl:MessageControlBitmap,
	StartTime:number,
	Duration:bigint,
	MessageText:string,
	Responses?:readonly MessageResponseOptionStruct[],
}

export interface MessageResponseOptionStruct {
	MessageResponseID?:number,
	Label?:string,
}

/**
 * This cluster provides an interface for passing messages to be presented by a device.
 */

export interface Messages {
id: 151;
	attributes: {
		readonly Messages:readonly MessageStruct[]
		readonly ActiveMessageIDs:readonly import ("@akala/core").IsomorphicBuffer[]
		readonly SupportsReceivedConfirmation: boolean
		readonly SupportsConfirmationResponse: boolean
		readonly SupportsConfirmationReply: boolean
		readonly SupportsProtectedMessages: boolean
}
	commands: {
		/** Command for requesting messages be presented */
		PresentMessagesRequest: {
			inputparams: readonly [
				MessageID: import ("@akala/core").IsomorphicBuffer, 
				Priority: MessagePriorityEnum, 
				MessageControl: MessageControlBitmap, 
				StartTime: number, 
				Duration: bigint, 
				MessageText: string, 
				Responses: readonly MessageResponseOptionStruct[], 
			],
			 outputparams: readonly []
            }
		/** Command for cancelling message present requests */
		CancelMessagesRequest: {
			inputparams: readonly [
				MessageIDs: readonly import ("@akala/core").IsomorphicBuffer[], 
			],
			 outputparams: readonly []
            }
}
	events: {
		MessageQueued: [
			
			MessageID: import ("@akala/core").IsomorphicBuffer, ];
		MessagePresented: [
			
			MessageID: import ("@akala/core").IsomorphicBuffer, ];
		MessageComplete: [
			
			MessageID: import ("@akala/core").IsomorphicBuffer, 
			ResponseID: number, 
			Reply: string, 
			FutureMessagesPreference: FutureMessagePreferenceEnum, ];
	}
}

export const messages: ClusterDefinition<Messages> = {
id: 151,
	attributes: [
		"Messages",
		"ActiveMessageIDs",
		"SupportsReceivedConfirmation",
		"SupportsConfirmationResponse",
		"SupportsConfirmationReply",
		"SupportsProtectedMessages",
	] as const,
	commands: [
		"PresentMessagesRequest",
		"CancelMessagesRequest",
	] as const,
	events: [
		"MessageQueued",
		"MessagePresented",
		"MessageComplete",
	] as const
}

export default messages;