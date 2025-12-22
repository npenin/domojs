// This file is generated from ElectricalGridConditions.xml - do not edit it directly
// Generated on 2025-12-22T10:19:30.947Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum ThreeLevelEnum {
	Low = 0,
	Medium = 1,
	High = 2,
}

export interface ElectricalGridConditionsStruct {
	PeriodStart:number,
	PeriodEnd:number,
	GridCarbonIntensity:number,
	GridCarbonLevel:ThreeLevelEnum,
	LocalCarbonIntensity:number,
	LocalCarbonLevel:ThreeLevelEnum,
}

export type ElectricalGridConditions = ElectricalGridConditionsCluster & { id: 0x00A0};

export interface ElectricalGridConditionsCluster {
id: 0x00A0;
	attributes: {
		readonly LocalGenerationAvailable:boolean
		readonly CurrentConditions:ElectricalGridConditionsStruct
		readonly ForecastConditions?:readonly ElectricalGridConditionsStruct[]
		/** Forecasts upcoming */
		readonly SupportsForecasting: boolean
}
	commands: {
}
	events: {
		CurrentConditionsChanged: [
			
			CurrentConditions: ElectricalGridConditionsStruct, ];
	}
}

export const electricalGridConditions: ClusterDefinition<ElectricalGridConditions> = {
id: 0x00A0,
	attributes: [
		"LocalGenerationAvailable",
		"CurrentConditions",
		"ForecastConditions",
		"SupportsForecasting",
	] as const,
	commands: [
	] as const,
	events: [
	] as const
}

export default electricalGridConditions;