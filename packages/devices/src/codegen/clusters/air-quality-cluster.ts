// This file is generated from air-quality-cluster.xml - do not edit it directly
// Generated on 2025-12-03T20:57:09.994Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum AirQualityEnum {
	Unknown= 0,
	Good= 1,
	Fair= 2,
	Moderate= 3,
	Poor= 4,
	VeryPoor= 5,
	ExtremelyPoor= 6,
}

/**
 * Attributes for reporting air quality classification
 */

export interface AirQuality {
id: 91;
	attributes: {
		readonly AirQuality:AirQualityEnum
		/** Cluster supports the Fair air quality level */
		readonly SupportsFair: boolean
		/** Cluster supports the Moderate air quality level */
		readonly SupportsModerate: boolean
		/** Cluster supports the Very poor air quality level */
		readonly SupportsVeryPoor: boolean
		/** Cluster supports the Extremely poor air quality level */
		readonly SupportsExtremelyPoor: boolean
}
	commands: {
}
	events: {
	}
}

export const airQuality: ClusterDefinition<AirQuality> = {
id: 91,
	attributes: [
		"AirQuality",
		"SupportsFair",
		"SupportsModerate",
		"SupportsVeryPoor",
		"SupportsExtremelyPoor",
	] as const,
	commands: [
	] as const,
	events: [
	] as const
}

export default airQuality;