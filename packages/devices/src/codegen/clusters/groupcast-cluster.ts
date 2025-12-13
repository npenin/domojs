// This file is generated from groupcast-cluster.xml - do not edit it directly
// Generated on 2025-12-03T20:57:11.224Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export interface MembershipStruct {
	GroupID:number,
	Endpoints:readonly number[],
	KeyID:number,
	HasAuxiliaryACL:boolean,
	ExpiringKeyID?:number,
}

/**
 * The Groupcast cluster manages the content of the node-wide multicast Group membership that is part of the underlying interaction layer.
 */

export interface Groupcast {
id: 101;
	attributes: {
		readonly Membership:readonly MembershipStruct[]
		readonly MaxMembershipCount:number
		/** Supports joining a multicast group of nodes as a listener. */
		readonly SupportsListener: boolean
		/** Supports sending multicast message to a targeted group of nodes. */
		readonly SupportsSender: boolean
}
	commands: {
		/** This command SHALL be used to instruct the server to join a multicast group. */
		JoinGroup: {
			inputparams: readonly [
				GroupID: number, 
				Endpoints: readonly number[], 
				KeyID: number, 
				Key: import ("@akala/core").IsomorphicBuffer, 
				GracePeriod: number, 
				UseAuxiliaryACL: boolean, 
			],
			 outputparams: readonly []
            }
		/** This command SHALL allow a maintainer to request that the server withdraws itself or specific endpoints from a specific group or from all groups of this client's fabric. */
		LeaveGroup: {
			inputparams: readonly [
				GroupID: number, 
				Endpoints: readonly number[], 
			],
			 outputparams: readonly [
				GroupID: number, 
				Endpoints: readonly number[], 
				ListTooLarge: boolean, ]
            }
		/** This command SHALL allow a fabric maintainer to update the OperationalGroupKey for an existing group ID that the server is a member of. */
		UpdateGroupKey: {
			inputparams: readonly [
				GroupID: number, 
				KeyID: number, 
				Key: import ("@akala/core").IsomorphicBuffer, 
				GracePeriod: number, 
			],
			 outputparams: readonly []
            }
		/** This command SHALL allow a fabric maintainer to expire the grace period of the previous key for an existing group ID that the server is a member of. */
		ExpireGracePeriod: {
			inputparams: readonly [
				GroupID: number, 
			],
			 outputparams: readonly []
            }
		/** This command SHALL allow an Administrator to enable or disable the generation of AuxiliaryACL entries in the Access Control Cluster based on the groups joined (see Groupcast Auxiliary ACL Handling). */
		ConfigureAuxiliaryACL?: {
			inputparams: readonly [
				GroupID: number, 
				UseAuxiliaryACL: boolean, 
			],
			 outputparams: readonly []
            }
}
	events: {
	}
}

export const groupcast: ClusterDefinition<Groupcast> = {
id: 101,
	attributes: [
		"Membership",
		"MaxMembershipCount",
		"SupportsListener",
		"SupportsSender",
	] as const,
	commands: [
		"JoinGroup",
		"LeaveGroup",
		"UpdateGroupKey",
		"ExpireGracePeriod",
		"ConfigureAuxiliaryACL",
	] as const,
	events: [
	] as const
}

export default groupcast;