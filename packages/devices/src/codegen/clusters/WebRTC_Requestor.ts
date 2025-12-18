// This file is generated from WebRTC_Requestor.xml - do not edit it directly
// Generated on 2025-12-18T03:05:16.112Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export type WebRTCTransportRequestor = WebRTCTransportRequestorCluster & { id: 0x0554};

export interface WebRTCTransportRequestorCluster {
id: 0x0554;
	attributes: {
		readonly CurrentSessions:readonly import("./global-Structs.js").WebRTCSessionStruct[]
}
	commands: {
		Offer: {
			inputparams: readonly [
				WebRTCSessionID: import("./global-TypeDefs.js").WebRTCSessionID, 
				SDP: string, 
				ICEServers: readonly import("./global-Structs.js").ICEServerStruct[], 
				ICETransportPolicy: string, 
			],
			 outputparams: readonly []
            }
		Answer: {
			inputparams: readonly [
				WebRTCSessionID: import("./global-TypeDefs.js").WebRTCSessionID, 
				SDP: string, 
			],
			 outputparams: readonly []
            }
		ICECandidates: {
			inputparams: readonly [
				WebRTCSessionID: import("./global-TypeDefs.js").WebRTCSessionID, 
				ICECandidates: readonly import("./global-Structs.js").ICECandidateStruct[], 
			],
			 outputparams: readonly []
            }
		End: {
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

export const webRTCTransportRequestor: ClusterDefinition<WebRTCTransportRequestor> = {
id: 0x0554,
	attributes: [
		"CurrentSessions",
	] as const,
	commands: [
		"Offer",
		"Answer",
		"ICECandidates",
		"End",
	] as const,
	events: [
	] as const
}

export default webRTCTransportRequestor;