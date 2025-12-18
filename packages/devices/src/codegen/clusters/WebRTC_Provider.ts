// This file is generated from WebRTC_Provider.xml - do not edit it directly
// Generated on 2025-12-18T03:05:15.934Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export interface SFrameStruct {
	CipherSuite:number,
	BaseKey:import ("@akala/core").IsomorphicBuffer,
	KID:import ("@akala/core").IsomorphicBuffer,
}

export type WebRTCTransportProvider = WebRTCTransportProviderCluster & { id: 0x0553};

export interface WebRTCTransportProviderCluster {
id: 0x0553;
	attributes: {
		readonly CurrentSessions:readonly import("./global-Structs.js").WebRTCSessionStruct[]
		/** Supports metadata transmission in WebRTC sessions */
		readonly SupportsMetadata: boolean
}
	commands: {
		SolicitOffer: {
			inputparams: readonly [
				StreamUsage: import("./global-Enums.js").StreamUsageEnum, 
				OriginatingEndpointID: number, 
				VideoStreamID: import("./CameraAVStreamManagement.js").VideoStreamID, 
				AudioStreamID: import("./CameraAVStreamManagement.js").AudioStreamID, 
				ICEServers: readonly import("./global-Structs.js").ICEServerStruct[], 
				ICETransportPolicy: string, 
				MetadataEnabled: boolean, 
				SFrameConfig: SFrameStruct, 
			],
			 outputparams: readonly [
				WebRTCSessionID: import("./global-TypeDefs.js").WebRTCSessionID, 
				DeferredOffer: boolean, 
				VideoStreamID: import("./CameraAVStreamManagement.js").VideoStreamID, 
				AudioStreamID: import("./CameraAVStreamManagement.js").AudioStreamID, ]
            }
		ProvideOffer: {
			inputparams: readonly [
				WebRTCSessionID: import("./global-TypeDefs.js").WebRTCSessionID, 
				SDP: string, 
				StreamUsage: import("./global-Enums.js").StreamUsageEnum, 
				OriginatingEndpointID: number, 
				VideoStreamID: import("./CameraAVStreamManagement.js").VideoStreamID, 
				AudioStreamID: import("./CameraAVStreamManagement.js").AudioStreamID, 
				ICEServers: readonly import("./global-Structs.js").ICEServerStruct[], 
				ICETransportPolicy: string, 
				MetadataEnabled: boolean, 
				SFrameConfig: SFrameStruct, 
			],
			 outputparams: readonly [
				WebRTCSessionID: import("./global-TypeDefs.js").WebRTCSessionID, 
				VideoStreamID: import("./CameraAVStreamManagement.js").VideoStreamID, 
				AudioStreamID: import("./CameraAVStreamManagement.js").AudioStreamID, ]
            }
		ProvideAnswer: {
			inputparams: readonly [
				WebRTCSessionID: import("./global-TypeDefs.js").WebRTCSessionID, 
				SDP: string, 
			],
			 outputparams: readonly []
            }
		ProvideICECandidates: {
			inputparams: readonly [
				WebRTCSessionID: import("./global-TypeDefs.js").WebRTCSessionID, 
				ICECandidates: readonly import("./global-Structs.js").ICECandidateStruct[], 
			],
			 outputparams: readonly []
            }
		EndSession: {
			inputparams: readonly [
				WebRTCSessionID: import("./global-TypeDefs.js").WebRTCSessionID, 
				Reason: import("./global-Enums.js").WebRTCEndReasonEnum, 
			],
			 outputparams: readonly []
            }
}
	events: {
	}
}

export const webRTCTransportProvider: ClusterDefinition<WebRTCTransportProvider> = {
id: 0x0553,
	attributes: [
		"CurrentSessions",
		"SupportsMetadata",
	] as const,
	commands: [
		"SolicitOffer",
		"ProvideOffer",
		"ProvideAnswer",
		"ProvideICECandidates",
		"EndSession",
	] as const,
	events: [
	] as const
}

export default webRTCTransportProvider;