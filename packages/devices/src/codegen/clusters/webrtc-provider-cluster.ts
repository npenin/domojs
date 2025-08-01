

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
				OriginatingEndpointID:  number, 
				VideoStreamID:  number, 
				AudioStreamID:  number, 
				ICEServers: import("./global-structs.js").ICEServerStruct[], 
				ICETransportPolicy:  string, 
				MetadataEnabled: boolean, 
			],
			 outputparams: readonly [
				WebRTCSessionID:  number, 
				DeferredOffer: boolean, 
				VideoStreamID:  number, 
				AudioStreamID:  number, ]
            }
		/** This command allows an SDP Offer to be set and start a new session. */
		ProvideOffer: {
			inputparams: readonly [
				WebRTCSessionID:  number, 
				SDP:  string, 
				StreamUsage: import("./global-enums.js").StreamUsageEnum, 
				OriginatingEndpointID:  number, 
				VideoStreamID:  number, 
				AudioStreamID:  number, 
				ICEServers: import("./global-structs.js").ICEServerStruct[], 
				ICETransportPolicy:  string, 
				MetadataEnabled: boolean, 
			],
			 outputparams: readonly [
				WebRTCSessionID:  number, 
				VideoStreamID:  number, 
				AudioStreamID:  number, ]
            }
		/** This command SHALL be initiated from a Node in response to an Offer that was previously received from a remote peer. */
		ProvideAnswer: {
			inputparams: readonly [
				WebRTCSessionID:  number, 
				SDP:  string, 
			],
			 outputparams: readonly []
            }
		/** This command allows for string based https://rfc-editor.org/rfc/rfc8839#section-5.1 generated after the initial Offer / Answer exchange, via a JSEP https://datatracker.ietf.org/doc/html/rfc9429#section-4.1.20 event, a DOM https://www.w3.org/TR/webrtc/#dom-rtcpeerconnectioniceevent event, or other WebRTC compliant implementations, to be added to a session during the gathering phase. */
		ProvideICECandidates: {
			inputparams: readonly [
				WebRTCSessionID:  number, 
				ICECandidates: import("./global-structs.js").ICECandidateStruct[], 
			],
			 outputparams: readonly []
            }
		/** This command instructs the stream provider to end the WebRTC session. */
		EndSession: {
			inputparams: readonly [
				WebRTCSessionID:  number, 
				Reason: import("./global-enums.js").WebRTCEndReasonEnum, 
			],
			 outputparams: readonly []
            }
}
	events: {
	}
}