// This file is generated from commissioner-control-cluster.xml - do not edit it directly
// Generated on 2025-08-15T06:41:46.314Z

import { Cluster } from '../../server/clients/shared.js';


export enum SupportedDeviceCategoryBitmap {
	FabricSynchronization= 0x1,
}

/**
 * Supports the ability for clients to request the commissioning of themselves or other nodes onto a fabric which the cluster server can commission onto.
 */

export interface CommissionerControl {
id: 1873;
	attributes: {
		readonly SupportedDeviceCategories:SupportedDeviceCategoryBitmap
}
	commands: {
		/** This command is sent by a client to request approval for a future CommissionNode call. */
		RequestCommissioningApproval: {
			inputparams: readonly [
				RequestID: bigint, 
				VendorID: number, 
				ProductID: number, 
				Label: string, 
			],
			 outputparams: readonly []
            }
		/** This command is sent by a client to request that the server begins commissioning a previously approved request. */
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

export const commissionerControl: Cluster<CommissionerControl['attributes'], CommissionerControl['commands'], CommissionerControl['events']> = {
id: 1873,
	attributes: {
		SupportedDeviceCategories:null,
},
	commands: {
		/** This command is sent by a client to request approval for a future CommissionNode call. */
		RequestCommissioningApproval: {
			inputparams: [
				null, 
				0, 
				0, 
				null, 
			],
			 outputparams: []
            },
		/** This command is sent by a client to request that the server begins commissioning a previously approved request. */
		CommissionNode: {
			inputparams: [
				null, 
				0, 
			],
			 outputparams: [
				0, 
				null, 
				0, 
				0, 
				null, ]
            },
},
	events: {
		CommissioningRequestResult: [
			
			null, 
			null, 
			0, ],
	}
}

export default commissionerControl;