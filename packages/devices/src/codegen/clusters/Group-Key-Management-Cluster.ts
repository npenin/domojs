// This file is generated from Group-Key-Management-Cluster.xml - do not edit it directly
// Generated on 2025-12-18T03:05:03.603Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum GroupKeyMulticastPolicyEnum {
	PerGroupID = 0,
	AllNodes = 1,
}

export enum GroupKeySecurityPolicyEnum {
	TrustFirst = 0,
	CacheAndSync = 1,
}

export interface GroupInfoMapStruct {
	GroupId:number,
	Endpoints:readonly number[],
	GroupName?:string,
}

export interface GroupKeyMapStruct {
	GroupId:number,
	GroupKeySetID:number,
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
	GroupKeyMulticastPolicy?:GroupKeyMulticastPolicyEnum,
}

export type GroupKeyManagement = GroupKeyManagementCluster & { id: 0x003F};

export interface GroupKeyManagementCluster {
id: 0x003F;
	attributes: {
		readonly GroupKeyMap:readonly GroupKeyMapStruct[]
		readonly GroupTable:readonly GroupInfoMapStruct[]
		readonly MaxGroupsPerFabric:number
		readonly MaxGroupKeysPerFabric:number
		/** The ability to support CacheAndSync security policy and MCSP. */
		readonly SupportsCacheAndSync: boolean
}
	commands: {
		KeySetWrite: {
			inputparams: readonly [
				GroupKeySet: GroupKeySetStruct, 
			],
			 outputparams: readonly []
            }
		KeySetRead: {
			inputparams: readonly [
				GroupKeySetID: number, 
			],
			 outputparams: readonly [
				GroupKeySet: GroupKeySetStruct, ]
            }
		KeySetRemove: {
			inputparams: readonly [
				GroupKeySetID: number, 
			],
			 outputparams: readonly []
            }
		KeySetReadAllIndices: {
			inputparams: readonly [
			],
			 outputparams: readonly [
				GroupKeySetIDs: readonly number[], ]
            }
}
	events: {
	}
}

export const groupKeyManagement: ClusterDefinition<GroupKeyManagement> = {
id: 0x003F,
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