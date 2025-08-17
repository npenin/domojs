// This file is generated from power-topology-cluster.xml - do not edit it directly
// Generated on 2025-08-15T06:41:48.238Z

import { Cluster } from '../../server/clients/shared.js';


/**
 * The Power Topology Cluster provides a mechanism for expressing how power is flowing between endpoints.
 */

export interface PowerTopology {
id: 156;
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

export const powerTopology: Cluster<PowerTopology['attributes'], PowerTopology['commands'], PowerTopology['events']> = {
id: 156,
	attributes: {
		AvailableEndpoints:[],
		ActiveEndpoints:[],
		/** This endpoint provides or consumes power to/from the entire node */
	SupportsNodeTopology: false,
		/** This endpoint provides or consumes power to/from itself and its child endpoints */
	SupportsTreeTopology: false,
		/** This endpoint provides or consumes power to/from a specified set of endpoints */
	SupportsSetTopology: false,
		/** The specified set of endpoints may change */
	SupportsDynamicPowerFlow: false,
},
	commands: {
},
	events: {
	}
}

export default powerTopology;