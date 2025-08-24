// This file is generated from groups-cluster.xml - do not edit it directly
// Generated on 2025-08-24T09:48:32.635Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum NameSupportBitmap {
	GroupNames= 0x80,
}

/**
 * Attributes and commands for group configuration and manipulation.
 */

export interface Groups {
id: 4;
	attributes: {
		readonly NameSupport:NameSupportBitmap
		/** The ability to store a name for a group. */
		readonly SupportsGroupNames: boolean
}
	commands: {
		/** The AddGroup command allows a client to add group membership in a particular group for the server endpoint. */
		AddGroup: {
			inputparams: readonly [
				GroupID: number, 
				GroupName: string, 
			],
			 outputparams: readonly [
				Status: number, 
				GroupID: number, ]
            }
		/** The ViewGroup command allows a client to request that the server responds with a ViewGroupResponse command containing the name string for a particular group. */
		ViewGroup: {
			inputparams: readonly [
				GroupID: number, 
			],
			 outputparams: readonly [
				Status: number, 
				GroupID: number, 
				GroupName: string, ]
            }
		/** The GetGroupMembership command allows a client to inquire about the group membership of the server endpoint, in a number of ways. */
		GetGroupMembership: {
			inputparams: readonly [
				GroupList: readonly number[], 
			],
			 outputparams: readonly [
				Capacity: number, 
				GroupList: readonly number[], ]
            }
		/** The RemoveGroup command allows a client to request that the server removes the membership for the server endpoint, if any, in a particular group. */
		RemoveGroup: {
			inputparams: readonly [
				GroupID: number, 
			],
			 outputparams: readonly [
				Status: number, 
				GroupID: number, ]
            }
		/** The RemoveAllGroups command allows a client to direct the server to remove all group associations for the server endpoint. */
		RemoveAllGroups: {
			inputparams: readonly [
			],
			 outputparams: readonly []
            }
		/** The AddGroupIfIdentifying command allows a client to add group membership in a particular group for the server endpoint, on condition that the endpoint is identifying itself. */
		AddGroupIfIdentifying: {
			inputparams: readonly [
				GroupID: number, 
				GroupName: string, 
			],
			 outputparams: readonly []
            }
}
	events: {
	}
}

export const groups: ClusterDefinition<Groups> = {
id: 4,
	attributes: [
		"NameSupport",
		"SupportsGroupNames",
	] as const,
	commands: [
		"AddGroup",
		"ViewGroup",
		"GetGroupMembership",
		"RemoveGroup",
		"RemoveAllGroups",
		"AddGroupIfIdentifying",
	] as const,
	events: [
	] as const
}

export default groups;