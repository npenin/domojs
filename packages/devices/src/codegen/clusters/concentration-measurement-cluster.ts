// This file is generated from concentration-measurement-cluster.xml - do not edit it directly
// Generated on 2025-08-15T06:41:46.404Z

import { Cluster } from '../../server/clients/shared.js';


export enum LevelValueEnum {
	Unknown= 0,
	Low= 1,
	Medium= 2,
	High= 3,
	Critical= 4,
}

export enum MeasurementUnitEnum {
	PPM= 0,
	PPB= 1,
	PPT= 2,
	MGM3= 3,
	UGM3= 4,
	NGM3= 5,
	PM3= 6,
	BQM3= 7,
}

export enum MeasurementMediumEnum {
	Air= 0,
	Water= 1,
	Soil= 2,
}

/**
 * Attributes for reporting carbon monoxide concentration measurements
 */

export interface CarbonMonoxideConcentrationMeasurement {
id: 1036;
	attributes: {
		readonly MeasuredValue?:number
		readonly MinMeasuredValue?:number
		readonly MaxMeasuredValue?:number
		readonly PeakMeasuredValue?:number
		readonly PeakMeasuredValueWindow?:number
		readonly AverageMeasuredValue?:number
		readonly AverageMeasuredValueWindow?:number
		readonly Uncertainty?:number
		readonly MeasurementUnit?:MeasurementUnitEnum
		readonly MeasurementMedium:MeasurementMediumEnum
		readonly LevelValue?:LevelValueEnum
		/** Cluster supports numeric measurement of substance */
		readonly SupportsNumericMeasurement: boolean
		/** Cluster supports basic level indication for substance using the ConcentrationLevel enum */
		readonly SupportsLevelIndication: boolean
		/** Cluster supports the Medium Concentration Level */
		readonly SupportsMediumLevel: boolean
		/** Cluster supports the Critical Concentration Level */
		readonly SupportsCriticalLevel: boolean
		/** Cluster supports peak numeric measurement of substance */
		readonly SupportsPeakMeasurement: boolean
		/** Cluster supports average numeric measurement of substance */
		readonly SupportsAverageMeasurement: boolean
}
	commands: {
}
	events: {
	}
}

export const carbonMonoxideConcentrationMeasurement: Cluster<CarbonMonoxideConcentrationMeasurement['attributes'], CarbonMonoxideConcentrationMeasurement['commands'], CarbonMonoxideConcentrationMeasurement['events']> = {
id: 1036,
	attributes: {
		MeasuredValue:0,
		MinMeasuredValue:0,
		MaxMeasuredValue:0,
		PeakMeasuredValue:0,
		PeakMeasuredValueWindow:0,
		AverageMeasuredValue:0,
		AverageMeasuredValueWindow:0,
		Uncertainty:0,
		MeasurementUnit:null,
		MeasurementMedium:null,
		LevelValue:null,
		/** Cluster supports numeric measurement of substance */
	SupportsNumericMeasurement: false,
		/** Cluster supports basic level indication for substance using the ConcentrationLevel enum */
	SupportsLevelIndication: false,
		/** Cluster supports the Medium Concentration Level */
	SupportsMediumLevel: false,
		/** Cluster supports the Critical Concentration Level */
	SupportsCriticalLevel: false,
		/** Cluster supports peak numeric measurement of substance */
	SupportsPeakMeasurement: false,
		/** Cluster supports average numeric measurement of substance */
	SupportsAverageMeasurement: false,
},
	commands: {
},
	events: {
	}
}

/**
 * Attributes for reporting carbon dioxide concentration measurements
 */

export interface CarbonDioxideConcentrationMeasurement {
id: 1037;
	attributes: {
		readonly MeasuredValue?:number
		readonly MinMeasuredValue?:number
		readonly MaxMeasuredValue?:number
		readonly PeakMeasuredValue?:number
		readonly PeakMeasuredValueWindow?:number
		readonly AverageMeasuredValue?:number
		readonly AverageMeasuredValueWindow?:number
		readonly Uncertainty?:number
		readonly MeasurementUnit?:MeasurementUnitEnum
		readonly MeasurementMedium:MeasurementMediumEnum
		readonly LevelValue?:LevelValueEnum
		/** Cluster supports numeric measurement of substance */
		readonly SupportsNumericMeasurement: boolean
		/** Cluster supports basic level indication for substance using the ConcentrationLevel enum */
		readonly SupportsLevelIndication: boolean
		/** Cluster supports the Medium Concentration Level */
		readonly SupportsMediumLevel: boolean
		/** Cluster supports the Critical Concentration Level */
		readonly SupportsCriticalLevel: boolean
		/** Cluster supports peak numeric measurement of substance */
		readonly SupportsPeakMeasurement: boolean
		/** Cluster supports average numeric measurement of substance */
		readonly SupportsAverageMeasurement: boolean
}
	commands: {
}
	events: {
	}
}

export const carbonDioxideConcentrationMeasurement: Cluster<CarbonDioxideConcentrationMeasurement['attributes'], CarbonDioxideConcentrationMeasurement['commands'], CarbonDioxideConcentrationMeasurement['events']> = {
id: 1037,
	attributes: {
		MeasuredValue:0,
		MinMeasuredValue:0,
		MaxMeasuredValue:0,
		PeakMeasuredValue:0,
		PeakMeasuredValueWindow:0,
		AverageMeasuredValue:0,
		AverageMeasuredValueWindow:0,
		Uncertainty:0,
		MeasurementUnit:null,
		MeasurementMedium:null,
		LevelValue:null,
		/** Cluster supports numeric measurement of substance */
	SupportsNumericMeasurement: false,
		/** Cluster supports basic level indication for substance using the ConcentrationLevel enum */
	SupportsLevelIndication: false,
		/** Cluster supports the Medium Concentration Level */
	SupportsMediumLevel: false,
		/** Cluster supports the Critical Concentration Level */
	SupportsCriticalLevel: false,
		/** Cluster supports peak numeric measurement of substance */
	SupportsPeakMeasurement: false,
		/** Cluster supports average numeric measurement of substance */
	SupportsAverageMeasurement: false,
},
	commands: {
},
	events: {
	}
}

/**
 * Attributes for reporting nitrogen dioxide concentration measurements
 */

export interface NitrogenDioxideConcentrationMeasurement {
id: 1043;
	attributes: {
		readonly MeasuredValue?:number
		readonly MinMeasuredValue?:number
		readonly MaxMeasuredValue?:number
		readonly PeakMeasuredValue?:number
		readonly PeakMeasuredValueWindow?:number
		readonly AverageMeasuredValue?:number
		readonly AverageMeasuredValueWindow?:number
		readonly Uncertainty?:number
		readonly MeasurementUnit?:MeasurementUnitEnum
		readonly MeasurementMedium:MeasurementMediumEnum
		readonly LevelValue?:LevelValueEnum
		/** Cluster supports numeric measurement of substance */
		readonly SupportsNumericMeasurement: boolean
		/** Cluster supports basic level indication for substance using the ConcentrationLevel enum */
		readonly SupportsLevelIndication: boolean
		/** Cluster supports the Medium Concentration Level */
		readonly SupportsMediumLevel: boolean
		/** Cluster supports the Critical Concentration Level */
		readonly SupportsCriticalLevel: boolean
		/** Cluster supports peak numeric measurement of substance */
		readonly SupportsPeakMeasurement: boolean
		/** Cluster supports average numeric measurement of substance */
		readonly SupportsAverageMeasurement: boolean
}
	commands: {
}
	events: {
	}
}

export const nitrogenDioxideConcentrationMeasurement: Cluster<NitrogenDioxideConcentrationMeasurement['attributes'], NitrogenDioxideConcentrationMeasurement['commands'], NitrogenDioxideConcentrationMeasurement['events']> = {
id: 1043,
	attributes: {
		MeasuredValue:0,
		MinMeasuredValue:0,
		MaxMeasuredValue:0,
		PeakMeasuredValue:0,
		PeakMeasuredValueWindow:0,
		AverageMeasuredValue:0,
		AverageMeasuredValueWindow:0,
		Uncertainty:0,
		MeasurementUnit:null,
		MeasurementMedium:null,
		LevelValue:null,
		/** Cluster supports numeric measurement of substance */
	SupportsNumericMeasurement: false,
		/** Cluster supports basic level indication for substance using the ConcentrationLevel enum */
	SupportsLevelIndication: false,
		/** Cluster supports the Medium Concentration Level */
	SupportsMediumLevel: false,
		/** Cluster supports the Critical Concentration Level */
	SupportsCriticalLevel: false,
		/** Cluster supports peak numeric measurement of substance */
	SupportsPeakMeasurement: false,
		/** Cluster supports average numeric measurement of substance */
	SupportsAverageMeasurement: false,
},
	commands: {
},
	events: {
	}
}

/**
 * Attributes for reporting ozone concentration measurements
 */

export interface OzoneConcentrationMeasurement {
id: 1045;
	attributes: {
		readonly MeasuredValue?:number
		readonly MinMeasuredValue?:number
		readonly MaxMeasuredValue?:number
		readonly PeakMeasuredValue?:number
		readonly PeakMeasuredValueWindow?:number
		readonly AverageMeasuredValue?:number
		readonly AverageMeasuredValueWindow?:number
		readonly Uncertainty?:number
		readonly MeasurementUnit?:MeasurementUnitEnum
		readonly MeasurementMedium:MeasurementMediumEnum
		readonly LevelValue?:LevelValueEnum
		/** Cluster supports numeric measurement of substance */
		readonly SupportsNumericMeasurement: boolean
		/** Cluster supports basic level indication for substance using the ConcentrationLevel enum */
		readonly SupportsLevelIndication: boolean
		/** Cluster supports the Medium Concentration Level */
		readonly SupportsMediumLevel: boolean
		/** Cluster supports the Critical Concentration Level */
		readonly SupportsCriticalLevel: boolean
		/** Cluster supports peak numeric measurement of substance */
		readonly SupportsPeakMeasurement: boolean
		/** Cluster supports average numeric measurement of substance */
		readonly SupportsAverageMeasurement: boolean
}
	commands: {
}
	events: {
	}
}

export const ozoneConcentrationMeasurement: Cluster<OzoneConcentrationMeasurement['attributes'], OzoneConcentrationMeasurement['commands'], OzoneConcentrationMeasurement['events']> = {
id: 1045,
	attributes: {
		MeasuredValue:0,
		MinMeasuredValue:0,
		MaxMeasuredValue:0,
		PeakMeasuredValue:0,
		PeakMeasuredValueWindow:0,
		AverageMeasuredValue:0,
		AverageMeasuredValueWindow:0,
		Uncertainty:0,
		MeasurementUnit:null,
		MeasurementMedium:null,
		LevelValue:null,
		/** Cluster supports numeric measurement of substance */
	SupportsNumericMeasurement: false,
		/** Cluster supports basic level indication for substance using the ConcentrationLevel enum */
	SupportsLevelIndication: false,
		/** Cluster supports the Medium Concentration Level */
	SupportsMediumLevel: false,
		/** Cluster supports the Critical Concentration Level */
	SupportsCriticalLevel: false,
		/** Cluster supports peak numeric measurement of substance */
	SupportsPeakMeasurement: false,
		/** Cluster supports average numeric measurement of substance */
	SupportsAverageMeasurement: false,
},
	commands: {
},
	events: {
	}
}

/**
 * Attributes for reporting PM2.5 concentration measurements
 */

export interface PM2_5ConcentrationMeasurement {
id: 1066;
	attributes: {
		readonly MeasuredValue?:number
		readonly MinMeasuredValue?:number
		readonly MaxMeasuredValue?:number
		readonly PeakMeasuredValue?:number
		readonly PeakMeasuredValueWindow?:number
		readonly AverageMeasuredValue?:number
		readonly AverageMeasuredValueWindow?:number
		readonly Uncertainty?:number
		readonly MeasurementUnit?:MeasurementUnitEnum
		readonly MeasurementMedium:MeasurementMediumEnum
		readonly LevelValue?:LevelValueEnum
		/** Cluster supports numeric measurement of substance */
		readonly SupportsNumericMeasurement: boolean
		/** Cluster supports basic level indication for substance using the ConcentrationLevel enum */
		readonly SupportsLevelIndication: boolean
		/** Cluster supports the Medium Concentration Level */
		readonly SupportsMediumLevel: boolean
		/** Cluster supports the Critical Concentration Level */
		readonly SupportsCriticalLevel: boolean
		/** Cluster supports peak numeric measurement of substance */
		readonly SupportsPeakMeasurement: boolean
		/** Cluster supports average numeric measurement of substance */
		readonly SupportsAverageMeasurement: boolean
}
	commands: {
}
	events: {
	}
}

export const pM2_5ConcentrationMeasurement: Cluster<PM2_5ConcentrationMeasurement['attributes'], PM2_5ConcentrationMeasurement['commands'], PM2_5ConcentrationMeasurement['events']> = {
id: 1066,
	attributes: {
		MeasuredValue:0,
		MinMeasuredValue:0,
		MaxMeasuredValue:0,
		PeakMeasuredValue:0,
		PeakMeasuredValueWindow:0,
		AverageMeasuredValue:0,
		AverageMeasuredValueWindow:0,
		Uncertainty:0,
		MeasurementUnit:null,
		MeasurementMedium:null,
		LevelValue:null,
		/** Cluster supports numeric measurement of substance */
	SupportsNumericMeasurement: false,
		/** Cluster supports basic level indication for substance using the ConcentrationLevel enum */
	SupportsLevelIndication: false,
		/** Cluster supports the Medium Concentration Level */
	SupportsMediumLevel: false,
		/** Cluster supports the Critical Concentration Level */
	SupportsCriticalLevel: false,
		/** Cluster supports peak numeric measurement of substance */
	SupportsPeakMeasurement: false,
		/** Cluster supports average numeric measurement of substance */
	SupportsAverageMeasurement: false,
},
	commands: {
},
	events: {
	}
}

/**
 * Attributes for reporting formaldehyde concentration measurements
 */

export interface FormaldehydeConcentrationMeasurement {
id: 1067;
	attributes: {
		readonly MeasuredValue?:number
		readonly MinMeasuredValue?:number
		readonly MaxMeasuredValue?:number
		readonly PeakMeasuredValue?:number
		readonly PeakMeasuredValueWindow?:number
		readonly AverageMeasuredValue?:number
		readonly AverageMeasuredValueWindow?:number
		readonly Uncertainty?:number
		readonly MeasurementUnit?:MeasurementUnitEnum
		readonly MeasurementMedium:MeasurementMediumEnum
		readonly LevelValue?:LevelValueEnum
		/** Cluster supports numeric measurement of substance */
		readonly SupportsNumericMeasurement: boolean
		/** Cluster supports basic level indication for substance using the ConcentrationLevel enum */
		readonly SupportsLevelIndication: boolean
		/** Cluster supports the Medium Concentration Level */
		readonly SupportsMediumLevel: boolean
		/** Cluster supports the Critical Concentration Level */
		readonly SupportsCriticalLevel: boolean
		/** Cluster supports peak numeric measurement of substance */
		readonly SupportsPeakMeasurement: boolean
		/** Cluster supports average numeric measurement of substance */
		readonly SupportsAverageMeasurement: boolean
}
	commands: {
}
	events: {
	}
}

export const formaldehydeConcentrationMeasurement: Cluster<FormaldehydeConcentrationMeasurement['attributes'], FormaldehydeConcentrationMeasurement['commands'], FormaldehydeConcentrationMeasurement['events']> = {
id: 1067,
	attributes: {
		MeasuredValue:0,
		MinMeasuredValue:0,
		MaxMeasuredValue:0,
		PeakMeasuredValue:0,
		PeakMeasuredValueWindow:0,
		AverageMeasuredValue:0,
		AverageMeasuredValueWindow:0,
		Uncertainty:0,
		MeasurementUnit:null,
		MeasurementMedium:null,
		LevelValue:null,
		/** Cluster supports numeric measurement of substance */
	SupportsNumericMeasurement: false,
		/** Cluster supports basic level indication for substance using the ConcentrationLevel enum */
	SupportsLevelIndication: false,
		/** Cluster supports the Medium Concentration Level */
	SupportsMediumLevel: false,
		/** Cluster supports the Critical Concentration Level */
	SupportsCriticalLevel: false,
		/** Cluster supports peak numeric measurement of substance */
	SupportsPeakMeasurement: false,
		/** Cluster supports average numeric measurement of substance */
	SupportsAverageMeasurement: false,
},
	commands: {
},
	events: {
	}
}

/**
 * Attributes for reporting PM1 concentration measurements
 */

export interface PM1ConcentrationMeasurement {
id: 1068;
	attributes: {
		readonly MeasuredValue?:number
		readonly MinMeasuredValue?:number
		readonly MaxMeasuredValue?:number
		readonly PeakMeasuredValue?:number
		readonly PeakMeasuredValueWindow?:number
		readonly AverageMeasuredValue?:number
		readonly AverageMeasuredValueWindow?:number
		readonly Uncertainty?:number
		readonly MeasurementUnit?:MeasurementUnitEnum
		readonly MeasurementMedium:MeasurementMediumEnum
		readonly LevelValue?:LevelValueEnum
		/** Cluster supports numeric measurement of substance */
		readonly SupportsNumericMeasurement: boolean
		/** Cluster supports basic level indication for substance using the ConcentrationLevel enum */
		readonly SupportsLevelIndication: boolean
		/** Cluster supports the Medium Concentration Level */
		readonly SupportsMediumLevel: boolean
		/** Cluster supports the Critical Concentration Level */
		readonly SupportsCriticalLevel: boolean
		/** Cluster supports peak numeric measurement of substance */
		readonly SupportsPeakMeasurement: boolean
		/** Cluster supports average numeric measurement of substance */
		readonly SupportsAverageMeasurement: boolean
}
	commands: {
}
	events: {
	}
}

export const pM1ConcentrationMeasurement: Cluster<PM1ConcentrationMeasurement['attributes'], PM1ConcentrationMeasurement['commands'], PM1ConcentrationMeasurement['events']> = {
id: 1068,
	attributes: {
		MeasuredValue:0,
		MinMeasuredValue:0,
		MaxMeasuredValue:0,
		PeakMeasuredValue:0,
		PeakMeasuredValueWindow:0,
		AverageMeasuredValue:0,
		AverageMeasuredValueWindow:0,
		Uncertainty:0,
		MeasurementUnit:null,
		MeasurementMedium:null,
		LevelValue:null,
		/** Cluster supports numeric measurement of substance */
	SupportsNumericMeasurement: false,
		/** Cluster supports basic level indication for substance using the ConcentrationLevel enum */
	SupportsLevelIndication: false,
		/** Cluster supports the Medium Concentration Level */
	SupportsMediumLevel: false,
		/** Cluster supports the Critical Concentration Level */
	SupportsCriticalLevel: false,
		/** Cluster supports peak numeric measurement of substance */
	SupportsPeakMeasurement: false,
		/** Cluster supports average numeric measurement of substance */
	SupportsAverageMeasurement: false,
},
	commands: {
},
	events: {
	}
}

/**
 * Attributes for reporting PM10 concentration measurements
 */

export interface PM10ConcentrationMeasurement {
id: 1069;
	attributes: {
		readonly MeasuredValue?:number
		readonly MinMeasuredValue?:number
		readonly MaxMeasuredValue?:number
		readonly PeakMeasuredValue?:number
		readonly PeakMeasuredValueWindow?:number
		readonly AverageMeasuredValue?:number
		readonly AverageMeasuredValueWindow?:number
		readonly Uncertainty?:number
		readonly MeasurementUnit?:MeasurementUnitEnum
		readonly MeasurementMedium:MeasurementMediumEnum
		readonly LevelValue?:LevelValueEnum
		/** Cluster supports numeric measurement of substance */
		readonly SupportsNumericMeasurement: boolean
		/** Cluster supports basic level indication for substance using the ConcentrationLevel enum */
		readonly SupportsLevelIndication: boolean
		/** Cluster supports the Medium Concentration Level */
		readonly SupportsMediumLevel: boolean
		/** Cluster supports the Critical Concentration Level */
		readonly SupportsCriticalLevel: boolean
		/** Cluster supports peak numeric measurement of substance */
		readonly SupportsPeakMeasurement: boolean
		/** Cluster supports average numeric measurement of substance */
		readonly SupportsAverageMeasurement: boolean
}
	commands: {
}
	events: {
	}
}

export const pM10ConcentrationMeasurement: Cluster<PM10ConcentrationMeasurement['attributes'], PM10ConcentrationMeasurement['commands'], PM10ConcentrationMeasurement['events']> = {
id: 1069,
	attributes: {
		MeasuredValue:0,
		MinMeasuredValue:0,
		MaxMeasuredValue:0,
		PeakMeasuredValue:0,
		PeakMeasuredValueWindow:0,
		AverageMeasuredValue:0,
		AverageMeasuredValueWindow:0,
		Uncertainty:0,
		MeasurementUnit:null,
		MeasurementMedium:null,
		LevelValue:null,
		/** Cluster supports numeric measurement of substance */
	SupportsNumericMeasurement: false,
		/** Cluster supports basic level indication for substance using the ConcentrationLevel enum */
	SupportsLevelIndication: false,
		/** Cluster supports the Medium Concentration Level */
	SupportsMediumLevel: false,
		/** Cluster supports the Critical Concentration Level */
	SupportsCriticalLevel: false,
		/** Cluster supports peak numeric measurement of substance */
	SupportsPeakMeasurement: false,
		/** Cluster supports average numeric measurement of substance */
	SupportsAverageMeasurement: false,
},
	commands: {
},
	events: {
	}
}

/**
 * Attributes for reporting total volatile organic compounds concentration measurements
 */

export interface TotalVolatileOrganicCompoundsConcentrationMeasurement {
id: 1070;
	attributes: {
		readonly MeasuredValue?:number
		readonly MinMeasuredValue?:number
		readonly MaxMeasuredValue?:number
		readonly PeakMeasuredValue?:number
		readonly PeakMeasuredValueWindow?:number
		readonly AverageMeasuredValue?:number
		readonly AverageMeasuredValueWindow?:number
		readonly Uncertainty?:number
		readonly MeasurementUnit?:MeasurementUnitEnum
		readonly MeasurementMedium:MeasurementMediumEnum
		readonly LevelValue?:LevelValueEnum
		/** Cluster supports numeric measurement of substance */
		readonly SupportsNumericMeasurement: boolean
		/** Cluster supports basic level indication for substance using the ConcentrationLevel enum */
		readonly SupportsLevelIndication: boolean
		/** Cluster supports the Medium Concentration Level */
		readonly SupportsMediumLevel: boolean
		/** Cluster supports the Critical Concentration Level */
		readonly SupportsCriticalLevel: boolean
		/** Cluster supports peak numeric measurement of substance */
		readonly SupportsPeakMeasurement: boolean
		/** Cluster supports average numeric measurement of substance */
		readonly SupportsAverageMeasurement: boolean
}
	commands: {
}
	events: {
	}
}

export const totalVolatileOrganicCompoundsConcentrationMeasurement: Cluster<TotalVolatileOrganicCompoundsConcentrationMeasurement['attributes'], TotalVolatileOrganicCompoundsConcentrationMeasurement['commands'], TotalVolatileOrganicCompoundsConcentrationMeasurement['events']> = {
id: 1070,
	attributes: {
		MeasuredValue:0,
		MinMeasuredValue:0,
		MaxMeasuredValue:0,
		PeakMeasuredValue:0,
		PeakMeasuredValueWindow:0,
		AverageMeasuredValue:0,
		AverageMeasuredValueWindow:0,
		Uncertainty:0,
		MeasurementUnit:null,
		MeasurementMedium:null,
		LevelValue:null,
		/** Cluster supports numeric measurement of substance */
	SupportsNumericMeasurement: false,
		/** Cluster supports basic level indication for substance using the ConcentrationLevel enum */
	SupportsLevelIndication: false,
		/** Cluster supports the Medium Concentration Level */
	SupportsMediumLevel: false,
		/** Cluster supports the Critical Concentration Level */
	SupportsCriticalLevel: false,
		/** Cluster supports peak numeric measurement of substance */
	SupportsPeakMeasurement: false,
		/** Cluster supports average numeric measurement of substance */
	SupportsAverageMeasurement: false,
},
	commands: {
},
	events: {
	}
}

/**
 * Attributes for reporting radon concentration measurements
 */

export interface RadonConcentrationMeasurement {
id: 1071;
	attributes: {
		readonly MeasuredValue?:number
		readonly MinMeasuredValue?:number
		readonly MaxMeasuredValue?:number
		readonly PeakMeasuredValue?:number
		readonly PeakMeasuredValueWindow?:number
		readonly AverageMeasuredValue?:number
		readonly AverageMeasuredValueWindow?:number
		readonly Uncertainty?:number
		readonly MeasurementUnit?:MeasurementUnitEnum
		readonly MeasurementMedium:MeasurementMediumEnum
		readonly LevelValue?:LevelValueEnum
		/** Cluster supports numeric measurement of substance */
		readonly SupportsNumericMeasurement: boolean
		/** Cluster supports basic level indication for substance using the ConcentrationLevel enum */
		readonly SupportsLevelIndication: boolean
		/** Cluster supports the Medium Concentration Level */
		readonly SupportsMediumLevel: boolean
		/** Cluster supports the Critical Concentration Level */
		readonly SupportsCriticalLevel: boolean
		/** Cluster supports peak numeric measurement of substance */
		readonly SupportsPeakMeasurement: boolean
		/** Cluster supports average numeric measurement of substance */
		readonly SupportsAverageMeasurement: boolean
}
	commands: {
}
	events: {
	}
}

export const radonConcentrationMeasurement: Cluster<RadonConcentrationMeasurement['attributes'], RadonConcentrationMeasurement['commands'], RadonConcentrationMeasurement['events']> = {
id: 1071,
	attributes: {
		MeasuredValue:0,
		MinMeasuredValue:0,
		MaxMeasuredValue:0,
		PeakMeasuredValue:0,
		PeakMeasuredValueWindow:0,
		AverageMeasuredValue:0,
		AverageMeasuredValueWindow:0,
		Uncertainty:0,
		MeasurementUnit:null,
		MeasurementMedium:null,
		LevelValue:null,
		/** Cluster supports numeric measurement of substance */
	SupportsNumericMeasurement: false,
		/** Cluster supports basic level indication for substance using the ConcentrationLevel enum */
	SupportsLevelIndication: false,
		/** Cluster supports the Medium Concentration Level */
	SupportsMediumLevel: false,
		/** Cluster supports the Critical Concentration Level */
	SupportsCriticalLevel: false,
		/** Cluster supports peak numeric measurement of substance */
	SupportsPeakMeasurement: false,
		/** Cluster supports average numeric measurement of substance */
	SupportsAverageMeasurement: false,
},
	commands: {
},
	events: {
	}
}