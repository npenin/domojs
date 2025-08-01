

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
	Index: number,
	InputType:InputTypeEnum,
	Name: string,
	Description: string,
}

/**
 * This cluster provides an interface for controlling the Input Selector on a media device such as a TV.
 */

export interface MediaInput {
id: 1287;
	attributes: {
		readonly InputList:readonly InputInfoStruct[]
		readonly CurrentInput: number
		/** Supports updates to the input names */
		readonly SupportsNameUpdates: boolean
}
	commands: {
		/** Upon receipt, this SHALL change the input on the media device to the input at a specific index in the Input List. */
		SelectInput: {
			inputparams: readonly [
				Index:  number, 
			],
			 outputparams: readonly []
            }
		/** Upon receipt, this SHALL display the active status of the input list on screen. */
		ShowInputStatus: {
			inputparams: readonly [
			],
			 outputparams: readonly []
            }
		/** Upon receipt, this SHALL hide the input list from the screen. */
		HideInputStatus: {
			inputparams: readonly [
			],
			 outputparams: readonly []
            }
		/** Upon receipt, this SHALL rename the input at a specific index in the Input List. Updates to the input name SHALL appear in the TV settings menus. */
		RenameInput?: {
			inputparams: readonly [
				Index:  number, 
				Name:  string, 
			],
			 outputparams: readonly []
            }
}
	events: {
	}
}