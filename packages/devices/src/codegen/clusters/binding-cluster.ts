// This file is generated from binding-cluster.xml - do not edit it directly
// Generated on 2025-08-15T06:41:45.892Z

import { Cluster } from '../../server/clients/shared.js';


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

export const binding: Cluster<Binding['attributes'], Binding['commands'], Binding['events']> = {
id: 30,
	attributes: {
		Binding:[],
},
	commands: {
},
	events: {
	}
}

export default binding;