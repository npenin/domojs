// This file is generated from BooleanState.xml - do not edit it directly
// Generated on 2025-12-18T03:04:56.607Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export type BooleanState = BooleanStateCluster & { id: 0x0045};

export interface BooleanStateCluster {
id: 0x0045;
	attributes: {
		readonly StateValue:boolean
}
	commands: {
}
	events: {
		StateChange: [
			
			StateValue: boolean, ];
	}
}

export const booleanState: ClusterDefinition<BooleanState> = {
id: 0x0045,
	attributes: [
		"StateValue",
	] as const,
	commands: [
	] as const,
	events: [
	] as const
}

export default booleanState;