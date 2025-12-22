// This file is generated from ResourceMonitoring.xml - do not edit it directly
// Generated on 2025-12-22T10:26:10.689Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum ChangeIndicationEnum {
	OK = 0,
	Warning = 1,
	Critical = 2,
}

export enum DegradationDirectionEnum {
	Up = 0,
	Down = 1,
}

export enum ProductIdentifierTypeEnum {
	UPC = 0,
	GTIN_8 = 1,
	EAN = 2,
	GTIN_14 = 3,
	OEM = 4,
}

export interface ReplacementProductStruct {
	ProductIdentifierType:ProductIdentifierTypeEnum,
	ProductIdentifierValue:string,
}

export type HEPAFilterMonitoring = ResourceMonitoringClusters & { id: 0x0071};

export type ActivatedCarbonFilterMonitoring = ResourceMonitoringClusters & { id: 0x0072};

export type WaterTankLevelMonitoring = ResourceMonitoringClusters & { id: 0x0079};

export interface ResourceMonitoringClusters {
	attributes: {
		readonly Condition?:number
		readonly DegradationDirection?:DegradationDirectionEnum
		readonly ChangeIndication:ChangeIndicationEnum
		readonly InPlaceIndicator?:boolean
		readonly LastChangedTime?:number
		readonly ReplacementProductList?:readonly ReplacementProductStruct[]
		/** Supports monitoring the condition of the resource in percentage */
		readonly SupportsCondition: boolean
		/** Supports warning indication */
		readonly SupportsWarning: boolean
		/** Supports specifying the list of replacement products */
		readonly SupportsReplacementProductList: boolean
}
	commands: {
		ResetCondition?: {
			inputparams: readonly [
			],
			 outputparams: readonly []
            }
}
	events: {
	}
}

export const hEPAFilterMonitoring: ClusterDefinition<HEPAFilterMonitoring> = {
id: 0x0071,
	attributes: [
		"Condition",
		"DegradationDirection",
		"ChangeIndication",
		"InPlaceIndicator",
		"LastChangedTime",
		"ReplacementProductList",
		"SupportsCondition",
		"SupportsWarning",
		"SupportsReplacementProductList",
	] as const,
	commands: [
		"ResetCondition",
	] as const,
	events: [
	] as const
}

export const activatedCarbonFilterMonitoring: ClusterDefinition<ActivatedCarbonFilterMonitoring> = {
id: 0x0072,
	attributes: [
		"Condition",
		"DegradationDirection",
		"ChangeIndication",
		"InPlaceIndicator",
		"LastChangedTime",
		"ReplacementProductList",
		"SupportsCondition",
		"SupportsWarning",
		"SupportsReplacementProductList",
	] as const,
	commands: [
		"ResetCondition",
	] as const,
	events: [
	] as const
}

export const waterTankLevelMonitoring: ClusterDefinition<WaterTankLevelMonitoring> = {
id: 0x0079,
	attributes: [
		"Condition",
		"DegradationDirection",
		"ChangeIndication",
		"InPlaceIndicator",
		"LastChangedTime",
		"ReplacementProductList",
		"SupportsCondition",
		"SupportsWarning",
		"SupportsReplacementProductList",
	] as const,
	commands: [
		"ResetCondition",
	] as const,
	events: [
	] as const
}