// This file is generated from JointFabricAdministratorCluster.xml - do not edit it directly
// Generated on 2025-12-18T03:05:04.495Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum ICACResponseStatusEnum {
	OK = 0,
	InvalidPublicKey = 1,
	InvalidICAC = 2,
}

export enum StatusCodeEnum {
	Busy = 2,
	PAKEParameterError = 3,
	WindowNotOpen = 4,
	VIDNotVerified = 5,
	InvalidAdministratorFabricIndex = 6,
}

export enum TransferAnchorResponseStatusEnum {
	OK = 0,
	TransferAnchorStatusDatastoreBusy = 1,
	TransferAnchorStatusNoUserConsent = 2,
}

export type JointFabricAdministrator = JointFabricAdministratorCluster & { id: 0x0753};

export interface JointFabricAdministratorCluster {
id: 0x0753;
	attributes: {
		readonly AdministratorFabricIndex?:number
}
	commands: {
		ICACCSRRequest?: {
			inputparams: readonly [
			],
			 outputparams: readonly [
				ICACCSR: import ("@akala/core").IsomorphicBuffer, ]
            }
		AddICAC?: {
			inputparams: readonly [
				ICACValue: import ("@akala/core").IsomorphicBuffer, 
			],
			 outputparams: readonly [
				StatusCode: ICACResponseStatusEnum, ]
            }
		OpenJointCommissioningWindow?: {
			inputparams: readonly [
				CommissioningTimeout: number, 
				PAKEPasscodeVerifier: import ("@akala/core").IsomorphicBuffer, 
				Discriminator: number, 
				Iterations: number, 
				Salt: import ("@akala/core").IsomorphicBuffer, 
			],
			 outputparams: readonly []
            }
		TransferAnchorRequest?: {
			inputparams: readonly [
			],
			 outputparams: readonly [
				StatusCode: TransferAnchorResponseStatusEnum, ]
            }
		TransferAnchorComplete?: {
			inputparams: readonly [
			],
			 outputparams: readonly []
            }
		AnnounceJointFabricAdministrator?: {
			inputparams: readonly [
				EndpointID: number, 
			],
			 outputparams: readonly []
            }
}
	events: {
	}
}

export const jointFabricAdministrator: ClusterDefinition<JointFabricAdministrator> = {
id: 0x0753,
	attributes: [
		"AdministratorFabricIndex",
	] as const,
	commands: [
		"ICACCSRRequest",
		"AddICAC",
		"OpenJointCommissioningWindow",
		"TransferAnchorRequest",
		"TransferAnchorComplete",
		"AnnounceJointFabricAdministrator",
	] as const,
	events: [
	] as const
}

export default jointFabricAdministrator;