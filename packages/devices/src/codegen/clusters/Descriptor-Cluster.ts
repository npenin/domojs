// This file is generated from Descriptor-Cluster.xml - do not edit it directly
// Generated on 2025-12-22T10:25:59.947Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export interface DeviceTypeStruct {
	DeviceType:number,
	Revision:number,
}

export type Descriptor = DescriptorCluster & { id: 0x001D};

export interface DescriptorCluster {
id: 0x001D;
	attributes: {
		readonly DeviceTypeList:readonly DeviceTypeStruct[]
		readonly ServerList:readonly import ("./clusters-index.js").ClusterIds[]
		readonly ClientList:readonly import ("./clusters-index.js").ClusterIds[]
		readonly PartsList:readonly number[]
		readonly TagList?:readonly import("./ModeSelect.js").SemanticTagStruct[]
		readonly EndpointUniqueID?:string
		/** The TagList attribute is present */
		readonly SupportsTagList: boolean
}
	commands: {
}
	events: {
	}
}

export const descriptor: ClusterDefinition<Descriptor> = {
id: 0x001D,
	attributes: [
		"DeviceTypeList",
		"ServerList",
		"ClientList",
		"PartsList",
		"TagList",
		"EndpointUniqueID",
		"SupportsTagList",
	] as const,
	commands: [
	] as const,
	events: [
	] as const
}

export default descriptor;