// This file is generated from PowerTopology.xml - do not edit it directly
// Generated on 2025-12-18T03:05:11.401Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export interface CircuitNodeStruct {
	Node:string,
	Endpoint?:number,
	Label?:string,
}

export type PowerTopology = PowerTopologyCluster & { id: 0x009C};

export interface PowerTopologyCluster {
id: 0x009C;
	attributes: {
		readonly AvailableEndpoints?:readonly number[]
		readonly ActiveEndpoints?:readonly number[]
		/** This endpoint provides or consumes power to/from the entire node */
		readonly SupportsNodeTopology: boolean
		/** This endpoint provides or consumes power to/from itself and its child endpoints */
		readonly SupportsTreeTopology: boolean
		/** This endpoint provides or consumes power to/from a specified set of endpoints */
		readonly SupportsSetTopology: boolean
		/** The specified set of endpoints may change */
		readonly SupportsDynamicPowerFlow: boolean
}
	commands: {
}
	events: {
	}
}

export const powerTopology: ClusterDefinition<PowerTopology> = {
id: 0x009C,
	attributes: [
		"AvailableEndpoints",
		"ActiveEndpoints",
		"SupportsNodeTopology",
		"SupportsTreeTopology",
		"SupportsSetTopology",
		"SupportsDynamicPowerFlow",
	] as const,
	commands: [
	] as const,
	events: [
	] as const
}

export default powerTopology;