// This file is generated from media-input-cluster.xml - do not edit it directly
// Generated on 2025-12-03T20:57:11.571Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum InputTypeEnum {
	Internal= 0,
	Aux= 1,
	Coax= 2,
	Composite= 3,
	HDMI= 4,
	Input= 5,
	Line= 6,
	Optical= 7,
	Video= 8,
	SCART= 9,
	USB= 10,
	Other= 11,
}

export interface InputInfoStruct {
	Index:number,
	InputType:InputTypeEnum,
	Name:string,
	Description:string,
}

/**
 * This cluster provides an interface for controlling the Input Selector on a media device such as a TV.
 */

export interface MediaInput {
id: 1287;
	attributes: {
		readonly InputList:readonly InputInfoStruct[]
		readonly CurrentInput:number
		/** Supports updates to the input names */
		readonly SupportsNameUpdates: boolean
}
	commands: {
		/** Upon receipt, this command SHALL change the media input on the device to the input at a specific index in the Input List. */
		SelectInput: {
			inputparams: readonly [
				Index: number, 
			],
			 outputparams: readonly []
            }
		/** Upon receipt, this command SHALL display the active status of the input list on screen. */
		ShowInputStatus: {
			inputparams: readonly [
			],
			 outputparams: readonly []
            }
		/** Upon receipt, this command SHALL hide the input list from the screen. */
		HideInputStatus: {
			inputparams: readonly [
			],
			 outputparams: readonly []
            }
		/** Upon receipt, this command SHALL rename the input at a specific index in the Input List. */
		RenameInput?: {
			inputparams: readonly [
				Index: number, 
				Name: string, 
			],
			 outputparams: readonly []
            }
}
	events: {
	}
}

export const mediaInput: ClusterDefinition<MediaInput> = {
id: 1287,
	attributes: [
		"InputList",
		"CurrentInput",
		"SupportsNameUpdates",
	] as const,
	commands: [
		"SelectInput",
		"ShowInputStatus",
		"HideInputStatus",
		"RenameInput",
	] as const,
	events: [
	] as const
}

export default mediaInput;