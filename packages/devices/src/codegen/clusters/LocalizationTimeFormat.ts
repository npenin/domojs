// This file is generated from LocalizationTimeFormat.xml - do not edit it directly
// Generated on 2025-12-22T10:19:34.668Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum CalendarTypeEnum {
	Buddhist = 0,
	Chinese = 1,
	Coptic = 2,
	Ethiopian = 3,
	Gregorian = 4,
	Hebrew = 5,
	Indian = 6,
	Islamic = 7,
	Japanese = 8,
	Korean = 9,
	Persian = 10,
	Taiwanese = 11,
	UseActiveLocale = 255,
}

export enum HourFormatEnum {
	__12hr = 0,
	__24hr = 1,
	UseActiveLocale = 255,
}

export type TimeFormatLocalization = TimeFormatLocalizationCluster & { id: 0x002C};

export interface TimeFormatLocalizationCluster {
id: 0x002C;
	attributes: {
		readonly HourFormat:HourFormatEnum
		readonly ActiveCalendarType?:CalendarTypeEnum
		readonly SupportedCalendarTypes?:readonly CalendarTypeEnum[]
		/** The Node can be configured to use different calendar formats when conveying values to a user. */
		readonly SupportsCalendarFormat: boolean
}
	commands: {
}
	events: {
	}
}

export const timeFormatLocalization: ClusterDefinition<TimeFormatLocalization> = {
id: 0x002C,
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