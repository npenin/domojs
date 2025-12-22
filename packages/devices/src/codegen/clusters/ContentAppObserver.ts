// This file is generated from ContentAppObserver.xml - do not edit it directly
// Generated on 2025-12-22T10:25:59.433Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum StatusEnum {
	Success = 0,
	UnexpectedData = 1,
}

export type ContentAppObserver = ContentAppObserverCluster & { id: 0x0510};

export interface ContentAppObserverCluster {
id: 0x0510;
	attributes: {
}
	commands: {
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
id: 0x0510,
	attributes: [
	] as const,
	commands: [
		"ContentAppMessage",
	] as const,
	events: [
	] as const
}

export default contentAppObserver;