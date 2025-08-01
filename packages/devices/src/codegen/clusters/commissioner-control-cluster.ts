

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
				RequestID:  bigint, 
				VendorID:  number, 
				ProductID:  number, 
				Label:  string, 
			],
			 outputparams: readonly []
            }
		/** This command is sent by a client to request that the server begins commissioning a previously approved request. */
		CommissionNode: {
			inputparams: readonly [
				RequestID:  bigint, 
				ResponseTimeoutSeconds:  number, 
			],
			 outputparams: readonly [
				CommissioningTimeout:  number, 
				PAKEPasscodeVerifier: import ("@akala/core").IsomorphicBuffer, 
				Discriminator:  number, 
				Iterations:  number, 
				Salt: import ("@akala/core").IsomorphicBuffer, ]
            }
}
	events: {
		CommissioningRequestResult: [
			
			RequestID:  bigint, 
			ClientNodeID:  string, 
			StatusCode:  number, ];
	}
}