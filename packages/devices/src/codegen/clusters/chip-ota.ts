// This file is generated from chip-ota.xml - do not edit it directly
// Generated on 2025-12-03T20:57:10.275Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum StatusEnum {
	UpdateAvailable= 0,
	Busy= 1,
	NotAvailable= 2,
	DownloadProtocolNotSupported= 3,
}

export enum ApplyUpdateActionEnum {
	Proceed= 0,
	AwaitNextAction= 1,
	Discontinue= 2,
}

export enum DownloadProtocolEnum {
	BDXSynchronous= 0,
	BDXAsynchronous= 1,
	HTTPS= 2,
	VendorSpecific= 3,
}

export enum AnnouncementReasonEnum {
	SimpleAnnouncement= 0,
	UpdateAvailable= 1,
	UrgentUpdateAvailable= 2,
}

export enum UpdateStateEnum {
	Unknown= 0,
	Idle= 1,
	Querying= 2,
	DelayedOnQuery= 3,
	Downloading= 4,
	Applying= 5,
	DelayedOnApply= 6,
	RollingBack= 7,
	DelayedOnUserConsent= 8,
}

export enum ChangeReasonEnum {
	Unknown= 0,
	Success= 1,
	Failure= 2,
	TimeOut= 3,
	DelayByProvider= 4,
}

export interface ProviderLocation {
	ProviderNodeID:string,
	Endpoint:number,
}

/**
 * Provides an interface for providing OTA software updates
 */

export interface OTASoftwareUpdateProvider {
id: 41;
	attributes: {
}
	commands: {
		/** Determine availability of a new Software Image */
		QueryImage: {
			inputparams: readonly [
				VendorID: number, 
				ProductID: number, 
				SoftwareVersion: number, 
				ProtocolsSupported: readonly DownloadProtocolEnum[], 
				HardwareVersion: number, 
				Location: string, 
				RequestorCanConsent: boolean, 
				MetadataForProvider: import ("@akala/core").IsomorphicBuffer, 
			],
			 outputparams: readonly [
				Status: StatusEnum, 
				DelayedActionTime: number, 
				ImageURI: string, 
				SoftwareVersion: number, 
				SoftwareVersionString: string, 
				UpdateToken: import ("@akala/core").IsomorphicBuffer, 
				UserConsentNeeded: boolean, 
				MetadataForRequestor: import ("@akala/core").IsomorphicBuffer, ]
            }
		/** Determine next action to take for a downloaded Software Image */
		ApplyUpdateRequest: {
			inputparams: readonly [
				UpdateToken: import ("@akala/core").IsomorphicBuffer, 
				NewVersion: number, 
			],
			 outputparams: readonly [
				Action: ApplyUpdateActionEnum, 
				DelayedActionTime: number, ]
            }
		/** Notify OTA Provider that an update was applied */
		NotifyUpdateApplied: {
			inputparams: readonly [
				UpdateToken: import ("@akala/core").IsomorphicBuffer, 
				SoftwareVersion: number, 
			],
			 outputparams: readonly []
            }
}
	events: {
	}
}

export const oTASoftwareUpdateProvider: ClusterDefinition<OTASoftwareUpdateProvider> = {
id: 41,
	attributes: [
	] as const,
	commands: [
		"QueryImage",
		"ApplyUpdateRequest",
		"NotifyUpdateApplied",
	] as const,
	events: [
	] as const
}

/**
 * Provides an interface for downloading and applying OTA software updates
 */

export interface OTASoftwareUpdateRequestor {
id: 42;
	attributes: {
		DefaultOTAProviders?:readonly ProviderLocation[]
		readonly UpdatePossible?:boolean
		readonly UpdateState?:UpdateStateEnum
		readonly UpdateStateProgress?:number
}
	commands: {
		/** Announce the presence of an OTA Provider */
		AnnounceOTAProvider?: {
			inputparams: readonly [
				ProviderNodeID: string, 
				VendorID: number, 
				AnnouncementReason: AnnouncementReasonEnum, 
				MetadataForNode: import ("@akala/core").IsomorphicBuffer, 
				Endpoint: number, 
			],
			 outputparams: readonly []
            }
}
	events: {
		StateTransition: [
			
			PreviousState: UpdateStateEnum, 
			NewState: UpdateStateEnum, 
			Reason: ChangeReasonEnum, 
			TargetSoftwareVersion: number, ];
		VersionApplied: [
			
			SoftwareVersion: number, 
			ProductID: number, ];
		DownloadError: [
			
			SoftwareVersion: number, 
			BytesDownloaded: bigint, 
			ProgressPercent: number, 
			PlatformCode: bigint, ];
	}
}

export const oTASoftwareUpdateRequestor: ClusterDefinition<OTASoftwareUpdateRequestor> = {
id: 42,
	attributes: [
		"DefaultOTAProviders",
		"UpdatePossible",
		"UpdateState",
		"UpdateStateProgress",
	] as const,
	commands: [
		"AnnounceOTAProvider",
	] as const,
	events: [
		"StateTransition",
		"VersionApplied",
		"DownloadError",
	] as const
}