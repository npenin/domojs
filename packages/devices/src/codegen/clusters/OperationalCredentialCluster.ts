// This file is generated from OperationalCredentialCluster.xml - do not edit it directly
// Generated on 2025-12-22T10:19:39.351Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum CertificateChainTypeEnum {
	DACCertificate = 1,
	PAICertificate = 2,
}

export enum NodeOperationalCertStatusEnum {
	OK = 0,
	InvalidPublicKey = 1,
	InvalidNodeOpId = 2,
	InvalidNOC = 3,
	MissingCsr = 4,
	TableFull = 5,
	InvalidAdminSubject = 6,
	ReservedForFutureUse = 7,
	ReservedForFutureUse_2 = 8,
	FabricConflict = 9,
	LabelConflict = 10,
	InvalidFabricIndex = 11,
}

export interface FabricDescriptorStruct {
	RootPublicKey:import ("@akala/core").IsomorphicBuffer,
	VendorID:number,
	FabricID:number,
	NodeID:string,
	Label:string,
	VIDVerificationStatement?:import ("@akala/core").IsomorphicBuffer,
}

export interface NOCStruct {
	NOC:import ("@akala/core").IsomorphicBuffer,
	ICAC:import ("@akala/core").IsomorphicBuffer,
	VVSC?:import ("@akala/core").IsomorphicBuffer,
}

export type OperationalCredentials = OperationalCredentialsCluster & { id: 0x003E};

export interface OperationalCredentialsCluster {
id: 0x003E;
	attributes: {
		readonly NOCs:readonly NOCStruct[]
		readonly Fabrics:readonly FabricDescriptorStruct[]
		readonly SupportedFabrics:number
		readonly CommissionedFabrics:number
		readonly TrustedRootCertificates:readonly import ("@akala/core").IsomorphicBuffer[]
		readonly CurrentFabricIndex:number
}
	commands: {
		AttestationRequest: {
			inputparams: readonly [
				AttestationNonce: import ("@akala/core").IsomorphicBuffer, 
			],
			 outputparams: readonly [
				AttestationElements: import ("@akala/core").IsomorphicBuffer, 
				AttestationSignature: import ("@akala/core").IsomorphicBuffer, ]
            }
		CertificateChainRequest: {
			inputparams: readonly [
				CertificateType: CertificateChainTypeEnum, 
			],
			 outputparams: readonly [
				Certificate: import ("@akala/core").IsomorphicBuffer, ]
            }
		CSRRequest: {
			inputparams: readonly [
				CSRNonce: import ("@akala/core").IsomorphicBuffer, 
				IsForUpdateNOC: boolean, 
			],
			 outputparams: readonly [
				NOCSRElements: import ("@akala/core").IsomorphicBuffer, 
				AttestationSignature: import ("@akala/core").IsomorphicBuffer, ]
            }
		AddNOC: {
			inputparams: readonly [
				NOCValue: import ("@akala/core").IsomorphicBuffer, 
				ICACValue: import ("@akala/core").IsomorphicBuffer, 
				IPKValue: import ("@akala/core").IsomorphicBuffer, 
				CaseAdminSubject: string, 
				AdminVendorId: number, 
			],
			 outputparams: readonly [
				StatusCode: NodeOperationalCertStatusEnum, 
				FabricIndex: number, 
				DebugText: string, ]
            }
		UpdateNOC: {
			inputparams: readonly [
				NOCValue: import ("@akala/core").IsomorphicBuffer, 
				ICACValue: import ("@akala/core").IsomorphicBuffer, 
			],
			 outputparams: readonly [
				StatusCode: NodeOperationalCertStatusEnum, 
				FabricIndex: number, 
				DebugText: string, ]
            }
		UpdateFabricLabel: {
			inputparams: readonly [
				Label: string, 
			],
			 outputparams: readonly [
				StatusCode: NodeOperationalCertStatusEnum, 
				FabricIndex: number, 
				DebugText: string, ]
            }
		RemoveFabric: {
			inputparams: readonly [
				FabricIndex: number, 
			],
			 outputparams: readonly [
				StatusCode: NodeOperationalCertStatusEnum, 
				FabricIndex: number, 
				DebugText: string, ]
            }
		AddTrustedRootCertificate: {
			inputparams: readonly [
				RootCACertificate: import ("@akala/core").IsomorphicBuffer, 
			],
			 outputparams: readonly []
            }
		SetVIDVerificationStatement: {
			inputparams: readonly [
				VendorID: number, 
				VIDVerificationStatement: import ("@akala/core").IsomorphicBuffer, 
				VVSC: import ("@akala/core").IsomorphicBuffer, 
			],
			 outputparams: readonly []
            }
		SignVIDVerificationRequest: {
			inputparams: readonly [
				FabricIndex: number, 
				ClientChallenge: import ("@akala/core").IsomorphicBuffer, 
			],
			 outputparams: readonly [
				FabricIndex: number, 
				FabricBindingVersion: number, 
				Signature: import ("@akala/core").IsomorphicBuffer, ]
            }
}
	events: {
	}
}

export const operationalCredentials: ClusterDefinition<OperationalCredentials> = {
id: 0x003E,
	attributes: [
		"NOCs",
		"Fabrics",
		"SupportedFabrics",
		"CommissionedFabrics",
		"TrustedRootCertificates",
		"CurrentFabricIndex",
	] as const,
	commands: [
		"AttestationRequest",
		"CertificateChainRequest",
		"CSRRequest",
		"AddNOC",
		"UpdateNOC",
		"UpdateFabricLabel",
		"RemoveFabric",
		"AddTrustedRootCertificate",
		"SetVIDVerificationStatement",
		"SignVIDVerificationRequest",
	] as const,
	events: [
	] as const
}

export default operationalCredentials;