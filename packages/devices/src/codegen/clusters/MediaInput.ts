// This file is generated from MediaInput.xml - do not edit it directly
// Generated on 2025-12-22T10:19:35.204Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum InputTypeEnum {
	Internal = 0,
	Aux = 1,
	Coax = 2,
	Composite = 3,
	HDMI = 4,
	Input = 5,
	Line = 6,
	Optical = 7,
	Video = 8,
	SCART = 9,
	USB = 10,
	Other = 11,
}

export interface InputInfoStruct {
	Index:number,
	InputType:InputTypeEnum,
	Name:string,
	Description:string,
}

export type MediaInput = MediaInputCluster & { id: 0x0507};

export interface MediaInputCluster {
id: 0x0507;
	attributes: {
		readonly InputList:readonly InputInfoStruct[]
		readonly CurrentInput:number
		/** Supports updates to the input names */
		readonly SupportsNameUpdates: boolean
}
	commands: {
		SelectInput: {
			inputparams: readonly [
				Index: number, 
			],
			 outputparams: readonly []
            }
		ShowInputStatus: {
			inputparams: readonly [
			],
			 outputparams: readonly []
            }
		HideInputStatus: {
			inputparams: readonly [
			],
			 outputparams: readonly []
            }
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
id: 0x0507,
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