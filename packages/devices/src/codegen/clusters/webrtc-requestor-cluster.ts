

/**
 * The WebRTC transport requestor cluster provides a way for stream consumers (e.g. Matter Stream Viewer) to establish a WebRTC connection with a stream provider.
 */

export interface WebRTCTransportRequestor {
id: 1364;
	attributes: {
		readonly CurrentSessions:readonly import("./global-structs.js").WebRTCSessionStruct[]
}
	commands: {
		/** This command provides the stream requestor with WebRTC session details. */
		Offer: {
			inputparams: readonly [
				WebRTCSessionID:  number, 
				SDP:  string, 
				ICEServers: import("./global-structs.js").ICEServerStruct[], 
				ICETransportPolicy:  string, 
			],
			 outputparams: readonly []
            }
		/** This command provides the stream requestor with the WebRTC session details (i.e. Session ID and SDP answer), It is the next command in the Offer/Answer flow to the ProvideOffer command. */
		Answer: {
			inputparams: readonly [
				WebRTCSessionID:  number, 
				SDP:  string, 
			],
			 outputparams: readonly []
            }
		/** This command allows for the object based https://rfc-editor.org/rfc/rfc8839#section-5.1 generated after the initial Offer / Answer exchange, via a JSEP https://datatracker.ietf.org/doc/html/rfc9429#section-4.1.20 event, a DOM https://www.w3.org/TR/webrtc/#dom-rtcpeerconnectioniceevent event, or other WebRTC compliant implementations, to be added to a session during the gathering phase. */
		ICECandidates: {
			inputparams: readonly [
				WebRTCSessionID:  number, 
				ICECandidates: import("./global-structs.js").ICECandidateStruct[], 
			],
			 outputparams: readonly []
            }
		/** This command notifies the stream requestor that the provider has ended the WebRTC session. */
		End: {
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