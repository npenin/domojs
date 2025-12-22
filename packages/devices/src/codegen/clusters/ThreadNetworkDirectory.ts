// This file is generated from ThreadNetworkDirectory.xml - do not edit it directly
// Generated on 2025-12-22T10:19:44.108Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export interface ThreadNetworkStruct {
	ExtendedPanID:import ("@akala/core").IsomorphicBuffer,
	NetworkName:string,
	Channel:number,
	ActiveTimestamp:bigint,
}

export type ThreadNetworkDirectory = ThreadNetworkDirectoryCluster & { id: 0x0453};

export interface ThreadNetworkDirectoryCluster {
id: 0x0453;
	attributes: {
		readonly PreferredExtendedPanID:import ("@akala/core").IsomorphicBuffer
		readonly ThreadNetworks:readonly ThreadNetworkStruct[]
		readonly ThreadNetworkTableSize:number
}
	commands: {
		AddNetwork: {
			inputparams: readonly [
				OperationalDataset: import ("@akala/core").IsomorphicBuffer, 
			],
			 outputparams: readonly []
            }
		RemoveNetwork: {
			inputparams: readonly [
				ExtendedPanID: import ("@akala/core").IsomorphicBuffer, 
			],
			 outputparams: readonly []
            }
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
id: 0x0453,
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