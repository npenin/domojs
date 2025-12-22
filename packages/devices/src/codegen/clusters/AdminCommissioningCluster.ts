// This file is generated from AdminCommissioningCluster.xml - do not edit it directly
// Generated on 2025-12-22T10:25:55.442Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum CommissioningWindowStatusEnum {
	WindowNotOpen = 0,
	EnhancedWindowOpen = 1,
	BasicWindowOpen = 2,
}

export enum StatusCodeEnum {
	Busy = 2,
	PAKEParameterError = 3,
	WindowNotOpen = 4,
}

export type AdministratorCommissioning = AdministratorCommissioningCluster & { id: 0x003C};

export interface AdministratorCommissioningCluster {
id: 0x003C;
	attributes: {
		readonly WindowStatus:CommissioningWindowStatusEnum
		readonly AdminFabricIndex:number
		readonly AdminVendorId:number
		/** Node supports Basic Commissioning Method. */
		readonly SupportsBasic: boolean
}
	commands: {
		OpenCommissioningWindow: {
			inputparams: readonly [
				CommissioningTimeout: number, 
				PAKEPasscodeVerifier: import ("@akala/core").IsomorphicBuffer, 
				Discriminator: number, 
				Iterations: number, 
				Salt: import ("@akala/core").IsomorphicBuffer, 
			],
			 outputparams: readonly []
            }
		OpenBasicCommissioningWindow?: {
			inputparams: readonly [
				CommissioningTimeout: number, 
			],
			 outputparams: readonly []
            }
		RevokeCommissioning: {
			inputparams: readonly [
			],
			 outputparams: readonly []
            }
}
	events: {
	}
}

export const administratorCommissioning: ClusterDefinition<AdministratorCommissioning> = {
id: 0x003C,
	attributes: [
		"WindowStatus",
		"AdminFabricIndex",
		"AdminVendorId",
		"SupportsBasic",
	] as const,
	commands: [
		"OpenCommissioningWindow",
		"OpenBasicCommissioningWindow",
		"RevokeCommissioning",
	] as const,
	events: [
	] as const
}

export default administratorCommissioning;