// This file is generated from user-label-cluster.xml - do not edit it directly
// Generated on 2025-08-15T06:41:48.997Z

import { Cluster } from '../../server/clients/shared.js';


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

export const userLabel: Cluster<UserLabel['attributes'], UserLabel['commands'], UserLabel['events']> = {
id: 65,
	attributes: {
		LabelList:[],
},
	commands: {
},
	events: {
	}
}

export default userLabel;