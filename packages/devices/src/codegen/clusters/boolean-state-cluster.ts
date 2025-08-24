// This file is generated from boolean-state-cluster.xml - do not edit it directly
// Generated on 2025-08-24T09:48:24.029Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


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

export const booleanState: ClusterDefinition<BooleanState> = {
id: 69,
	attributes: [
		"StateValue",
	] as const,
	commands: [
	] as const,
	events: [
		"StateChange",
	] as const
}

export default booleanState;