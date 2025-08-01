

export interface LabelStruct {
	Label: string,
	Value: string,
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