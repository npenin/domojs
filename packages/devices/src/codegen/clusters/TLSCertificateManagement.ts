// This file is generated from TLSCertificateManagement.xml - do not edit it directly
// Generated on 2025-12-18T03:05:13.339Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export type TLSCAID = number;


export type TLSCCDID = number;


export interface TLSCertStruct {
	CAID:TLSCAID,
	Certificate?:import ("@akala/core").IsomorphicBuffer,
}

export interface TLSClientCertificateDetailStruct {
	CCDID:TLSCCDID,
	ClientCertificate?:import ("@akala/core").IsomorphicBuffer,
	IntermediateCertificates?:readonly import ("@akala/core").IsomorphicBuffer[],
}

export type TLSCertificateManagement = TLSCertificateManagementCluster & { id: 0x0801};

export interface TLSCertificateManagementCluster {
id: 0x0801;
	attributes: {
		readonly MaxRootCertificates:number
		readonly ProvisionedRootCertificates:readonly TLSCertStruct[]
		readonly MaxClientCertificates:number
		readonly ProvisionedClientCertificates:readonly TLSClientCertificateDetailStruct[]
}
	commands: {
		ProvisionRootCertificate: {
			inputparams: readonly [
				Certificate: import ("@akala/core").IsomorphicBuffer, 
				CAID: TLSCAID, 
			],
			 outputparams: readonly [
				CAID: TLSCAID, ]
            }
		FindRootCertificate: {
			inputparams: readonly [
				CAID: TLSCAID, 
			],
			 outputparams: readonly [
				CertificateDetails: readonly TLSCertStruct[], ]
            }
		LookupRootCertificate: {
			inputparams: readonly [
				Fingerprint: import ("@akala/core").IsomorphicBuffer, 
			],
			 outputparams: readonly [
				CAID: TLSCAID, ]
            }
		RemoveRootCertificate: {
			inputparams: readonly [
				CAID: TLSCAID, 
			],
			 outputparams: readonly []
            }
		ClientCSR: {
			inputparams: readonly [
				Nonce: import ("@akala/core").IsomorphicBuffer, 
				CCDID: TLSCCDID, 
			],
			 outputparams: readonly [
				CCDID: TLSCCDID, 
				CSR: import ("@akala/core").IsomorphicBuffer, 
				NonceSignature: import ("@akala/core").IsomorphicBuffer, ]
            }
		ProvisionClientCertificate: {
			inputparams: readonly [
				CCDID: TLSCCDID, 
				ClientCertificate: import ("@akala/core").IsomorphicBuffer, 
				IntermediateCertificates: readonly import ("@akala/core").IsomorphicBuffer[], 
			],
			 outputparams: readonly []
            }
		FindClientCertificate: {
			inputparams: readonly [
				CCDID: TLSCCDID, 
			],
			 outputparams: readonly [
				CertificateDetails: readonly TLSClientCertificateDetailStruct[], ]
            }
		LookupClientCertificate: {
			inputparams: readonly [
				Fingerprint: import ("@akala/core").IsomorphicBuffer, 
			],
			 outputparams: readonly [
				CCDID: TLSCCDID, ]
            }
		RemoveClientCertificate: {
			inputparams: readonly [
				CCDID: TLSCCDID, 
			],
			 outputparams: readonly []
            }
}
	events: {
	}
}

export const tLSCertificateManagement: ClusterDefinition<TLSCertificateManagement> = {
id: 0x0801,
	attributes: [
		"MaxRootCertificates",
		"ProvisionedRootCertificates",
		"MaxClientCertificates",
		"ProvisionedClientCertificates",
	] as const,
	commands: [
		"ProvisionRootCertificate",
		"FindRootCertificate",
		"LookupRootCertificate",
		"RemoveRootCertificate",
		"ClientCSR",
		"ProvisionClientCertificate",
		"FindClientCertificate",
		"LookupClientCertificate",
		"RemoveClientCertificate",
	] as const,
	events: [
	] as const
}

export default tLSCertificateManagement;