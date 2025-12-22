// This file is generated from OTARequestor.xml - do not edit it directly
// Generated on 2025-12-22T10:19:38.812Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum AnnouncementReasonEnum {
	SimpleAnnouncement = 0,
	UpdateAvailable = 1,
	UrgentUpdateAvailable = 2,
}

export enum ChangeReasonEnum {
	Unknown = 0,
	Success = 1,
	Failure = 2,
	TimeOut = 3,
	DelayByProvider = 4,
}

export enum UpdateStateEnum {
	Unknown = 0,
	Idle = 1,
	Querying = 2,
	DelayedOnQuery = 3,
	Downloading = 4,
	Applying = 5,
	DelayedOnApply = 6,
	RollingBack = 7,
	DelayedOnUserConsent = 8,
}

export interface ProviderLocation {
	ProviderNodeID:string,
	Endpoint:number,
}

export type OTASoftwareUpdateRequestor = OTASoftwareUpdateRequestorCluster & { id: 0x002A};

export interface OTASoftwareUpdateRequestorCluster {
id: 0x002A;
	attributes: {
		readonly DefaultOTAProviders:readonly ProviderLocation[]
		readonly UpdatePossible:boolean
		readonly UpdateState:UpdateStateEnum
		readonly UpdateStateProgress:number
}
	commands: {
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
id: 0x002A,
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
	] as const
}

export default oTASoftwareUpdateRequestor;