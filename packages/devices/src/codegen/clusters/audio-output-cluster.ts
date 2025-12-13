// This file is generated from audio-output-cluster.xml - do not edit it directly
// Generated on 2025-12-03T20:57:10.059Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum OutputTypeEnum {
	HDMI= 0,
	BT= 1,
	Optical= 2,
	Headphone= 3,
	Internal= 4,
	Other= 5,
}

export interface OutputInfoStruct {
	Index:number,
	OutputType:OutputTypeEnum,
	Name:string,
}

/**
 * This cluster provides an interface for controlling the Output on a media device such as a TV.
 */

export interface AudioOutput {
id: 1291;
	attributes: {
		readonly OutputList:readonly OutputInfoStruct[]
		readonly CurrentOutput:number
		/** Supports updates to output names */
		readonly SupportsNameUpdates: boolean
}
	commands: {
		/** Upon receipt, this SHALL change the output on the device to the output at a specific index in the Output List. */
		SelectOutput: {
			inputparams: readonly [
				Index: number, 
			],
			 outputparams: readonly []
            }
		/** Upon receipt, this SHALL rename the output at a specific index in the Output List. */
		RenameOutput?: {
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

export const audioOutput: ClusterDefinition<AudioOutput> = {
id: 1291,
	attributes: [
		"OutputList",
		"CurrentOutput",
		"SupportsNameUpdates",
	] as const,
	commands: [
		"SelectOutput",
		"RenameOutput",
	] as const,
	events: [
	] as const
}

export default audioOutput;