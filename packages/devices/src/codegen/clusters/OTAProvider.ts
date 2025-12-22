// This file is generated from OTAProvider.xml - do not edit it directly
// Generated on 2025-12-22T10:19:38.637Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum ApplyUpdateActionEnum {
	Proceed = 0,
	AwaitNextAction = 1,
	Discontinue = 2,
}

export enum DownloadProtocolEnum {
	BDXSynchronous = 0,
	BDXAsynchronous = 1,
	HTTPS = 2,
	VendorSpecific = 3,
}

export enum StatusEnum {
	UpdateAvailable = 0,
	Busy = 1,
	NotAvailable = 2,
	DownloadProtocolNotSupported = 3,
}

export type OTASoftwareUpdateProvider = OTASoftwareUpdateProviderCluster & { id: 0x0029};

export interface OTASoftwareUpdateProviderCluster {
id: 0x0029;
	attributes: {
}
	commands: {
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
		ApplyUpdateRequest: {
			inputparams: readonly [
				UpdateToken: import ("@akala/core").IsomorphicBuffer, 
				NewVersion: number, 
			],
			 outputparams: readonly [
				Action: ApplyUpdateActionEnum, 
				DelayedActionTime: number, ]
            }
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
id: 0x0029,
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

export default oTASoftwareUpdateProvider;