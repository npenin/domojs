// This file is generated from webrtc-provider-cluster.xml - do not edit it directly
// Generated on 2025-08-15T06:41:49.115Z

import { Cluster } from '../../server/clients/shared.js';


/**
 * The WebRTC transport provider cluster provides a way for stream providers (e.g. Cameras) to stream or receive their data through WebRTC.
 */

export interface WebRTCTransportProvider {
id: 1363;
	attributes: {
		readonly CurrentSessions:readonly import("./global-structs.js").WebRTCSessionStruct[]
		/** Supports metadata transmission in WebRTC sessions */
		readonly SupportsMetadata: boolean
}
	commands: {
		/** Requests that the Provider initiates a new session with the Offer / Answer flow in a way that allows for options to be passed and work with devices needing the standby flow. */
		SolicitOffer: {
			inputparams: readonly [
				StreamUsage: import("./global-enums.js").StreamUsageEnum, 
				OriginatingEndpointID: number, 
				VideoStreamID: number, 
				AudioStreamID: number, 
				ICEServers: readonly import("./global-structs.js").ICEServerStruct[][], 
				ICETransportPolicy: string, 
				MetadataEnabled: boolean, 
			],
			 outputparams: readonly [
				WebRTCSessionID: number, 
				DeferredOffer: boolean, 
				VideoStreamID: number, 
				AudioStreamID: number, ]
            }
		/** This command allows an SDP Offer to be set and start a new session. */
		ProvideOffer: {
			inputparams: readonly [
				WebRTCSessionID: number, 
				SDP: string, 
				StreamUsage: import("./global-enums.js").StreamUsageEnum, 
				OriginatingEndpointID: number, 
				VideoStreamID: number, 
				AudioStreamID: number, 
				ICEServers: readonly import("./global-structs.js").ICEServerStruct[][], 
				ICETransportPolicy: string, 
				MetadataEnabled: boolean, 
			],
			 outputparams: readonly [
				WebRTCSessionID: number, 
				VideoStreamID: number, 
				AudioStreamID: number, ]
            }
		/** This command SHALL be initiated from a Node in response to an Offer that was previously received from a remote peer. */
		ProvideAnswer: {
			inputparams: readonly [
				WebRTCSessionID: number, 
				SDP: string, 
			],
			 outputparams: readonly []
            }
		/** This command allows for string based ICE candidates generated after the initial Offer / Answer exchange, via a JSEP onicecandidate event, a DOM rtcpeerconnectioniceevent event, or other WebRTC compliant implementations, to be added to a session during the gathering phase. */
		ProvideICECandidates: {
			inputparams: readonly [
				WebRTCSessionID: number, 
				ICECandidates: readonly import("./global-structs.js").ICECandidateStruct[][], 
			],
			 outputparams: readonly []
            }
		/** This command instructs the stream provider to end the WebRTC session. */
		EndSession: {
			inputparams: readonly [
				WebRTCSessionID: number, 
				Reason: import("./global-enums.js").WebRTCEndReasonEnum, 
			],
			 outputparams: readonly []
            }
}
	events: {
	}
}

export const webRTCTransportProvider: Cluster<WebRTCTransportProvider['attributes'], WebRTCTransportProvider['commands'], WebRTCTransportProvider['events']> = {
id: 1363,
	attributes: {
		CurrentSessions:[],
		/** Supports metadata transmission in WebRTC sessions */
	SupportsMetadata: false,
},
	commands: {
		/** Requests that the Provider initiates a new session with the Offer / Answer flow in a way that allows for options to be passed and work with devices needing the standby flow. */
		SolicitOffer: {
			inputparams: [
				null, 
				0, 
				0, 
				0, 
				[], 
				null, 
				null, 
			],
			 outputparams: [
				0, 
				null, 
				0, 
				0, ]
            },
		/** This command allows an SDP Offer to be set and start a new session. */
		ProvideOffer: {
			inputparams: [
				0, 
				null, 
				null, 
				0, 
				0, 
				0, 
				[], 
				null, 
				null, 
			],
			 outputparams: [
				0, 
				0, 
				0, ]
            },
		/** This command SHALL be initiated from a Node in response to an Offer that was previously received from a remote peer. */
		ProvideAnswer: {
			inputparams: [
				0, 
				null, 
			],
			 outputparams: []
            },
		/** This command allows for string based ICE candidates generated after the initial Offer / Answer exchange, via a JSEP onicecandidate event, a DOM rtcpeerconnectioniceevent event, or other WebRTC compliant implementations, to be added to a session during the gathering phase. */
		ProvideICECandidates: {
			inputparams: [
				0, 
				[], 
			],
			 outputparams: []
            },
		/** This command instructs the stream provider to end the WebRTC session. */
		EndSession: {
			inputparams: [
				0, 
				null, 
			],
			 outputparams: []
            },
},
	events: {
	}
}

export default webRTCTransportProvider;