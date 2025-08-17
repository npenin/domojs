// This file is generated from tls-certificate-management-cluster.xml - do not edit it directly
// Generated on 2025-08-17T14:20:47.000Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum StatusCodeEnum {
	CertificateAlreadyInstalled= 2,
	DuplicateKey= 3,
}

export interface TLSCertStruct {
	CAID:number,
	Certificate?:import ("@akala/core").IsomorphicBuffer,
}

export interface TLSClientCertificateDetailStruct {
	CCDID:number,
	ClientCertificate?:import ("@akala/core").IsomorphicBuffer,
	IntermediateCertificates?:readonly import ("@akala/core").IsomorphicBuffer[],
}

/**
 * This Cluster is used to manage TLS Client Certificates and to provision
      TLS endpoints with enough information to facilitate subsequent connection.
 */

export interface TLSCertificateManagement {
id: 2049;
	attributes: {
		readonly MaxRootCertificates:number
		readonly ProvisionedRootCertificates:readonly TLSCertStruct[]
		readonly MaxClientCertificates:number
		readonly ProvisionedClientCertificates:readonly TLSClientCertificateDetailStruct[]
}
	commands: {
		/** This command SHALL provision a newly provided certificate, or rotate an existing one, based on the contents of the CAID field. */
		ProvisionRootCertificate: {
			inputparams: readonly [
				Certificate: import ("@akala/core").IsomorphicBuffer, 
				CAID: number, 
			],
			 outputparams: readonly [
				CAID: number, ]
            }
		/** This command SHALL return the specified TLS root certificate, or all TLS provisioned root certificates, based on the contents of the CAID field. */
		FindRootCertificate: {
			inputparams: readonly [
				CAID: number, 
			],
			 outputparams: readonly [
				CertificateDetails: readonly TLSCertStruct[][], ]
            }
		/** This command SHALL return the CAID for the passed in fingerprint. */
		LookupRootCertificate: {
			inputparams: readonly [
				Fingerprint: import ("@akala/core").IsomorphicBuffer, 
			],
			 outputparams: readonly [
				CAID: number, ]
            }
		/** This command SHALL be generated to request the server removes the certificate provisioned to the provided Certificate Authority ID. */
		RemoveRootCertificate: {
			inputparams: readonly [
				CAID: number, 
			],
			 outputparams: readonly []
            }
		/** This command SHALL be generated to request the Node generates a Certificate Signing Request. */
		TLSClientCSR: {
			inputparams: readonly [
				Nonce: import ("@akala/core").IsomorphicBuffer, 
			],
			 outputparams: readonly [
				CCDID: number, 
				CSR: import ("@akala/core").IsomorphicBuffer, 
				Nonce: import ("@akala/core").IsomorphicBuffer, ]
            }
		/** This command SHALL be generated to request the Node provisions newly provided Client Certificate Details, or rotate an existing client certificate. */
		ProvisionClientCertificate: {
			inputparams: readonly [
				CCDID: number, 
				ClientCertificateDetails: TLSClientCertificateDetailStruct, 
			],
			 outputparams: readonly []
            }
		/** This command SHALL return the TLSClientCertificateDetailStruct for the passed in CCDID, or all TLS client certificates, based on the contents of the CCDID field. */
		FindClientCertificate: {
			inputparams: readonly [
				CCDID: number, 
			],
			 outputparams: readonly [
				CertificateDetails: readonly TLSClientCertificateDetailStruct[][], ]
            }
		/** This command SHALL return the CCDID for the passed in Fingerprint. */
		LookupClientCertificate: {
			inputparams: readonly [
				Fingerprint: import ("@akala/core").IsomorphicBuffer, 
			],
			 outputparams: readonly [
				CCDID: number, ]
            }
		/** This command SHALL be used to request the Node removes all stored information for the provided CCDID. */
		RemoveClientCertificate: {
			inputparams: readonly [
				CCDID: number, 
			],
			 outputparams: readonly []
            }
}
	events: {
	}
}

export const tLSCertificateManagement: ClusterDefinition<TLSCertificateManagement> = {
id: 2049,
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
		"TLSClientCSR",
		"ProvisionClientCertificate",
		"FindClientCertificate",
		"LookupClientCertificate",
		"RemoveClientCertificate",
	] as const,
	events: [
	] as const
}

export default tLSCertificateManagement;