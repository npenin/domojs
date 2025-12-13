// This file is generated from time-synchronization-cluster.xml - do not edit it directly
// Generated on 2025-12-03T20:57:12.616Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum StatusCode {
	TimeNotAccepted= 2,
}

export enum GranularityEnum {
	NoTimeGranularity= 0,
	MinutesGranularity= 1,
	SecondsGranularity= 2,
	MillisecondsGranularity= 3,
	MicrosecondsGranularity= 4,
}

export enum TimeSourceEnum {
	None= 0,
	Unknown= 1,
	Admin= 2,
	NodeTimeCluster= 3,
	NonMatterSNTP= 4,
	NonMatterNTP= 5,
	MatterSNTP= 6,
	MatterNTP= 7,
	MixedNTP= 8,
	NonMatterSNTPNTS= 9,
	NonMatterNTPNTS= 10,
	MatterSNTPNTS= 11,
	MatterNTPNTS= 12,
	MixedNTPNTS= 13,
	CloudSource= 14,
	PTP= 15,
	GNSS= 16,
}

export enum TimeZoneDatabaseEnum {
	Full= 0,
	Partial= 1,
	None= 2,
}

export interface TrustedTimeSourceStruct {
	FabricIndex:number,
	NodeID:string,
	Endpoint:number,
}

export interface FabricScopedTrustedTimeSourceStruct {
	NodeID:string,
	Endpoint:number,
}

export interface TimeZoneStruct {
	Offset:number,
	ValidAt:number,
	Name?:string,
}

export interface DSTOffsetStruct {
	Offset:number,
	ValidStarting:number,
	ValidUntil:number,
}

/**
 * Accurate time is required for a number of reasons, including scheduling, display and validating security materials.
 */

export interface TimeSynchronization {
id: 56;
	attributes: {
		readonly UTCTime?:number
		readonly Granularity:GranularityEnum
		readonly TimeSource?:TimeSourceEnum
		readonly TrustedTimeSource?:TrustedTimeSourceStruct
		readonly DefaultNTP?:string
		readonly TimeZone?:readonly TimeZoneStruct[]
		readonly DSTOffset?:readonly DSTOffsetStruct[]
		readonly LocalTime?:number
		readonly TimeZoneDatabase?:TimeZoneDatabaseEnum
		readonly NTPServerAvailable?:boolean
		readonly TimeZoneListMaxSize?:number
		readonly DSTOffsetListMaxSize?:number
		readonly SupportsDNSResolve?:boolean
		/** Server supports time zone. */
		readonly SupportsTimeZone: boolean
		/** Server supports an NTP or SNTP client. */
		readonly SupportsNTPClient: boolean
		/** Server supports an NTP server role. */
		readonly SupportsNTPServer: boolean
		/** Time synchronization client cluster is present. */
		readonly SupportsTimeSyncClient: boolean
}
	commands: {
		/** This command is used to set the UTC time of the node. */
		SetUTCTime: {
			inputparams: readonly [
				UTCTime: number, 
				Granularity: GranularityEnum, 
				TimeSource: TimeSourceEnum, 
			],
			 outputparams: readonly []
            }
		/** This command is used to set the TrustedTimeSource attribute. */
		SetTrustedTimeSource?: {
			inputparams: readonly [
				TrustedTimeSource: FabricScopedTrustedTimeSourceStruct, 
			],
			 outputparams: readonly []
            }
		/** This command is used to set the time zone of the node. */
		SetTimeZone?: {
			inputparams: readonly [
				TimeZone: readonly TimeZoneStruct[], 
			],
			 outputparams: readonly [
				DSTOffsetRequired: boolean, ]
            }
		/** This command is used to set the DST offsets for a node. */
		SetDSTOffset?: {
			inputparams: readonly [
				DSTOffset: readonly DSTOffsetStruct[], 
			],
			 outputparams: readonly []
            }
		/** This command is used to set the DefaultNTP attribute. */
		SetDefaultNTP?: {
			inputparams: readonly [
				DefaultNTP: string, 
			],
			 outputparams: readonly []
            }
}
	events: {
		DSTTableEmpty?: [
			];
		DSTStatus?: [
			
			DSTOffsetActive: boolean, ];
		TimeZoneStatus?: [
			
			Offset: number, 
			Name: string, ];
		TimeFailure: [
			];
		MissingTrustedTimeSource?: [
			];
	}
}

export const timeSynchronization: ClusterDefinition<TimeSynchronization> = {
id: 56,
	attributes: [
		"UTCTime",
		"Granularity",
		"TimeSource",
		"TrustedTimeSource",
		"DefaultNTP",
		"TimeZone",
		"DSTOffset",
		"LocalTime",
		"TimeZoneDatabase",
		"NTPServerAvailable",
		"TimeZoneListMaxSize",
		"DSTOffsetListMaxSize",
		"SupportsDNSResolve",
		"SupportsTimeZone",
		"SupportsNTPClient",
		"SupportsNTPServer",
		"SupportsTimeSyncClient",
	] as const,
	commands: [
		"SetUTCTime",
		"SetTrustedTimeSource",
		"SetTimeZone",
		"SetDSTOffset",
		"SetDefaultNTP",
	] as const,
	events: [
		"DSTTableEmpty",
		"DSTStatus",
		"TimeZoneStatus",
		"TimeFailure",
		"MissingTrustedTimeSource",
	] as const
}

export default timeSynchronization;