// This file is generated from Binding-Cluster.xml - do not edit it directly
// Generated on 2025-12-22T10:19:25.221Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export interface TargetStruct {
	Node?:string,
	Group?:number,
	Endpoint?:number,
	Cluster?:import ("./clusters-index.js").ClusterIds,
}

export type Binding = BindingCluster & { id: 0x001E};

export interface BindingCluster {
id: 0x001E;
	attributes: {
		readonly Binding:readonly TargetStruct[]
}
	commands: {
}
	events: {
	}
}

export const binding: ClusterDefinition<Binding> = {
id: 0x001E,
	attributes: [
		"Binding",
	] as const,
	commands: [
	] as const,
	events: [
	] as const
}

export default binding;