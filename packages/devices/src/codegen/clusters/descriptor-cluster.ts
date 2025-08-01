

export interface DeviceTypeStruct {
	DeviceType: number,
	Revision: number,
}

export interface SemanticTagStruct {
	MfgCode: number,
	NamespaceID: number,
	Tag: number,
	Label?: string,
}

/**
 * The Descriptor Cluster is meant to replace the support from the Zigbee Device Object (ZDO) for describing a node, its endpoints and clusters.
 */

export interface Descriptor {
id: 29;
	attributes: {
		readonly DeviceTypeList:readonly DeviceTypeStruct[]
		readonly ServerList:readonly import ("./clusters-index.js").ClusterIds[]
		readonly ClientList:readonly import ("./clusters-index.js").ClusterIds[]
		readonly PartsList:readonly  number[]
		readonly TagList?:readonly SemanticTagStruct[]
		readonly EndpointUniqueID?: string
		/** The TagList attribute is present */
		readonly SupportsTagList: boolean
}
	commands: {
}
	events: {
	}
}