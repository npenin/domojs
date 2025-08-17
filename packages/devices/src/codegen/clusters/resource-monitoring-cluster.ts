// This file is generated from resource-monitoring-cluster.xml - do not edit it directly
// Generated on 2025-08-17T14:20:46.516Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum DegradationDirectionEnum {
	Up= 0,
	Down= 1,
}

export enum ChangeIndicationEnum {
	OK= 0,
	Warning= 1,
	Critical= 2,
}

export enum ProductIdentifierTypeEnum {
	UPC= 0,
	GTIN_8= 1,
	EAN= 2,
	GTIN_14= 3,
	OEM= 4,
}

export interface ReplacementProductStruct {
	ProductIdentifierType:ProductIdentifierTypeEnum,
	ProductIdentifierValue:string,
}

export interface ReplacementProductStruct {
	ProductIdentifierType:ProductIdentifierTypeEnum,
	ProductIdentifierValue:string,
}

/**
 * Attributes and commands for monitoring HEPA filters in a device
 */

export interface HEPAFilterMonitoring {
id: 113;
	attributes: {
		readonly Condition?:number
		readonly DegradationDirection?:DegradationDirectionEnum
		readonly ChangeIndication:ChangeIndicationEnum
		readonly InPlaceIndicator?:boolean
		LastChangedTime?:number
		readonly ReplacementProductList?:readonly ReplacementProductStruct[]
		/** Supports monitoring the condition of the resource in percentage */
		readonly SupportsCondition: boolean
		/** Supports warning indication */
		readonly SupportsWarning: boolean
		/** Supports specifying the list of replacement products */
		readonly SupportsReplacementProductList: boolean
}
	commands: {
		/** Reset the condition of the replaceable to the non degraded state */
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
id: 113,
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

/**
 * Attributes and commands for monitoring activated carbon filters in a device
 */

export interface ActivatedCarbonFilterMonitoring {
id: 114;
	attributes: {
		readonly Condition?:number
		readonly DegradationDirection?:DegradationDirectionEnum
		readonly ChangeIndication:ChangeIndicationEnum
		readonly InPlaceIndicator?:boolean
		LastChangedTime?:number
		readonly ReplacementProductList?:readonly ReplacementProductStruct[]
		/** Supports monitoring the condition of the resource in percentage */
		readonly SupportsCondition: boolean
		/** Supports warning indication */
		readonly SupportsWarning: boolean
		/** Supports specifying the list of replacement products */
		readonly SupportsReplacementProductList: boolean
}
	commands: {
		/** Reset the condition of the replaceable to the non degraded state */
		ResetCondition?: {
			inputparams: readonly [
			],
			 outputparams: readonly []
            }
}
	events: {
	}
}

export const activatedCarbonFilterMonitoring: ClusterDefinition<ActivatedCarbonFilterMonitoring> = {
id: 114,
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