// This file is generated from LocalizationUnit.xml - do not edit it directly
// Generated on 2025-12-18T03:05:06.104Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum TempUnitEnum {
	Fahrenheit = 0,
	Celsius = 1,
	Kelvin = 2,
}

export type UnitLocalization = UnitLocalizationCluster & { id: 0x002D};

export interface UnitLocalizationCluster {
id: 0x002D;
	attributes: {
		readonly TemperatureUnit?:TempUnitEnum
		readonly SupportedTemperatureUnits?:readonly TempUnitEnum[]
		/** The Node can be configured to use different units of temperature when conveying values to a user. */
		readonly SupportsTemperatureUnit: boolean
}
	commands: {
}
	events: {
	}
}

export const unitLocalization: ClusterDefinition<UnitLocalization> = {
id: 0x002D,
	attributes: [
		"TemperatureUnit",
		"SupportedTemperatureUnits",
		"SupportsTemperatureUnit",
	] as const,
	commands: [
	] as const,
	events: [
	] as const
}

export default unitLocalization;