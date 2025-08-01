

export enum NodeOperationalCertStatusEnum {
	OK= 0,
	InvalidPublicKey= 1,
	InvalidNodeOpId= 2,
	InvalidNOC= 3,
	MissingCsr= 4,
	TableFull= 5,
	InvalidAdminSubject= 6,
	FabricConflict= 9,
	LabelConflict= 10,
	InvalidFabricIndex= 11,
}

export enum CertificateChainTypeEnum {
	DACCertificate= 1,
	PAICertificate= 2,
}

export interface FabricDescriptorStruct {
	RootPublicKey:import ("@akala/core").IsomorphicBuffer,
	VendorID: number,
	FabricID: number,
	NodeID: string,
	Label: string,
	VIDVerificationStatement?:import ("@akala/core").IsomorphicBuffer,
}

export interface NOCStruct {
	NOC:import ("@akala/core").IsomorphicBuffer,
	ICAC:import ("@akala/core").IsomorphicBuffer,
	VVSC?:import ("@akala/core").IsomorphicBuffer,
}

/**
 * This cluster is used to add or remove Operational Credentials on a Commissionee or Node, as well as manage the associated Fabrics.
 */

export interface OperationalCredentials {
id: 62;
	attributes: {
		readonly NOCs:readonly NOCStruct[]
		readonly Fabrics:readonly FabricDescriptorStruct[]
		readonly SupportedFabrics: number
		readonly CommissionedFabrics: number
		readonly TrustedRootCertificates:readonly import ("@akala/core").IsomorphicBuffer[]
		readonly CurrentFabricIndex: number
}
	commands: {
		/** Sender is requesting attestation information from the receiver. */
		AttestationRequest: {
			inputparams: readonly [
				AttestationNonce: import ("@akala/core").IsomorphicBuffer, 
			],
			 outputparams: readonly [
				AttestationElements: import ("@akala/core").IsomorphicBuffer, 
				AttestationSignature: import ("@akala/core").IsomorphicBuffer, ]
            }
		/** Sender is requesting a device attestation certificate from the receiver. */
		CertificateChainRequest: {
			inputparams: readonly [
				CertificateType: CertificateChainTypeEnum, 
			],
			 outputparams: readonly [
				Certificate: import ("@akala/core").IsomorphicBuffer, ]
            }
		/** Sender is requesting a certificate signing request (CSR) from the receiver. */
		CSRRequest: {
			inputparams: readonly [
				CSRNonce: import ("@akala/core").IsomorphicBuffer, 
				IsForUpdateNOC: boolean, 
			],
			 outputparams: readonly [
				NOCSRElements: import ("@akala/core").IsomorphicBuffer, 
				AttestationSignature: import ("@akala/core").IsomorphicBuffer, ]
            }
		/** Sender is requesting to add the new node operational certificates. */
		AddNOC: {
			inputparams: readonly [
				NOCValue: import ("@akala/core").IsomorphicBuffer, 
				ICACValue: import ("@akala/core").IsomorphicBuffer, 
				IPKValue: import ("@akala/core").IsomorphicBuffer, 
				CaseAdminSubject:  bigint, 
				AdminVendorId:  number, 
			],
			 outputparams: readonly [
				StatusCode: NodeOperationalCertStatusEnum, 
				FabricIndex:  number, 
				DebugText:  string, ]
            }
		/** This command SHALL replace the NOC and optional associated ICAC (if present) scoped under the accessing fabric upon successful validation of all arguments and preconditions. */
		UpdateNOC: {
			inputparams: readonly [
				NOCValue: import ("@akala/core").IsomorphicBuffer, 
				ICACValue: import ("@akala/core").IsomorphicBuffer, 
			],
			 outputparams: readonly [
				StatusCode: NodeOperationalCertStatusEnum, 
				FabricIndex:  number, 
				DebugText:  string, ]
            }
		/** This command SHALL be used by an Administrative Node to set the user-visible Label field for a given Fabric, as reflected by entries in the Fabrics attribute. */
		UpdateFabricLabel: {
			inputparams: readonly [
				Label:  string, 
			],
			 outputparams: readonly [
				StatusCode: NodeOperationalCertStatusEnum, 
				FabricIndex:  number, 
				DebugText:  string, ]
            }
		/** This command is used by Administrative Nodes to remove a given fabric index and delete all associated fabric-scoped data. */
		RemoveFabric: {
			inputparams: readonly [
				FabricIndex:  number, 
			],
			 outputparams: readonly [
				StatusCode: NodeOperationalCertStatusEnum, 
				FabricIndex:  number, 
				DebugText:  string, ]
            }
		/** This command SHALL add a Trusted Root CA Certificate, provided as its CHIP Certificate representation. */
		AddTrustedRootCertificate: {
			inputparams: readonly [
				RootCACertificate: import ("@akala/core").IsomorphicBuffer, 
			],
			 outputparams: readonly []
            }
		/** This command SHALL be used to update any of the accessing fabric's associated VendorID, VidVerificatioNStatement or VVSC (Vendor Verification Signing Certificate). */
		SetVIDVerificationStatement: {
			inputparams: readonly [
				VendorID:  number, 
				VIDVerificationStatement: import ("@akala/core").IsomorphicBuffer, 
				VVSC: import ("@akala/core").IsomorphicBuffer, 
			],
			 outputparams: readonly []
            }
		/** This command SHALL be used to request that the server authenticate the fabric associated with the FabricIndex given. */
		SignVIDVerificationRequest: {
			inputparams: readonly [
				FabricIndex:  number, 
				ClientChallenge: import ("@akala/core").IsomorphicBuffer, 
			],
			 outputparams: readonly [
				FabricIndex:  number, 
				FabricBindingVersion:  number, 
				Signature: import ("@akala/core").IsomorphicBuffer, ]
            }
}
	events: {
	}
}