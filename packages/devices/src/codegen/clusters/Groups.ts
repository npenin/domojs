// This file is generated from Groups.xml - do not edit it directly
// Generated on 2025-12-22T10:19:32.553Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum NameSupportBitmap {
	__NotSet = 0,
		/** The ability to store a name for a group. */
	GroupNames= 1<<7,
}

export type Groups = GroupsCluster & { id: 0x0004};

export interface GroupsCluster {
id: 0x0004;
	attributes: {
		readonly NameSupport:NameSupportBitmap
		/** The ability to store a name for a group. */
		readonly SupportsGroupNames: boolean
}
	commands: {
		AddGroup: {
			inputparams: readonly [
				GroupID: number, 
				GroupName: string, 
			],
			 outputparams: readonly [
				Status: number, 
				GroupID: number, ]
            }
		ViewGroup: {
			inputparams: readonly [
				GroupID: number, 
			],
			 outputparams: readonly [
				Status: number, 
				GroupID: number, 
				GroupName: string, ]
            }
		GetGroupMembership: {
			inputparams: readonly [
				GroupList: readonly number[], 
			],
			 outputparams: readonly [
				Capacity: number, 
				GroupList: readonly number[], ]
            }
		RemoveGroup: {
			inputparams: readonly [
				GroupID: number, 
			],
			 outputparams: readonly [
				Status: number, 
				GroupID: number, ]
            }
		RemoveAllGroups: {
			inputparams: readonly [
			],
			 outputparams: readonly []
            }
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
id: 0x0004,
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