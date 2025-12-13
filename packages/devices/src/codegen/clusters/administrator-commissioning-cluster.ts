// This file is generated from administrator-commissioning-cluster.xml - do not edit it directly
// Generated on 2025-12-03T20:57:09.974Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum StatusCode {
	Busy= 2,
	PAKEParameterError= 3,
	WindowNotOpen= 4,
}

export enum CommissioningWindowStatusEnum {
	WindowNotOpen= 0,
	EnhancedWindowOpen= 1,
	BasicWindowOpen= 2,
}

/**
 * Commands to trigger a Node to allow a new Administrator to commission it.
 */

export interface AdministratorCommissioning {
id: 60;
	attributes: {
		readonly WindowStatus:CommissioningWindowStatusEnum
		readonly AdminFabricIndex?:number
		readonly AdminVendorId?:number
		/** Node supports Basic Commissioning Method. */
		readonly SupportsBasic: boolean
}
	commands: {
		/** This command is used by a current Administrator to instruct a Node to go into commissioning mode. */
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
		/** This command MAY be used by a current Administrator to instruct a Node to go into commissioning mode, if the node supports the Basic Commissioning Method. */
		OpenBasicCommissioningWindow?: {
			inputparams: readonly [
				CommissioningTimeout: number, 
			],
			 outputparams: readonly []
            }
		/** This command is used by a current Administrator to instruct a Node to revoke any active OpenCommissioningWindow or OpenBasicCommissioningWindow command. */
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
id: 60,
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