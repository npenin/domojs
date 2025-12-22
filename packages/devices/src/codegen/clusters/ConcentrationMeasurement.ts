// This file is generated from ConcentrationMeasurement.xml - do not edit it directly
// Generated on 2025-12-22T10:25:59.275Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum LevelValueEnum {
	Unknown = 0,
	Low = 1,
	Medium = 2,
	High = 3,
	Critical = 4,
}

export enum MeasurementMediumEnum {
	Air = 0,
	Water = 1,
	Soil = 2,
}

export enum MeasurementUnitEnum {
	PPM = 0,
	PPB = 1,
	PPT = 2,
	MGM3 = 3,
	UGM3 = 4,
	NGM3 = 5,
	PM3 = 6,
	BQM3 = 7,
}

export type CarbonMonoxideConcentrationMeasurement = ConcentrationMeasurementClusters & { id: 0x040C};

export type CarbonDioxideConcentrationMeasurement = ConcentrationMeasurementClusters & { id: 0x040D};

export type NitrogenDioxideConcentrationMeasurement = ConcentrationMeasurementClusters & { id: 0x0413};

export type OzoneConcentrationMeasurement = ConcentrationMeasurementClusters & { id: 0x0415};

export type PM2_5ConcentrationMeasurement = ConcentrationMeasurementClusters & { id: 0x042A};

export type FormaldehydeConcentrationMeasurement = ConcentrationMeasurementClusters & { id: 0x042B};

export type PM1ConcentrationMeasurement = ConcentrationMeasurementClusters & { id: 0x042C};

export type PM10ConcentrationMeasurement = ConcentrationMeasurementClusters & { id: 0x042D};

export type TotalVolatileOrganicCompoundsConcentrationMeasurement = ConcentrationMeasurementClusters & { id: 0x042E};

export type RadonConcentrationMeasurement = ConcentrationMeasurementClusters & { id: 0x042F};

export interface ConcentrationMeasurementClusters {
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

export const carbonMonoxideConcentrationMeasurement: ClusterDefinition<CarbonMonoxideConcentrationMeasurement> = {
id: 0x040C,
	attributes: [
		"MeasuredValue",
		"MinMeasuredValue",
		"MaxMeasuredValue",
		"PeakMeasuredValue",
		"PeakMeasuredValueWindow",
		"AverageMeasuredValue",
		"AverageMeasuredValueWindow",
		"Uncertainty",
		"MeasurementUnit",
		"MeasurementMedium",
		"LevelValue",
		"SupportsNumericMeasurement",
		"SupportsLevelIndication",
		"SupportsMediumLevel",
		"SupportsCriticalLevel",
		"SupportsPeakMeasurement",
		"SupportsAverageMeasurement",
	] as const,
	commands: [
	] as const,
	events: [
	] as const
}

export const carbonDioxideConcentrationMeasurement: ClusterDefinition<CarbonDioxideConcentrationMeasurement> = {
id: 0x040D,
	attributes: [
		"MeasuredValue",
		"MinMeasuredValue",
		"MaxMeasuredValue",
		"PeakMeasuredValue",
		"PeakMeasuredValueWindow",
		"AverageMeasuredValue",
		"AverageMeasuredValueWindow",
		"Uncertainty",
		"MeasurementUnit",
		"MeasurementMedium",
		"LevelValue",
		"SupportsNumericMeasurement",
		"SupportsLevelIndication",
		"SupportsMediumLevel",
		"SupportsCriticalLevel",
		"SupportsPeakMeasurement",
		"SupportsAverageMeasurement",
	] as const,
	commands: [
	] as const,
	events: [
	] as const
}

export const nitrogenDioxideConcentrationMeasurement: ClusterDefinition<NitrogenDioxideConcentrationMeasurement> = {
id: 0x0413,
	attributes: [
		"MeasuredValue",
		"MinMeasuredValue",
		"MaxMeasuredValue",
		"PeakMeasuredValue",
		"PeakMeasuredValueWindow",
		"AverageMeasuredValue",
		"AverageMeasuredValueWindow",
		"Uncertainty",
		"MeasurementUnit",
		"MeasurementMedium",
		"LevelValue",
		"SupportsNumericMeasurement",
		"SupportsLevelIndication",
		"SupportsMediumLevel",
		"SupportsCriticalLevel",
		"SupportsPeakMeasurement",
		"SupportsAverageMeasurement",
	] as const,
	commands: [
	] as const,
	events: [
	] as const
}

export const ozoneConcentrationMeasurement: ClusterDefinition<OzoneConcentrationMeasurement> = {
id: 0x0415,
	attributes: [
		"MeasuredValue",
		"MinMeasuredValue",
		"MaxMeasuredValue",
		"PeakMeasuredValue",
		"PeakMeasuredValueWindow",
		"AverageMeasuredValue",
		"AverageMeasuredValueWindow",
		"Uncertainty",
		"MeasurementUnit",
		"MeasurementMedium",
		"LevelValue",
		"SupportsNumericMeasurement",
		"SupportsLevelIndication",
		"SupportsMediumLevel",
		"SupportsCriticalLevel",
		"SupportsPeakMeasurement",
		"SupportsAverageMeasurement",
	] as const,
	commands: [
	] as const,
	events: [
	] as const
}

export const pM2_5ConcentrationMeasurement: ClusterDefinition<PM2_5ConcentrationMeasurement> = {
id: 0x042A,
	attributes: [
		"MeasuredValue",
		"MinMeasuredValue",
		"MaxMeasuredValue",
		"PeakMeasuredValue",
		"PeakMeasuredValueWindow",
		"AverageMeasuredValue",
		"AverageMeasuredValueWindow",
		"Uncertainty",
		"MeasurementUnit",
		"MeasurementMedium",
		"LevelValue",
		"SupportsNumericMeasurement",
		"SupportsLevelIndication",
		"SupportsMediumLevel",
		"SupportsCriticalLevel",
		"SupportsPeakMeasurement",
		"SupportsAverageMeasurement",
	] as const,
	commands: [
	] as const,
	events: [
	] as const
}

export const formaldehydeConcentrationMeasurement: ClusterDefinition<FormaldehydeConcentrationMeasurement> = {
id: 0x042B,
	attributes: [
		"MeasuredValue",
		"MinMeasuredValue",
		"MaxMeasuredValue",
		"PeakMeasuredValue",
		"PeakMeasuredValueWindow",
		"AverageMeasuredValue",
		"AverageMeasuredValueWindow",
		"Uncertainty",
		"MeasurementUnit",
		"MeasurementMedium",
		"LevelValue",
		"SupportsNumericMeasurement",
		"SupportsLevelIndication",
		"SupportsMediumLevel",
		"SupportsCriticalLevel",
		"SupportsPeakMeasurement",
		"SupportsAverageMeasurement",
	] as const,
	commands: [
	] as const,
	events: [
	] as const
}

export const pM1ConcentrationMeasurement: ClusterDefinition<PM1ConcentrationMeasurement> = {
id: 0x042C,
	attributes: [
		"MeasuredValue",
		"MinMeasuredValue",
		"MaxMeasuredValue",
		"PeakMeasuredValue",
		"PeakMeasuredValueWindow",
		"AverageMeasuredValue",
		"AverageMeasuredValueWindow",
		"Uncertainty",
		"MeasurementUnit",
		"MeasurementMedium",
		"LevelValue",
		"SupportsNumericMeasurement",
		"SupportsLevelIndication",
		"SupportsMediumLevel",
		"SupportsCriticalLevel",
		"SupportsPeakMeasurement",
		"SupportsAverageMeasurement",
	] as const,
	commands: [
	] as const,
	events: [
	] as const
}

export const pM10ConcentrationMeasurement: ClusterDefinition<PM10ConcentrationMeasurement> = {
id: 0x042D,
	attributes: [
		"MeasuredValue",
		"MinMeasuredValue",
		"MaxMeasuredValue",
		"PeakMeasuredValue",
		"PeakMeasuredValueWindow",
		"AverageMeasuredValue",
		"AverageMeasuredValueWindow",
		"Uncertainty",
		"MeasurementUnit",
		"MeasurementMedium",
		"LevelValue",
		"SupportsNumericMeasurement",
		"SupportsLevelIndication",
		"SupportsMediumLevel",
		"SupportsCriticalLevel",
		"SupportsPeakMeasurement",
		"SupportsAverageMeasurement",
	] as const,
	commands: [
	] as const,
	events: [
	] as const
}

export const totalVolatileOrganicCompoundsConcentrationMeasurement: ClusterDefinition<TotalVolatileOrganicCompoundsConcentrationMeasurement> = {
id: 0x042E,
	attributes: [
		"MeasuredValue",
		"MinMeasuredValue",
		"MaxMeasuredValue",
		"PeakMeasuredValue",
		"PeakMeasuredValueWindow",
		"AverageMeasuredValue",
		"AverageMeasuredValueWindow",
		"Uncertainty",
		"MeasurementUnit",
		"MeasurementMedium",
		"LevelValue",
		"SupportsNumericMeasurement",
		"SupportsLevelIndication",
		"SupportsMediumLevel",
		"SupportsCriticalLevel",
		"SupportsPeakMeasurement",
		"SupportsAverageMeasurement",
	] as const,
	commands: [
	] as const,
	events: [
	] as const
}

export const radonConcentrationMeasurement: ClusterDefinition<RadonConcentrationMeasurement> = {
id: 0x042F,
	attributes: [
		"MeasuredValue",
		"MinMeasuredValue",
		"MaxMeasuredValue",
		"PeakMeasuredValue",
		"PeakMeasuredValueWindow",
		"AverageMeasuredValue",
		"AverageMeasuredValueWindow",
		"Uncertainty",
		"MeasurementUnit",
		"MeasurementMedium",
		"LevelValue",
		"SupportsNumericMeasurement",
		"SupportsLevelIndication",
		"SupportsMediumLevel",
		"SupportsCriticalLevel",
		"SupportsPeakMeasurement",
		"SupportsAverageMeasurement",
	] as const,
	commands: [
	] as const,
	events: [
	] as const
}