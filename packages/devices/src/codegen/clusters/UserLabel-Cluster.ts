// This file is generated from UserLabel-Cluster.xml - do not edit it directly
// Generated on 2025-12-22T10:26:13.177Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export type UserLabel = UserLabelCluster & { id: 0x0041};

export interface UserLabelCluster {
id: 0x0041;
	attributes: {
		readonly LabelList:readonly import("./Label-Cluster.js").LabelStruct[]
}
	commands: {
}
	events: {
	}
}

export const userLabel: ClusterDefinition<UserLabel> = {
id: 0x0041,
	attributes: [
		"LabelList",
	] as const,
	commands: [
	] as const,
	events: [
	] as const
}

export default userLabel;