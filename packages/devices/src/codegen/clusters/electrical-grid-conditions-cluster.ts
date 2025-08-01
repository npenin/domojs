

export enum ThreeLevelEnum {
	Low= 0,
	Medium= 1,
	High= 2,
}

export interface ElectricalGridConditionsStruct {
	PeriodStart: number,
	PeriodEnd: number,
	GridCarbonIntensity: number,
	GridCarbonLevel:ThreeLevelEnum,
	LocalCarbonIntensity: number,
	LocalCarbonLevel:ThreeLevelEnum,
}

/**
 * The Electrical Grid Conditions Cluster provides the mechanism for communicating electricity grid carbon intensity to devices within the premises in units of Grams of CO2e per kWh.
 */

export interface ElectricalGridConditions {
id: 160;
	attributes: {
		LocalGenerationAvailable?:boolean
		readonly CurrentConditions?:ElectricalGridConditionsStruct
		readonly ForecastConditions?:readonly ElectricalGridConditionsStruct[]
		/** Forecasts upcoming */
		readonly SupportsForecasting: boolean
}
	commands: {
}
	events: {
		CurrentConditionsChanged?: [
			
			CurrentConditions: ElectricalGridConditionsStruct, ];
	}
}