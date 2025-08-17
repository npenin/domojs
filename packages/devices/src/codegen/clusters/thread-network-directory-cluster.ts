// This file is generated from thread-network-directory-cluster.xml - do not edit it directly
// Generated on 2025-08-17T14:20:46.917Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export interface ThreadNetworkStruct {
	ExtendedPanID:import ("@akala/core").IsomorphicBuffer,
	NetworkName:string,
	Channel:number,
	ActiveTimestamp:bigint,
}

/**
 * Manages the names and credentials of Thread networks visible to the user.
 */

export interface ThreadNetworkDirectory {
id: 1107;
	attributes: {
		PreferredExtendedPanID?:import ("@akala/core").IsomorphicBuffer
		readonly ThreadNetworks:readonly ThreadNetworkStruct[]
		readonly ThreadNetworkTableSize:number
}
	commands: {
		/** Adds an entry to the ThreadNetworks attribute with the specified Thread Operational Dataset. */
		AddNetwork: {
			inputparams: readonly [
				OperationalDataset: import ("@akala/core").IsomorphicBuffer, 
			],
			 outputparams: readonly []
            }
		/** Removes the network with the given Extended PAN ID from the ThreadNetworks attribute. */
		RemoveNetwork: {
			inputparams: readonly [
				ExtendedPanID: import ("@akala/core").IsomorphicBuffer, 
			],
			 outputparams: readonly []
            }
		/** Retrieves the Thread Operational Dataset with the given Extended PAN ID. */
		GetOperationalDataset: {
			inputparams: readonly [
				ExtendedPanID: import ("@akala/core").IsomorphicBuffer, 
			],
			 outputparams: readonly [
				OperationalDataset: import ("@akala/core").IsomorphicBuffer, ]
            }
}
	events: {
	}
}

export const threadNetworkDirectory: ClusterDefinition<ThreadNetworkDirectory> = {
id: 1107,
	attributes: [
		"PreferredExtendedPanID",
		"ThreadNetworks",
		"ThreadNetworkTableSize",
	] as const,
	commands: [
		"AddNetwork",
		"RemoveNetwork",
		"GetOperationalDataset",
	] as const,
	events: [
	] as const
}

export default threadNetworkDirectory;