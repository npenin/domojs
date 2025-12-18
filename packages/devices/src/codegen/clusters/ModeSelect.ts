// This file is generated from ModeSelect.xml - do not edit it directly
// Generated on 2025-12-18T03:05:07.522Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export interface ModeOptionStruct {
	Label:string,
	Mode:number,
	SemanticTags:readonly import("./ModeSelect.js").SemanticTagStruct[],
}

export interface SemanticTagStruct {
	MfgCode:number,
	Value:number,
}

export type ModeSelect = ModeSelectCluster & { id: 0x0050};

export interface ModeSelectCluster {
id: 0x0050;
	attributes: {
		readonly Description:string
		readonly StandardNamespace:number
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
			 outputparams: readonly []
            }
}
	events: {
	}
}

export const modeSelect: ClusterDefinition<ModeSelect> = {
id: 0x0050,
	attributes: [
		"Description",
		"StandardNamespace",
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

export default modeSelect;