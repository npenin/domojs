// This file is generated from Messages.xml - do not edit it directly
// Generated on 2025-12-22T10:26:06.070Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum FutureMessagePreferenceEnum {
	Allowed = 0,
	Increased = 1,
	Reduced = 2,
	Disallowed = 3,
	Banned = 4,
}

export enum MessagePriorityEnum {
	Low = 0,
	Medium = 1,
	High = 2,
	Critical = 3,
}

export enum MessageControlBitmap {
	__NotSet = 0,
		/** Message requires confirmation from user */
	ConfirmationRequired= 1<<0,
		/** Message requires response from user */
	ResponseRequired= 1<<1,
		/** Message supports reply message from user */
	ReplyMessage= 1<<2,
		/** Message has already been confirmed */
	MessageConfirmed= 1<<3,
		/** Message required PIN/password protection */
	MessageProtected= 1<<4,
}

export interface MessageResponseOptionStruct {
	MessageResponseID:number,
	Label:string,
}

export interface MessageStruct {
	MessageID:number,
	Priority:MessagePriorityEnum,
	MessageControl:MessageControlBitmap,
	StartTime:number,
	Duration:bigint,
	MessageText:string,
	Responses?:readonly MessageResponseOptionStruct[],
}

export type Messages = MessagesCluster & { id: 0x0097};

export interface MessagesCluster {
id: 0x0097;
	attributes: {
		readonly Messages:readonly MessageStruct[]
		readonly ActiveMessageIDs:readonly number[]
		readonly SupportsReceivedConfirmation: boolean
		readonly SupportsConfirmationResponse: boolean
		readonly SupportsConfirmationReply: boolean
		readonly SupportsProtectedMessages: boolean
}
	commands: {
		PresentMessagesRequest: {
			inputparams: readonly [
				MessageID: number, 
				Priority: MessagePriorityEnum, 
				MessageControl: MessageControlBitmap, 
				StartTime: number, 
				Duration: bigint, 
				MessageText: string, 
				Responses: readonly MessageResponseOptionStruct[], 
			],
			 outputparams: readonly []
            }
		CancelMessagesRequest: {
			inputparams: readonly [
				MessageIDs: readonly number[], 
			],
			 outputparams: readonly []
            }
}
	events: {
		MessageQueued: [
			
			MessageID: number, ];
		MessagePresented: [
			
			MessageID: number, ];
		MessageComplete: [
			
			MessageID: number, 
			ResponseID: number, 
			Reply: string, 
			FutureMessagesPreference: FutureMessagePreferenceEnum, ];
	}
}

export const messages: ClusterDefinition<Messages> = {
id: 0x0097,
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
	] as const
}

export default messages;