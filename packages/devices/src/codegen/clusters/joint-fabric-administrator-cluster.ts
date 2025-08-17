// This file is generated from joint-fabric-administrator-cluster.xml - do not edit it directly
// Generated on 2025-08-15T06:41:47.479Z

import { Cluster } from '../../server/clients/shared.js';


export enum ICACResponseStatusEnum {
	OK= 0,
	InvalidPublicKey= 1,
	InvalidICAC= 2,
}

export enum StatusCodeEnum {
	Busy= 2,
	PAKEParameterError= 3,
	WindowNotOpen= 4,
	VIDNotVerified= 5,
	InvalidAdministratorFabricIndex= 6,
}

export enum TransferAnchorResponseStatusEnum {
	OK= 0,
	TransferAnchorStatusDatastoreBusy= 1,
	TransferAnchorStatusNoUserConsent= 2,
}

/**
 * An instance of the Joint Fabric Administrator Cluster only applies to Joint Fabric Administrator nodes fulfilling the role of Anchor CA.
 */

export interface JointFabricAdministrator {
id: 1875;
	attributes: {
		readonly AdministratorFabricIndex?:number
}
	commands: {
		/** This command SHALL be generated during Joint Commissioning Method and subsequently be responded in the form of an ICACCSRResponse command. */
		ICACCSRRequest: {
			inputparams: readonly [
			],
			 outputparams: readonly [
				ICACCSR: import ("@akala/core").IsomorphicBuffer, ]
            }
		/** This command SHALL be generated and executed during Joint Commissioning Method and subsequently be responded in the form of an ICACResponse command. */
		AddICAC: {
			inputparams: readonly [
				ICACValue: import ("@akala/core").IsomorphicBuffer, 
			],
			 outputparams: readonly [
				StatusCode: ICACResponseStatusEnum, ]
            }
		/** This command SHALL fail with a InvalidAdministratorFabricIndex status code sent back to the initiator if the AdministratorFabricIndex field has the value of null. */
		OpenJointCommissioningWindow: {
			inputparams: readonly [
				CommissioningTimeout: number, 
				PAKEPasscodeVerifier: import ("@akala/core").IsomorphicBuffer, 
				Discriminator: number, 
				Iterations: number, 
				Salt: import ("@akala/core").IsomorphicBuffer, 
			],
			 outputparams: readonly []
            }
		/** This command SHALL be sent by a candidate Joint Fabric Anchor Administrator to the current Joint Fabric Anchor Administrator to request transfer of the Anchor Fabric. */
		TransferAnchorRequest: {
			inputparams: readonly [
			],
			 outputparams: readonly [
				StatusCode: TransferAnchorResponseStatusEnum, ]
            }
		/** This command SHALL indicate the completion of the transfer of the Anchor Fabric to another Joint Fabric Ecosystem Administrator. */
		TransferAnchorComplete: {
			inputparams: readonly [
			],
			 outputparams: readonly []
            }
		/** This command SHALL be used for communicating to client the endpoint that holds the Joint Fabric Administrator Cluster. */
		AnnounceJointFabricAdministrator: {
			inputparams: readonly [
				EndpointID: number, 
			],
			 outputparams: readonly []
            }
}
	events: {
	}
}

export const jointFabricAdministrator: Cluster<JointFabricAdministrator['attributes'], JointFabricAdministrator['commands'], JointFabricAdministrator['events']> = {
id: 1875,
	attributes: {
		AdministratorFabricIndex:0,
},
	commands: {
		/** This command SHALL be generated during Joint Commissioning Method and subsequently be responded in the form of an ICACCSRResponse command. */
		ICACCSRRequest: {
			inputparams: [
			],
			 outputparams: [
				null, ]
            },
		/** This command SHALL be generated and executed during Joint Commissioning Method and subsequently be responded in the form of an ICACResponse command. */
		AddICAC: {
			inputparams: [
				null, 
			],
			 outputparams: [
				null, ]
            },
		/** This command SHALL fail with a InvalidAdministratorFabricIndex status code sent back to the initiator if the AdministratorFabricIndex field has the value of null. */
		OpenJointCommissioningWindow: {
			inputparams: [
				0, 
				null, 
				0, 
				0, 
				null, 
			],
			 outputparams: []
            },
		/** This command SHALL be sent by a candidate Joint Fabric Anchor Administrator to the current Joint Fabric Anchor Administrator to request transfer of the Anchor Fabric. */
		TransferAnchorRequest: {
			inputparams: [
			],
			 outputparams: [
				null, ]
            },
		/** This command SHALL indicate the completion of the transfer of the Anchor Fabric to another Joint Fabric Ecosystem Administrator. */
		TransferAnchorComplete: {
			inputparams: [
			],
			 outputparams: []
            },
		/** This command SHALL be used for communicating to client the endpoint that holds the Joint Fabric Administrator Cluster. */
		AnnounceJointFabricAdministrator: {
			inputparams: [
				0, 
			],
			 outputparams: []
            },
},
	events: {
	}
}

export default jointFabricAdministrator;