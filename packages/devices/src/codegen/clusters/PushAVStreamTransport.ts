// This file is generated from PushAVStreamTransport.xml - do not edit it directly
// Generated on 2025-12-22T10:19:41.267Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export type PushTransportConnectionID = number;


export enum CMAFInterfaceEnum {
	Interface1 = 0,
	Interface2DASH = 1,
	Interface2HLS = 2,
}

export enum ContainerFormatEnum {
	CMAF = 0,
}

export enum IngestMethodsEnum {
	CMAFIngest = 0,
}

export enum StatusCodeEnum {
	InvalidTLSEndpoint = 2,
	InvalidStream = 3,
	InvalidURL = 4,
	InvalidZone = 5,
	InvalidCombination = 6,
	InvalidTriggerType = 7,
	InvalidTransportStatus = 8,
	InvalidOptions = 9,
	InvalidStreamUsage = 10,
	InvalidTime = 11,
}

export enum TransportStatusEnum {
	Active = 0,
	Inactive = 1,
}

export enum TransportTriggerTypeEnum {
	Command = 0,
	Motion = 1,
	Continuous = 2,
}

export enum TriggerActivationReasonEnum {
	UserInitiated = 0,
	Automation = 1,
	Emergency = 2,
}

export interface CMAFContainerOptionsStruct {
	CMAFInterface:CMAFInterfaceEnum,
	SegmentDuration:number,
	ChunkDuration:number,
	SessionGroup:number,
	TrackName:string,
	CENCKey?:import ("@akala/core").IsomorphicBuffer,
	CENCKeyID?:import ("@akala/core").IsomorphicBuffer,
	MetadataEnabled?:boolean,
}

export interface ContainerOptionsStruct {
	ContainerType:ContainerFormatEnum,
	CMAFContainerOptions?:CMAFContainerOptionsStruct,
}

export interface SupportedFormatStruct {
	ContainerFormat:ContainerFormatEnum,
	IngestMethod:IngestMethodsEnum,
}

export interface TransportConfigurationStruct {
	ConnectionID:PushTransportConnectionID,
	TransportStatus:TransportStatusEnum,
	TransportOptions?:TransportOptionsStruct,
}

export interface TransportMotionTriggerTimeControlStruct {
	InitialDuration:number,
	AugmentationDuration:number,
	MaxDuration:number,
	BlindDuration:number,
}

export interface TransportOptionsStruct {
	StreamUsage:import("./global-Enums.js").StreamUsageEnum,
	VideoStreamID?:import("./CameraAVStreamManagement.js").VideoStreamID,
	AudioStreamID?:import("./CameraAVStreamManagement.js").AudioStreamID,
	TLSEndpointID:import("./TLSClientManagement.js").TLSEndpointID,
	URL:string,
	TriggerOptions:TransportTriggerOptionsStruct,
	IngestMethod:IngestMethodsEnum,
	ContainerOptions:ContainerOptionsStruct,
	ExpiryTime?:number,
}

export interface TransportTriggerOptionsStruct {
	TriggerType:TransportTriggerTypeEnum,
	MotionZones?:readonly TransportZoneOptionsStruct[],
	MotionSensitivity?:number,
	MotionTimeControl?:TransportMotionTriggerTimeControlStruct,
	MaxPreRollLen?:number,
}

export interface TransportZoneOptionsStruct {
	Zone:import("./ZoneManagement.js").ZoneID,
	Sensitivity?:number,
}

export type PushAVStreamTransport = PushAVStreamTransportCluster & { id: 0x0555};

export interface PushAVStreamTransportCluster {
id: 0x0555;
	attributes: {
		readonly SupportedFormats:readonly SupportedFormatStruct[]
		readonly CurrentConnections:readonly TransportConfigurationStruct[]
		/** Supports a sensitivity value per Zone */
		readonly SupportsPerZoneSensitivity: boolean
		/** Supports metadata transmission in Push transports */
		readonly SupportsMetadata: boolean
}
	commands: {
		AllocatePushTransport: {
			inputparams: readonly [
				TransportOptions: TransportOptionsStruct, 
			],
			 outputparams: readonly [
				TransportConfiguration: TransportConfigurationStruct, ]
            }
		DeallocatePushTransport: {
			inputparams: readonly [
				ConnectionID: PushTransportConnectionID, 
			],
			 outputparams: readonly []
            }
		ModifyPushTransport: {
			inputparams: readonly [
				ConnectionID: PushTransportConnectionID, 
				TransportOptions: TransportOptionsStruct, 
			],
			 outputparams: readonly []
            }
		SetTransportStatus: {
			inputparams: readonly [
				ConnectionID: PushTransportConnectionID, 
				TransportStatus: TransportStatusEnum, 
			],
			 outputparams: readonly []
            }
		ManuallyTriggerTransport: {
			inputparams: readonly [
				ConnectionID: PushTransportConnectionID, 
				ActivationReason: TriggerActivationReasonEnum, 
				TimeControl: TransportMotionTriggerTimeControlStruct, 
				UserDefined: import ("@akala/core").IsomorphicBuffer, 
			],
			 outputparams: readonly []
            }
		FindTransport: {
			inputparams: readonly [
				ConnectionID: PushTransportConnectionID, 
			],
			 outputparams: readonly [
				TransportConfigurations: readonly TransportConfigurationStruct[], ]
            }
}
	events: {
		PushTransportBegin: [
			
			ConnectionID: PushTransportConnectionID, 
			TriggerType: TransportTriggerTypeEnum, 
			ActivationReason: TriggerActivationReasonEnum, ];
		PushTransportEnd: [
			
			ConnectionID: PushTransportConnectionID, ];
	}
}

export const pushAVStreamTransport: ClusterDefinition<PushAVStreamTransport> = {
id: 0x0555,
	attributes: [
		"SupportedFormats",
		"CurrentConnections",
		"SupportsPerZoneSensitivity",
		"SupportsMetadata",
	] as const,
	commands: [
		"AllocatePushTransport",
		"DeallocatePushTransport",
		"ModifyPushTransport",
		"SetTransportStatus",
		"ManuallyTriggerTransport",
		"FindTransport",
	] as const,
	events: [
	] as const
}

export default pushAVStreamTransport;