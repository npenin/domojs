// This file is generated from Label-Cluster.xml - do not edit it directly
// Generated on 2025-12-22T10:26:04.590Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export interface LabelStruct {
	Label:string,
	Value:string,
}

export type Label = LabelCluster & { id: undefined};

export interface LabelCluster {
	attributes: {
		readonly LabelList:readonly LabelStruct[]
}
	commands: {
}
	events: {
	}
}

export const label: ClusterDefinition<Label> = {
id: undefined,
	attributes: [
		"LabelList",
	] as const,
	commands: [
	] as const,
	events: [
	] as const
}

export default label;