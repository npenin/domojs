// This file is generated from power-source-configuration-cluster.xml - do not edit it directly
// Generated on 2025-08-15T06:41:48.219Z

import { Cluster } from '../../server/clients/shared.js';


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

export const powerSourceConfiguration: Cluster<PowerSourceConfiguration['attributes'], PowerSourceConfiguration['commands'], PowerSourceConfiguration['events']> = {
id: 46,
	attributes: {
		Sources:[],
},
	commands: {
},
	events: {
	}
}

export default powerSourceConfiguration;