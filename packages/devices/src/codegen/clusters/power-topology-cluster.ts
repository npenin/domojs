

/**
 * The Power Topology Cluster provides a mechanism for expressing how power is flowing between endpoints.
 */

export interface PowerTopology {
id: 156;
	attributes: {
		readonly AvailableEndpoints?:readonly  number[]
		readonly ActiveEndpoints?:readonly  number[]
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