// This file is generated from time-format-localization-cluster.xml - do not edit it directly
// Generated on 2025-08-24T09:48:44.097Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum HourFormatEnum {
	__12hr= 0,
	__24hr= 1,
	UseActiveLocale= 255,
}

export enum CalendarTypeEnum {
	Buddhist= 0,
	Chinese= 1,
	Coptic= 2,
	Ethiopian= 3,
	Gregorian= 4,
	Hebrew= 5,
	Indian= 6,
	Islamic= 7,
	Japanese= 8,
	Korean= 9,
	Persian= 10,
	Taiwanese= 11,
	UseActiveLocale= 255,
}

/**
 * Nodes should be expected to be deployed to any and all regions of the world. These global regions
      may have differing preferences for how dates and times are conveyed. As such, Nodes that visually
      or audibly convey time information need a mechanism by which they can be configured to use a
      user’s preferred format.
 */

export interface TimeFormatLocalization {
id: 44;
	attributes: {
		HourFormat:HourFormatEnum
		ActiveCalendarType:CalendarTypeEnum
		readonly SupportedCalendarTypes:readonly CalendarTypeEnum[]
		/** The Node can be configured to use different calendar formats when conveying values to a user. */
		readonly SupportsCalendarFormat: boolean
}
	commands: {
}
	events: {
	}
}

export const timeFormatLocalization: ClusterDefinition<TimeFormatLocalization> = {
id: 44,
	attributes: [
		"HourFormat",
		"ActiveCalendarType",
		"SupportedCalendarTypes",
		"SupportsCalendarFormat",
	] as const,
	commands: [
	] as const,
	events: [
	] as const
}

export default timeFormatLocalization;