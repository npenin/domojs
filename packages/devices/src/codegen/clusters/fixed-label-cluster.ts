// This file is generated from fixed-label-cluster.xml - do not edit it directly
// Generated on 2025-08-15T06:41:47.151Z

import { Cluster } from '../../server/clients/shared.js';


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

export const fixedLabel: Cluster<FixedLabel['attributes'], FixedLabel['commands'], FixedLabel['events']> = {
id: 64,
	attributes: {
		LabelList:[],
},
	commands: {
},
	events: {
	}
}

export default fixedLabel;