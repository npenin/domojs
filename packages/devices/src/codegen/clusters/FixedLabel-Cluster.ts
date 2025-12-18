// This file is generated from FixedLabel-Cluster.xml - do not edit it directly
// Generated on 2025-12-18T03:05:03.083Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export type FixedLabel = FixedLabelCluster & { id: 0x0040};

export interface FixedLabelCluster {
id: 0x0040;
	attributes: {
		readonly LabelList:readonly import("./Label-Cluster.js").LabelStruct[]
}
	commands: {
}
	events: {
	}
}

export const fixedLabel: ClusterDefinition<FixedLabel> = {
id: 0x0040,
	attributes: [
		"LabelList",
	] as const,
	commands: [
	] as const,
	events: [
	] as const
}

export default fixedLabel;