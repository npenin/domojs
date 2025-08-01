

/**
 * This cluster provides an interface to a boolean state called StateValue.
 */

export interface BooleanState {
id: 69;
	attributes: {
		readonly StateValue:boolean
}
	commands: {
}
	events: {
		StateChange?: [
			
			StateValue: boolean, ];
	}
}