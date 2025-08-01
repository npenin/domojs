

export interface SemanticTagStruct {
	MfgCode: number,
	Value: number,
}

export interface ModeOptionStruct {
	Label: string,
	Mode: number,
	SemanticTags:SemanticTagStruct,
}

/**
 * Attributes and commands for selecting a mode from a list of supported options.
 */

export interface ModeSelect {
id: 80;
	attributes: {
		readonly Description: string
		readonly StandardNamespace?: number
		readonly SupportedModes:readonly ModeOptionStruct[]
		readonly CurrentMode: number
		StartUpMode?: number
		OnMode?: number
		/** Dependency with the OnOff cluster */
		readonly SupportsOnOff: boolean
}
	commands: {
		/** On receipt of this command, if the NewMode field indicates a valid mode transition within the supported list, the server SHALL set the CurrentMode attribute to the NewMode value, otherwise, the server SHALL respond with an INVALID_COMMAND status response. */
		ChangeToMode: {
			inputparams: readonly [
				NewMode:  number, 
			],
			 outputparams: readonly []
            }
}
	events: {
	}
}