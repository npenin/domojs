// This file is generated from group-key-mgmt-cluster.xml - do not edit it directly
// Generated on 2025-08-17T14:20:45.648Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum GroupKeySecurityPolicyEnum {
	TrustFirst= 0,
	CacheAndSync= 1,
}

export interface GroupKeyMapStruct {
	GroupId:number,
	GroupKeySetID:number,
}

export interface GroupInfoMapStruct {
	GroupId:number,
	Endpoints:readonly number[],
	GroupName?:string,
}

export interface GroupKeySetStruct {
	GroupKeySetID:number,
	GroupKeySecurityPolicy:GroupKeySecurityPolicyEnum,
	EpochKey0:import ("@akala/core").IsomorphicBuffer,
	EpochStartTime0:number,
	EpochKey1:import ("@akala/core").IsomorphicBuffer,
	EpochStartTime1:number,
	EpochKey2:import ("@akala/core").IsomorphicBuffer,
	EpochStartTime2:number,
}

/**
 * The Group Key Management Cluster is the mechanism by which group keys are managed.
 */

export interface GroupKeyManagement {
id: 63;
	attributes: {
		GroupKeyMap?:readonly GroupKeyMapStruct[]
		readonly GroupTable:readonly GroupInfoMapStruct[]
		readonly MaxGroupsPerFabric:number
		readonly MaxGroupKeysPerFabric:number
		/** The ability to support CacheAndSync security policy and MCSP. */
		readonly SupportsCacheAndSync: boolean
}
	commands: {
		/** Write a new set of keys for the given key set id. */
		KeySetWrite: {
			inputparams: readonly [
				GroupKeySet: GroupKeySetStruct, 
			],
			 outputparams: readonly []
            }
		/** Read the keys for a given key set id. */
		KeySetRead: {
			inputparams: readonly [
				GroupKeySetID: number, 
			],
			 outputparams: readonly [
				GroupKeySet: GroupKeySetStruct, ]
            }
		/** Revoke a Root Key from a Group */
		KeySetRemove: {
			inputparams: readonly [
				GroupKeySetID: number, 
			],
			 outputparams: readonly []
            }
		/** Return the list of Group Key Sets associated with the accessing fabric */
		KeySetReadAllIndices: {
			inputparams: readonly [
			],
			 outputparams: readonly [
				GroupKeySetIDs: readonly number[][], ]
            }
}
	events: {
	}
}

export const groupKeyManagement: ClusterDefinition<GroupKeyManagement> = {
id: 63,
	attributes: [
		"GroupKeyMap",
		"GroupTable",
		"MaxGroupsPerFabric",
		"MaxGroupKeysPerFabric",
		"SupportsCacheAndSync",
	] as const,
	commands: [
		"KeySetWrite",
		"KeySetRead",
		"KeySetRemove",
		"KeySetReadAllIndices",
	] as const,
	events: [
	] as const
}

export default groupKeyManagement;