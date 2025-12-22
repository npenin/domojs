// This file is generated from ZoneManagement.xml - do not edit it directly
// Generated on 2025-12-22T10:19:46.171Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export type ZoneID = number;


export enum ZoneEventStoppedReasonEnum {
	ActionStopped = 0,
	Timeout = 1,
}

export enum ZoneEventTriggeredReasonEnum {
	Motion = 0,
}

export enum ZoneSourceEnum {
	Mfg = 0,
	User = 1,
}

export enum ZoneTypeEnum {
	TwoDCARTZone = 0,
}

export enum ZoneUseEnum {
	Motion = 0,
	Privacy = 1,
	Focus = 2,
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
	ZoneID:ZoneID,
	ZoneType:ZoneTypeEnum,
	ZoneSource:ZoneSourceEnum,
	TwoDCartesianZone?:TwoDCartesianZoneStruct,
}

export interface ZoneTriggerControlStruct {
	ZoneID:ZoneID,
	InitialDuration:number,
	AugmentationDuration:number,
	MaxDuration:number,
	BlindDuration:number,
	Sensitivity?:number,
}

export type ZoneManagement = ZoneManagementCluster & { id: 0x0550};

export interface ZoneManagementCluster {
id: 0x0550;
	attributes: {
		readonly MaxUserDefinedZones?:number
		readonly MaxZones:number
		readonly Zones:readonly ZoneInformationStruct[]
		readonly Triggers:readonly ZoneTriggerControlStruct[]
		readonly SensitivityMax:number
		readonly Sensitivity?:number
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
		CreateTwoDCartesianZone?: {
			inputparams: readonly [
				Zone: TwoDCartesianZoneStruct, 
			],
			 outputparams: readonly [
				ZoneID: ZoneID, ]
            }
		UpdateTwoDCartesianZone?: {
			inputparams: readonly [
				ZoneID: ZoneID, 
				Zone: TwoDCartesianZoneStruct, 
			],
			 outputparams: readonly []
            }
		RemoveZone?: {
			inputparams: readonly [
				ZoneID: ZoneID, 
			],
			 outputparams: readonly []
            }
		CreateOrUpdateTrigger: {
			inputparams: readonly [
				Trigger: ZoneTriggerControlStruct, 
			],
			 outputparams: readonly []
            }
		RemoveTrigger: {
			inputparams: readonly [
				ZoneID: ZoneID, 
			],
			 outputparams: readonly []
            }
}
	events: {
		ZoneTriggered: [
			
			Zone: ZoneID, 
			Reason: ZoneEventTriggeredReasonEnum, ];
		ZoneStopped: [
			
			Zone: ZoneID, 
			Reason: ZoneEventStoppedReasonEnum, ];
	}
}

export const zoneManagement: ClusterDefinition<ZoneManagement> = {
id: 0x0550,
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
	] as const
}

export default zoneManagement;