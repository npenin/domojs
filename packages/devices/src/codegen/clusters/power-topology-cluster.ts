// This file is generated from power-topology-cluster.xml - do not edit it directly
// Generated on 2025-12-03T20:57:11.939Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export interface CircuitNodeStruct {
	Node:string,
	Endpoint?:number,
	Label?:string,
}

/**
 * The Power Topology Cluster provides a mechanism for expressing how power is flowing between endpoints.
 */

export interface PowerTopology {
id: 156;
	attributes: {
		readonly AvailableEndpoints?:readonly number[]
		readonly ActiveEndpoints?:readonly number[]
		ElectricalCircuitNodes?:readonly CircuitNodeStruct[]
		/** This endpoint provides or consumes power to/from the entire node */
		readonly SupportsNodeTopology: boolean
		/** This endpoint provides or consumes power to/from itself and its child endpoints */
		readonly SupportsTreeTopology: boolean
		/** This endpoint provides or consumes power to/from a specified set of endpoints */
		readonly SupportsSetTopology: boolean
		/** The specified set of endpoints may change */
		readonly SupportsDynamicPowerFlow: boolean
		/** This endpoint provides information about downstream nodes on its circuit */
		readonly SupportsElectricalCircuit: boolean
}
	commands: {
}
	events: {
	}
}

export const powerTopology: ClusterDefinition<PowerTopology> = {
id: 156,
	attributes: [
		"AvailableEndpoints",
		"ActiveEndpoints",
		"ElectricalCircuitNodes",
		"SupportsNodeTopology",
		"SupportsTreeTopology",
		"SupportsSetTopology",
		"SupportsDynamicPowerFlow",
		"SupportsElectricalCircuit",
	] as const,
	commands: [
	] as const,
	events: [
	] as const
}

export default powerTopology;