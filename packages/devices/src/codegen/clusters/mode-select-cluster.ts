// This file is generated from mode-select-cluster.xml - do not edit it directly
// Generated on 2025-08-15T06:41:47.866Z

import { Cluster } from '../../server/clients/shared.js';


export interface SemanticTagStruct {
	MfgCode:number,
	Value:number,
}

export interface ModeOptionStruct {
	Label:string,
	Mode:number,
	SemanticTags:readonly SemanticTagStruct[],
}

/**
 * Attributes and commands for selecting a mode from a list of supported options.
 */

export interface ModeSelect {
id: 80;
	attributes: {
		readonly Description:string
		readonly StandardNamespace?:number
		readonly SupportedModes:readonly ModeOptionStruct[]
		readonly CurrentMode:number
		StartUpMode?:number
		OnMode?:number
		/** Dependency with the OnOff cluster */
		readonly SupportsOnOff: boolean
}
	commands: {
		/** On receipt of this command, if the NewMode field indicates a valid mode transition within the supported list, the server SHALL set the CurrentMode attribute to the NewMode value, otherwise, the server SHALL respond with an INVALID_COMMAND status response. */
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

export const modeSelect: Cluster<ModeSelect['attributes'], ModeSelect['commands'], ModeSelect['events']> = {
id: 80,
	attributes: {
		Description:null,
		StandardNamespace:0,
		SupportedModes:[],
		CurrentMode:0,
		StartUpMode:0,
		OnMode:0,
		/** Dependency with the OnOff cluster */
	SupportsOnOff: false,
},
	commands: {
		/** On receipt of this command, if the NewMode field indicates a valid mode transition within the supported list, the server SHALL set the CurrentMode attribute to the NewMode value, otherwise, the server SHALL respond with an INVALID_COMMAND status response. */
		ChangeToMode: {
			inputparams: [
				0, 
			],
			 outputparams: []
            },
},
	events: {
	}
}

export default modeSelect;