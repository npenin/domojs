// This file is generated from binding-cluster.xml - do not edit it directly
// Generated on 2025-08-17T14:20:44.722Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export interface TargetStruct {
	Node?:string,
	Group?:number,
	Endpoint?:number,
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

export const binding: ClusterDefinition<Binding> = {
id: 30,
	attributes: [
		"Binding",
	] as const,
	commands: [
	] as const,
	events: [
	] as const
}

export default binding;