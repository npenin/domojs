// This file is generated from power-source-configuration-cluster.xml - do not edit it directly
// Generated on 2025-08-17T14:20:46.275Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


/**
 * This cluster is used to describe the configuration and capabilities of a Device's power system.
 */

export interface PowerSourceConfiguration {
id: 46;
	attributes: {
		readonly Sources:readonly number[]
}
	commands: {
}
	events: {
	}
}

export const powerSourceConfiguration: ClusterDefinition<PowerSourceConfiguration> = {
id: 46,
	attributes: [
		"Sources",
	] as const,
	commands: [
	] as const,
	events: [
	] as const
}

export default powerSourceConfiguration;