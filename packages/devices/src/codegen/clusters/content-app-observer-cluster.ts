// This file is generated from content-app-observer-cluster.xml - do not edit it directly
// Generated on 2025-08-17T14:20:45.097Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum StatusEnum {
	Success= 0,
	UnexpectedData= 1,
}

/**
 * This cluster provides an interface for sending targeted commands to an Observer of a Content App on a Video Player device such as a Streaming Media Player, Smart TV or Smart Screen. The cluster server for Content App Observer is implemented by an endpoint that communicates with a Content App, such as a Casting Video Client. The cluster client for Content App Observer is implemented by a Content App endpoint. A Content App is informed of the NodeId of an Observer when a binding is set on the Content App. The Content App can then send the ContentAppMessage to the Observer (server cluster), and the Observer responds with a ContentAppMessageResponse.
 */

export interface ContentAppObserver {
id: 1296;
	attributes: {
}
	commands: {
		/** Upon receipt, the data field MAY be parsed and interpreted. Message encoding is specific to the Content App. A Content App MAY when possible read attributes from the Basic Information Cluster on the Observer and use this to determine the Message encoding. */
		ContentAppMessage: {
			inputparams: readonly [
				Data: string, 
				EncodingHint: string, 
			],
			 outputparams: readonly [
				Status: StatusEnum, 
				Data: string, 
				EncodingHint: string, ]
            }
}
	events: {
	}
}

export const contentAppObserver: ClusterDefinition<ContentAppObserver> = {
id: 1296,
	attributes: [
	] as const,
	commands: [
		"ContentAppMessage",
	] as const,
	events: [
	] as const
}

export default contentAppObserver;