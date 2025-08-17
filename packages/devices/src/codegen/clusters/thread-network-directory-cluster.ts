// This file is generated from thread-network-directory-cluster.xml - do not edit it directly
// Generated on 2025-08-15T06:41:48.854Z

import { Cluster } from '../../server/clients/shared.js';


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

export const threadNetworkDirectory: Cluster<ThreadNetworkDirectory['attributes'], ThreadNetworkDirectory['commands'], ThreadNetworkDirectory['events']> = {
id: 1107,
	attributes: {
		PreferredExtendedPanID:null,
		ThreadNetworks:[],
		ThreadNetworkTableSize:0,
},
	commands: {
		/** Adds an entry to the ThreadNetworks attribute with the specified Thread Operational Dataset. */
		AddNetwork: {
			inputparams: [
				null, 
			],
			 outputparams: []
            },
		/** Removes the network with the given Extended PAN ID from the ThreadNetworks attribute. */
		RemoveNetwork: {
			inputparams: [
				null, 
			],
			 outputparams: []
            },
		/** Retrieves the Thread Operational Dataset with the given Extended PAN ID. */
		GetOperationalDataset: {
			inputparams: [
				null, 
			],
			 outputparams: [
				null, ]
            },
},
	events: {
	}
}

export default threadNetworkDirectory;