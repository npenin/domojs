// This file is generated from fixed-label-cluster.xml - do not edit it directly
// Generated on 2025-08-17T14:20:45.488Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export interface LabelStruct {
	Label:string,
	Value:string,
}

/**
 * The Fixed Label Cluster provides a feature for the device to tag an endpoint with zero or more read only
labels.
 */

export interface FixedLabel {
id: 64;
	attributes: {
		readonly LabelList:readonly LabelStruct[]
}
	commands: {
}
	events: {
	}
}

export const fixedLabel: ClusterDefinition<FixedLabel> = {
id: 64,
	attributes: [
		"LabelList",
	] as const,
	commands: [
	] as const,
	events: [
	] as const
}

export default fixedLabel;