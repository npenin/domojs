// This file is generated from AudioOutput.xml - do not edit it directly
// Generated on 2025-12-18T03:04:56.100Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum OutputTypeEnum {
	HDMI = 0,
	BT = 1,
	Optical = 2,
	Headphone = 3,
	Internal = 4,
	Other = 5,
}

export interface OutputInfoStruct {
	Index:number,
	OutputType:OutputTypeEnum,
	Name:string,
}

export type AudioOutput = AudioOutputCluster & { id: 0x050B};

export interface AudioOutputCluster {
id: 0x050B;
	attributes: {
		readonly OutputList:readonly OutputInfoStruct[]
		readonly CurrentOutput:number
		/** Supports updates to output names */
		readonly SupportsNameUpdates: boolean
}
	commands: {
		SelectOutput: {
			inputparams: readonly [
				Index: number, 
			],
			 outputparams: readonly []
            }
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
id: 0x050B,
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