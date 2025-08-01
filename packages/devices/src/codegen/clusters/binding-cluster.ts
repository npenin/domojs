

export interface TargetStruct {
	Node?: string,
	Group?: number,
	Endpoint?: number,
	Cluster?:import ("./clusters-index.js").ClusterIds,
}

/**
 * The Binding Cluster is meant to replace the support from the Zigbee Device Object (ZDO) for supporting the binding table.
 */

export interface Binding {
id: 30;
	attributes: {
		Binding:readonly TargetStruct[]
}
	commands: {
}
	events: {
	}
}