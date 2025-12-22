// This file is generated from ModeBase.xml - do not edit it directly
// Generated on 2025-12-22T10:26:06.539Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export interface ModeOptionStruct {
	Label:string,
	Mode:number,
	ModeTags:readonly ModeTagStruct[],
}

export interface ModeTagStruct {
	MfgCode?:number,
	Value:number,
}

export type ModeBase = ModeBaseCluster & { id: undefined};

export interface ModeBaseCluster {
	attributes: {
		readonly SupportedModes:readonly ModeOptionStruct[]
		readonly CurrentMode:number
		readonly StartUpMode?:number
		readonly OnMode?:number
		/** Dependency with the OnOff cluster */
		readonly SupportsOnOff: boolean
}
	commands: {
		ChangeToMode: {
			inputparams: readonly [
				NewMode: number, 
			],
			 outputparams: readonly [
				Status: number, 
				StatusText: string, ]
            }
}
	events: {
	}
}

export const modeBase: ClusterDefinition<ModeBase> = {
id: undefined,
	attributes: [
		"SupportedModes",
		"CurrentMode",
		"StartUpMode",
		"OnMode",
		"SupportsOnOff",
	] as const,
	commands: [
		"ChangeToMode",
	] as const,
	events: [
	] as const
}

export default modeBase;