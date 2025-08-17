// This file is generated from boolean-state-cluster.xml - do not edit it directly
// Generated on 2025-08-15T06:41:46.027Z

import { Cluster } from '../../server/clients/shared.js';


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

export const booleanState: Cluster<BooleanState['attributes'], BooleanState['commands'], BooleanState['events']> = {
id: 69,
	attributes: {
		StateValue:null,
},
	commands: {
},
	events: {
		StateChange: [
			
			null, ],
	}
}

export default booleanState;