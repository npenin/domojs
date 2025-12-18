// This file is generated from CommissionerControlCluster.xml - do not edit it directly
// Generated on 2025-12-18T03:04:58.351Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum SupportedDeviceCategoryBitmap {
	__NotSet = 0,
		/** Aggregators which support Fabric Synchronization may be commissioned. */
	FabricSynchronization= 1<<0,
}

export type CommissionerControl = CommissionerControlCluster & { id: 0x0751};

export interface CommissionerControlCluster {
id: 0x0751;
	attributes: {
		readonly SupportedDeviceCategories:SupportedDeviceCategoryBitmap
}
	commands: {
		RequestCommissioningApproval: {
			inputparams: readonly [
				RequestID: bigint, 
				VendorID: number, 
				ProductID: number, 
				Label: string, 
			],
			 outputparams: readonly []
            }
		CommissionNode: {
			inputparams: readonly [
				RequestID: bigint, 
				ResponseTimeoutSeconds: number, 
			],
			 outputparams: readonly [
				CommissioningTimeout: number, 
				PAKEPasscodeVerifier: import ("@akala/core").IsomorphicBuffer, 
				Discriminator: number, 
				Iterations: number, 
				Salt: import ("@akala/core").IsomorphicBuffer, ]
            }
}
	events: {
		CommissioningRequestResult: [
			
			RequestID: bigint, 
			ClientNodeID: string, 
			StatusCode: number, ];
	}
}

export const commissionerControl: ClusterDefinition<CommissionerControl> = {
id: 0x0751,
	attributes: [
		"SupportedDeviceCategories",
	] as const,
	commands: [
		"RequestCommissioningApproval",
		"CommissionNode",
	] as const,
	events: [
	] as const
}

export default commissionerControl;