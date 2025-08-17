// This file is generated from unit-localization-cluster.xml - do not edit it directly
// Generated on 2025-08-15T06:41:48.980Z

import { Cluster } from '../../server/clients/shared.js';


export enum TempUnitEnum {
	Fahrenheit= 0,
	Celsius= 1,
	Kelvin= 2,
}

/**
 * Nodes should be expected to be deployed to any and all regions of the world. These global regions
      may have differing preferences for the units in which values are conveyed in communication to a
      user. As such, Nodes that visually or audibly convey measurable values to the user need a
      mechanism by which they can be configured to use a user’s preferred unit.
 */

export interface UnitLocalization {
id: 45;
	attributes: {
		TemperatureUnit:TempUnitEnum
		readonly SupportedTemperatureUnits:readonly TempUnitEnum[]
		/** The Node can be configured to use different units of temperature when conveying values to a user. */
		readonly SupportsTemperatureUnit: boolean
}
	commands: {
}
	events: {
	}
}

export const unitLocalization: Cluster<UnitLocalization['attributes'], UnitLocalization['commands'], UnitLocalization['events']> = {
id: 45,
	attributes: {
		TemperatureUnit:null,
		SupportedTemperatureUnits:[],
		/** The Node can be configured to use different units of temperature when conveying values to a user. */
	SupportsTemperatureUnit: false,
},
	commands: {
},
	events: {
	}
}

export default unitLocalization;