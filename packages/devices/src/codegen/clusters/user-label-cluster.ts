// This file is generated from user-label-cluster.xml - do not edit it directly
// Generated on 2025-08-17T14:20:47.067Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


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

export const userLabel: ClusterDefinition<UserLabel> = {
id: 65,
	attributes: [
		"LabelList",
	] as const,
	commands: [
	] as const,
	events: [
	] as const
}

export default userLabel;