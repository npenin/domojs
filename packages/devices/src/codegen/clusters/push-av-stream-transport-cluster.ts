// This file is generated from push-av-stream-transport-cluster.xml - do not edit it directly
// Generated on 2025-12-03T20:57:12.057Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum CMAFInterfaceEnum {
	Interface1= 0,
	Interface2DASH= 1,
	Interface2HLS= 2,
}

export enum ContainerFormatEnum {
	CMAF= 0,
}

export enum IngestMethodsEnum {
	CMAFIngest= 0,
}

export enum StatusCodeEnum {
	InvalidTLSEndpoint= 2,
	InvalidStream= 3,
	InvalidURL= 4,
	InvalidZone= 5,
	InvalidCombination= 6,
	InvalidTriggerType= 7,
	InvalidTransportStatus= 8,
	InvalidOptions= 9,
	InvalidStreamUsage= 10,
	InvalidTime= 11,
}

export enum TransportStatusEnum {
	Active= 0,
	Inactive= 1,
}

export enum TransportTriggerTypeEnum {
	Command= 0,
	Motion= 1,
	Continuous= 2,
}

export enum TriggerActivationReasonEnum {
	UserInitiated= 0,
	Automation= 1,
	Emergency= 2,
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
	ConnectionID:number,
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
	StreamUsage:import("./global-enums.js").StreamUsageEnum,
	VideoStreamID?:number,
	AudioStreamID?:number,
	TLSEndpointID:number,
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
	Zone:number,
	Sensitivity?:number,
}

/**
 * This cluster implements the upload of Audio and Video streams from the Push AV Stream Transport Cluster using suitable push-based transports.
 */

export interface PushAVStreamTransport {
id: 1365;
	attributes: {
		readonly SupportedFormats:readonly SupportedFormatStruct[]
		readonly CurrentConnections:readonly TransportConfigurationStruct[]
		/** Supports a sensitivity value per Zone */
		readonly SupportsPerZoneSensitivity: boolean
		/** Supports metadata transmission in Push transports */
		readonly SupportsMetadata: boolean
}
	commands: {
		/** This command SHALL allocate a transport and return a PushTransportConnectionID. */
		AllocatePushTransport: {
			inputparams: readonly [
				TransportOptions: TransportOptionsStruct, 
			],
			 outputparams: readonly [
				TransportConfiguration: TransportConfigurationStruct, ]
            }
		/** This command SHALL be generated to request the Node deallocates the specified transport. */
		DeallocatePushTransport: {
			inputparams: readonly [
				ConnectionID: number, 
			],
			 outputparams: readonly []
            }
		/** This command is used to request the Node modifies the configuration of the specified push transport. */
		ModifyPushTransport: {
			inputparams: readonly [
				ConnectionID: number, 
				TransportOptions: TransportOptionsStruct, 
			],
			 outputparams: readonly []
            }
		/** This command SHALL be generated to request the Node modifies the Transport Status of a specified transport or all transports. */
		SetTransportStatus: {
			inputparams: readonly [
				ConnectionID: number, 
				TransportStatus: TransportStatusEnum, 
			],
			 outputparams: readonly []
            }
		/** This command SHALL be generated to request the Node to manually start the specified push transport. */
		ManuallyTriggerTransport: {
			inputparams: readonly [
				ConnectionID: number, 
				ActivationReason: TriggerActivationReasonEnum, 
				TimeControl: TransportMotionTriggerTimeControlStruct, 
				UserDefined: import ("@akala/core").IsomorphicBuffer, 
			],
			 outputparams: readonly []
            }
		/** This command SHALL return the Transport Configuration for the specified push transport or all allocated transports for the fabric if null. */
		FindTransport: {
			inputparams: readonly [
				ConnectionID: number, 
			],
			 outputparams: readonly [
				TransportConfigurations: readonly TransportConfigurationStruct[], ]
            }
}
	events: {
		PushTransportBegin: [
			
			ConnectionID: number, 
			TriggerType: TransportTriggerTypeEnum, 
			ActivationReason: TriggerActivationReasonEnum, ];
		PushTransportEnd: [
			
			ConnectionID: number, ];
	}
}

export const pushAVStreamTransport: ClusterDefinition<PushAVStreamTransport> = {
id: 1365,
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
		"PushTransportBegin",
		"PushTransportEnd",
	] as const
}

export default pushAVStreamTransport;