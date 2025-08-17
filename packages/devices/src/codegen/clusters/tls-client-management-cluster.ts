// This file is generated from tls-client-management-cluster.xml - do not edit it directly
// Generated on 2025-08-17T14:20:47.023Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum StatusCodeEnum {
	EndpointAlreadyInstalled= 2,
	RootCertificateNotFound= 3,
	ClientCertificateNotFound= 4,
	EndpointInUse= 5,
}

export enum TLSEndpointStatusEnum {
	Provisioned= 0,
	InUse= 1,
}

export interface TLSEndpointStruct {
	EndpointID:number,
	Hostname:import ("@akala/core").IsomorphicBuffer,
	Port:number,
	CAID:number,
	CCDID:number,
	Status:TLSEndpointStatusEnum,
}

/**
 * This Cluster is used to provision TLS Endpoints with enough information to facilitate subsequent connection.
 */

export interface TLSClientManagement {
id: 2050;
	attributes: {
		readonly MaxProvisioned:number
		readonly ProvisionedEndpoints:readonly TLSEndpointStruct[]
}
	commands: {
		/** This command is used to provision a TLS Endpoint for the provided HostName / Port combination. */
		ProvisionEndpoint: {
			inputparams: readonly [
				Hostname: import ("@akala/core").IsomorphicBuffer, 
				Port: number, 
				CAID: number, 
				CCDID: number, 
				EndpointID: number, 
			],
			 outputparams: readonly [
				EndpointID: number, ]
            }
		/** This command is used to find a TLS Endpoint by its ID. */
		FindEndpoint: {
			inputparams: readonly [
				EndpointID: number, 
			],
			 outputparams: readonly [
				Endpoint: TLSEndpointStruct, ]
            }
		/** This command is used to remove a TLS Endpoint by its ID. */
		RemoveEndpoint: {
			inputparams: readonly [
				EndpointID: number, 
			],
			 outputparams: readonly []
            }
}
	events: {
	}
}

export const tLSClientManagement: ClusterDefinition<TLSClientManagement> = {
id: 2050,
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