// This file is generated from zone-management-cluster.xml - do not edit it directly
// Generated on 2025-12-03T20:57:12.934Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum StatusCodeEnum {
	ZoneNotFound= 2,
	ZoneInUse= 3,
}

export enum ZoneEventStoppedReasonEnum {
	ActionStopped= 0,
	Timeout= 1,
}

export enum ZoneEventTriggeredReasonEnum {
	Motion= 0,
}

export enum ZoneSourceEnum {
	Mfg= 0,
	User= 1,
}

export enum ZoneTypeEnum {
	TwoDCARTZone= 0,
}

export enum ZoneUseEnum {
	Motion= 0,
	Privacy= 1,
	Focus= 2,
}

export interface TwoDCartesianVertexStruct {
	X:number,
	Y:number,
}

export interface TwoDCartesianZoneStruct {
	Name:string,
	Use:ZoneUseEnum,
	Vertices:readonly TwoDCartesianVertexStruct[],
	Color?:string,
}

export interface ZoneInformationStruct {
	ZoneID:number,
	ZoneType:ZoneTypeEnum,
	ZoneSource:ZoneSourceEnum,
	TwoDCartesianZone?:TwoDCartesianZoneStruct,
}

export interface ZoneTriggerControlStruct {
	ZoneID:number,
	InitialDuration:number,
	AugmentationDuration:number,
	MaxDuration:number,
	BlindDuration:number,
	Sensitivity?:number,
}

/**
 * This cluster provides an interface to manage regions of interest, or Zones, which can be either manufacturer or user defined.
 */

export interface ZoneManagement {
id: 1360;
	attributes: {
		readonly MaxUserDefinedZones?:number
		readonly MaxZones:number
		readonly Zones:readonly ZoneInformationStruct[]
		readonly Triggers:readonly ZoneTriggerControlStruct[]
		readonly SensitivityMax:number
		Sensitivity?:number
		readonly TwoDCartesianMax?:TwoDCartesianVertexStruct
		/** Supports Two Dimensional Cartesian Zones */
		readonly SupportsTwoDimensionalCartesianZone: boolean
		/** Supports a sensitivity value per Zone */
		readonly SupportsPerZoneSensitivity: boolean
		/** Supports user defined zones */
		readonly SupportsUserDefined: boolean
		/** Supports user defined focus zones */
		readonly SupportsFocusZones: boolean
}
	commands: {
		/** This command SHALL create and store a TwoD Cartesian Zone. */
		CreateTwoDCartesianZone?: {
			inputparams: readonly [
				Zone: TwoDCartesianZoneStruct, 
			],
			 outputparams: readonly [
				ZoneID: number, ]
            }
		/** The UpdateTwoDCartesianZone SHALL update a stored TwoD Cartesian Zone. */
		UpdateTwoDCartesianZone?: {
			inputparams: readonly [
				ZoneID: number, 
				Zone: TwoDCartesianZoneStruct, 
			],
			 outputparams: readonly []
            }
		/** This command SHALL remove the user-defined Zone indicated by ZoneID. */
		RemoveZone?: {
			inputparams: readonly [
				ZoneID: number, 
			],
			 outputparams: readonly []
            }
		/** This command is used to create or update a Trigger for the specified motion Zone. */
		CreateOrUpdateTrigger: {
			inputparams: readonly [
				Trigger: ZoneTriggerControlStruct, 
			],
			 outputparams: readonly []
            }
		/** This command SHALL remove the Trigger for the provided ZoneID. */
		RemoveTrigger: {
			inputparams: readonly [
				ZoneID: number, 
			],
			 outputparams: readonly []
            }
}
	events: {
		ZoneTriggered: [
			
			Zone: number, 
			Reason: ZoneEventTriggeredReasonEnum, ];
		ZoneStopped: [
			
			Zone: number, 
			Reason: ZoneEventStoppedReasonEnum, ];
	}
}

export const zoneManagement: ClusterDefinition<ZoneManagement> = {
id: 1360,
	attributes: [
		"MaxUserDefinedZones",
		"MaxZones",
		"Zones",
		"Triggers",
		"SensitivityMax",
		"Sensitivity",
		"TwoDCartesianMax",
		"SupportsTwoDimensionalCartesianZone",
		"SupportsPerZoneSensitivity",
		"SupportsUserDefined",
		"SupportsFocusZones",
	] as const,
	commands: [
		"CreateTwoDCartesianZone",
		"UpdateTwoDCartesianZone",
		"RemoveZone",
		"CreateOrUpdateTrigger",
		"RemoveTrigger",
	] as const,
	events: [
		"ZoneTriggered",
		"ZoneStopped",
	] as const
}

export default zoneManagement;