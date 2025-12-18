// This file is generated from AirQuality.xml - do not edit it directly
// Generated on 2025-12-18T03:04:55.408Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum AirQualityEnum {
	Unknown = 0,
	Good = 1,
	Fair = 2,
	Moderate = 3,
	Poor = 4,
	VeryPoor = 5,
	ExtremelyPoor = 6,
}

export type AirQuality = AirQualityCluster & { id: 0x005B};

export interface AirQualityCluster {
id: 0x005B;
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
id: 0x005B,
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