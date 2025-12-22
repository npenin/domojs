// This file is generated from TLSClientManagement.xml - do not edit it directly
// Generated on 2025-12-22T10:26:11.763Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export type TLSEndpointID = number;


export enum StatusCodeEnum {
	EndpointAlreadyInstalled = 2,
	RootCertificateNotFound = 3,
	ClientCertificateNotFound = 4,
	EndpointInUse = 5,
	InvalidTime = 6,
}

export interface TLSEndpointStruct {
	EndpointID:TLSEndpointID,
	Hostname:import ("@akala/core").IsomorphicBuffer,
	Port:number,
	CAID:import("./TLSCertificateManagement.js").TLSCAID,
	CCDID:import("./TLSCertificateManagement.js").TLSCCDID,
	ReferenceCount:number,
}

export type TLSClientManagement = TLSClientManagementCluster & { id: 0x0802};

export interface TLSClientManagementCluster {
id: 0x0802;
	attributes: {
		readonly MaxProvisioned:number
		readonly ProvisionedEndpoints:readonly TLSEndpointStruct[]
}
	commands: {
		ProvisionEndpoint: {
			inputparams: readonly [
				Hostname: import ("@akala/core").IsomorphicBuffer, 
				Port: number, 
				CAID: import("./TLSCertificateManagement.js").TLSCAID, 
				CCDID: import("./TLSCertificateManagement.js").TLSCCDID, 
				EndpointID: TLSEndpointID, 
			],
			 outputparams: readonly [
				EndpointID: TLSEndpointID, ]
            }
		FindEndpoint: {
			inputparams: readonly [
				EndpointID: TLSEndpointID, 
			],
			 outputparams: readonly [
				Endpoint: TLSEndpointStruct, ]
            }
		RemoveEndpoint: {
			inputparams: readonly [
				EndpointID: TLSEndpointID, 
			],
			 outputparams: readonly []
            }
}
	events: {
	}
}

export const tLSClientManagement: ClusterDefinition<TLSClientManagement> = {
id: 0x0802,
	attributes: [
		"MaxProvisioned",
		"ProvisionedEndpoints",
	] as const,
	commands: [
		"ProvisionEndpoint",
		"FindEndpoint",
		"RemoveEndpoint",
	] as const,
	events: [
	] as const
}

export default tLSClientManagement;