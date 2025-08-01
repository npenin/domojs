

/**
 * The User Label Cluster provides a feature to tag an endpoint with zero or more labels.
 */

export interface UserLabel {
id: 65;
	attributes: {
		LabelList?:readonly import("./fixed-label-cluster.js").LabelStruct[]
}
	commands: {
}
	events: {
	}
}