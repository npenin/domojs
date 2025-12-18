// This file is generated from TimeSync.xml - do not edit it directly
// Generated on 2025-12-18T03:05:14.902Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum GranularityEnum {
	NoTimeGranularity = 0,
	MinutesGranularity = 1,
	SecondsGranularity = 2,
	MillisecondsGranularity = 3,
	MicrosecondsGranularity = 4,
}

export enum StatusCodeEnum {
	TimeNotAccepted = 2,
}

export enum TimeSourceEnum {
	None = 0,
	Unknown = 1,
	Admin = 2,
	NodeTimeCluster = 3,
	NonMatterSNTP = 4,
	NonMatterNTP = 5,
	MatterSNTP = 6,
	MatterNTP = 7,
	MixedNTP = 8,
	NonMatterSNTPNTS = 9,
	NonMatterNTPNTS = 10,
	MatterSNTPNTS = 11,
	MatterNTPNTS = 12,
	MixedNTPNTS = 13,
	CloudSource = 14,
	PTP = 15,
	GNSS = 16,
}

export enum TimeZoneDatabaseEnum {
	Full = 0,
	Partial = 1,
	None = 2,
}

export interface DSTOffsetStruct {
	Offset:number,
	ValidStarting:number,
	ValidUntil:number,
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

export interface TrustedTimeSourceStruct {
	FabricIndex:number,
	NodeID:string,
	Endpoint:number,
}

export type TimeSynchronization = TimeSynchronizationCluster & { id: 0x0038};

export interface TimeSynchronizationCluster {
id: 0x0038;
	attributes: {
		readonly UTCTime:number
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
		SetUTCTime: {
			inputparams: readonly [
				UTCTime: number, 
				Granularity: GranularityEnum, 
				TimeSource: TimeSourceEnum, 
			],
			 outputparams: readonly []
            }
		SetTrustedTimeSource?: {
			inputparams: readonly [
				TrustedTimeSource: FabricScopedTrustedTimeSourceStruct, 
			],
			 outputparams: readonly []
            }
		SetTimeZone?: {
			inputparams: readonly [
				TimeZone: readonly TimeZoneStruct[], 
			],
			 outputparams: readonly [
				DSTOffsetRequired: boolean, ]
            }
		SetDSTOffset?: {
			inputparams: readonly [
				DSTOffset: readonly DSTOffsetStruct[], 
			],
			 outputparams: readonly []
            }
		SetDefaultNTP?: {
			inputparams: readonly [
				DefaultNTP: string, 
			],
			 outputparams: readonly []
            }
}
	events: {
		DSTTableEmpty: [
			];
		DSTStatus: [
			
			DSTOffsetActive: boolean, ];
		TimeZoneStatus: [
			
			Offset: number, 
			Name: string, ];
		TimeFailure: [
			];
		MissingTrustedTimeSource: [
			];
	}
}

export const timeSynchronization: ClusterDefinition<TimeSynchronization> = {
id: 0x0038,
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
	] as const
}

export default timeSynchronization;