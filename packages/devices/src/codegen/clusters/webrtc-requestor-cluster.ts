// This file is generated from webrtc-requestor-cluster.xml - do not edit it directly
// Generated on 2025-08-15T06:41:49.133Z

import { Cluster } from '../../server/clients/shared.js';


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
				WebRTCSessionID: number, 
				SDP: string, 
				ICEServers: readonly import("./global-structs.js").ICEServerStruct[][], 
				ICETransportPolicy: string, 
			],
			 outputparams: readonly []
            }
		/** This command provides the stream requestor with the WebRTC session details (i.e. Session ID and SDP answer), It is the next command in the Offer/Answer flow to the ProvideOffer command. */
		Answer: {
			inputparams: readonly [
				WebRTCSessionID: number, 
				SDP: string, 
			],
			 outputparams: readonly []
            }
		/** This command allows for the object based ICE candidates generated after the initial Offer / Answer exchange, via a JSEP onicecandidate event, a DOM rtcpeerconnectioniceevent event, or other WebRTC compliant implementations, to be added to a session during the gathering phase. */
		ICECandidates: {
			inputparams: readonly [
				WebRTCSessionID: number, 
				ICECandidates: readonly import("./global-structs.js").ICECandidateStruct[][], 
			],
			 outputparams: readonly []
            }
		/** This command notifies the stream requestor that the provider has ended the WebRTC session. */
		End: {
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

export const webRTCTransportRequestor: Cluster<WebRTCTransportRequestor['attributes'], WebRTCTransportRequestor['commands'], WebRTCTransportRequestor['events']> = {
id: 1364,
	attributes: {
		CurrentSessions:[],
},
	commands: {
		/** This command provides the stream requestor with WebRTC session details. */
		Offer: {
			inputparams: [
				0, 
				null, 
				[], 
				null, 
			],
			 outputparams: []
            },
		/** This command provides the stream requestor with the WebRTC session details (i.e. Session ID and SDP answer), It is the next command in the Offer/Answer flow to the ProvideOffer command. */
		Answer: {
			inputparams: [
				0, 
				null, 
			],
			 outputparams: []
            },
		/** This command allows for the object based ICE candidates generated after the initial Offer / Answer exchange, via a JSEP onicecandidate event, a DOM rtcpeerconnectioniceevent event, or other WebRTC compliant implementations, to be added to a session during the gathering phase. */
		ICECandidates: {
			inputparams: [
				0, 
				[], 
			],
			 outputparams: []
            },
		/** This command notifies the stream requestor that the provider has ended the WebRTC session. */
		End: {
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

export default webRTCTransportRequestor;