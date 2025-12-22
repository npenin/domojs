// This file is generated from PowerSourceConfigurationCluster.xml - do not edit it directly
// Generated on 2025-12-22T10:19:40.448Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export type PowerSourceConfiguration = PowerSourceConfigurationCluster & { id: 0x002E};

export interface PowerSourceConfigurationCluster {
id: 0x002E;
	attributes: {
		readonly Sources:readonly number[]
}
	commands: {
}
	events: {
	}
}

export const powerSourceConfiguration: ClusterDefinition<PowerSourceConfiguration> = {
id: 0x002E,
	attributes: [
		"Sources",
	] as const,
	commands: [
	] as const,
	events: [
	] as const
}

export default powerSourceConfiguration;