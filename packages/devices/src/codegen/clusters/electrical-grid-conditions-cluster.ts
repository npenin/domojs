// This file is generated from electrical-grid-conditions-cluster.xml - do not edit it directly
// Generated on 2025-08-24T09:48:29.682Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum ThreeLevelEnum {
	Low= 0,
	Medium= 1,
	High= 2,
}

export interface ElectricalGridConditionsStruct {
	PeriodStart:number,
	PeriodEnd:number,
	GridCarbonIntensity:number,
	GridCarbonLevel:ThreeLevelEnum,
	LocalCarbonIntensity:number,
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

export const electricalGridConditions: ClusterDefinition<ElectricalGridConditions> = {
id: 160,
	attributes: [
		"LocalGenerationAvailable",
		"CurrentConditions",
		"ForecastConditions",
		"SupportsForecasting",
	] as const,
	commands: [
	] as const,
	events: [
		"CurrentConditionsChanged",
	] as const
}

export default electricalGridConditions;