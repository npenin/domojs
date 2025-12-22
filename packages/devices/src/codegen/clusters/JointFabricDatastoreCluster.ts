// This file is generated from JointFabricDatastoreCluster.xml - do not edit it directly
// Generated on 2025-12-22T10:26:04.292Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum DatastoreAccessControlEntryAuthModeEnum {
	PASE = 1,
	CASE = 2,
	Group = 3,
}

export enum DatastoreAccessControlEntryPrivilegeEnum {
	View = 1,
	ProxyView = 2,
	Operate = 3,
	Manage = 4,
	Administer = 5,
}

export enum DatastoreGroupKeyMulticastPolicyEnum {
	PerGroupID = 0,
	AllNodes = 1,
}

export enum DatastoreGroupKeySecurityPolicyEnum {
	TrustFirst = 0,
}

export enum DatastoreStateEnum {
	Pending = 0,
	Committed = 1,
	DeletePending = 2,
	CommitFailed = 3,
}

export interface DatastoreACLEntryStruct {
	NodeID:string,
	ListID:number,
	ACLEntry:DatastoreAccessControlEntryStruct,
	StatusEntry:DatastoreStatusEntryStruct,
}

export interface DatastoreAccessControlEntryStruct {
	Privilege:DatastoreAccessControlEntryPrivilegeEnum,
	AuthMode:DatastoreAccessControlEntryAuthModeEnum,
	Subjects:readonly string[],
	Targets:readonly DatastoreAccessControlTargetStruct[],
}

export interface DatastoreAccessControlTargetStruct {
	Cluster:import ("./clusters-index.js").ClusterIds,
	Endpoint:number,
	DeviceType:number,
}

export interface DatastoreAdministratorInformationEntryStruct {
	NodeID:string,
	FriendlyName:string,
	VendorID:number,
	ICAC:import ("@akala/core").IsomorphicBuffer,
}

export interface DatastoreBindingTargetStruct {
	Node?:string,
	Group?:number,
	Endpoint?:number,
	Cluster?:import ("./clusters-index.js").ClusterIds,
}

export interface DatastoreEndpointBindingEntryStruct {
	NodeID:string,
	EndpointID:number,
	ListID:number,
	Binding:DatastoreBindingTargetStruct,
	StatusEntry:DatastoreStatusEntryStruct,
}

export interface DatastoreEndpointEntryStruct {
	EndpointID:number,
	NodeID:string,
	FriendlyName:string,
	StatusEntry:DatastoreStatusEntryStruct,
}

export interface DatastoreEndpointGroupIDEntryStruct {
	NodeID:string,
	EndpointID:number,
	GroupID:number,
	StatusEntry:DatastoreStatusEntryStruct,
}

export interface DatastoreGroupInformationEntryStruct {
	GroupID:bigint,
	FriendlyName:string,
	GroupKeySetID:number,
	GroupCAT:number,
	GroupCATVersion:number,
	GroupPermission:DatastoreAccessControlEntryPrivilegeEnum,
}

export interface DatastoreGroupKeySetStruct {
	GroupKeySetID:number,
	GroupKeySecurityPolicy:DatastoreGroupKeySecurityPolicyEnum,
	EpochKey0:import ("@akala/core").IsomorphicBuffer,
	EpochStartTime0:number,
	EpochKey1:import ("@akala/core").IsomorphicBuffer,
	EpochStartTime1:number,
	EpochKey2:import ("@akala/core").IsomorphicBuffer,
	EpochStartTime2:number,
	GroupKeyMulticastPolicy?:DatastoreGroupKeyMulticastPolicyEnum,
}

export interface DatastoreNodeInformationEntryStruct {
	NodeID:string,
	FriendlyName:string,
	CommissioningStatusEntry:DatastoreStatusEntryStruct,
}

export interface DatastoreNodeKeySetEntryStruct {
	NodeID:string,
	GroupKeySetID:number,
	StatusEntry:DatastoreStatusEntryStruct,
}

export interface DatastoreStatusEntryStruct {
	State:DatastoreStateEnum,
	UpdateTimestamp:number,
	FailureCode:number,
}

export type JointFabricDatastore = JointFabricDatastoreCluster & { id: 0x0752};

export interface JointFabricDatastoreCluster {
id: 0x0752;
	attributes: {
		readonly AnchorRootCA?:import ("@akala/core").IsomorphicBuffer
		readonly AnchorNodeID?:string
		readonly AnchorVendorID?:number
		readonly FriendlyName?:string
		readonly GroupKeySetList?:readonly DatastoreGroupKeySetStruct[]
		readonly GroupList?:readonly DatastoreGroupInformationEntryStruct[]
		readonly NodeList?:readonly DatastoreNodeInformationEntryStruct[]
		readonly AdminList?:readonly DatastoreAdministratorInformationEntryStruct[]
		readonly Status?:DatastoreStatusEntryStruct
		readonly EndpointGroupIDList?:readonly DatastoreEndpointGroupIDEntryStruct[]
		readonly EndpointBindingList?:readonly DatastoreEndpointBindingEntryStruct[]
		readonly NodeKeySetList?:readonly DatastoreNodeKeySetEntryStruct[]
		readonly NodeACLList?:readonly DatastoreACLEntryStruct[]
		readonly NodeEndpointList?:readonly DatastoreEndpointEntryStruct[]
}
	commands: {
		AddKeySet?: {
			inputparams: readonly [
				GroupKeySet: DatastoreGroupKeySetStruct, 
			],
			 outputparams: readonly []
            }
		UpdateKeySet?: {
			inputparams: readonly [
				GroupKeySet: DatastoreGroupKeySetStruct, 
			],
			 outputparams: readonly []
            }
		RemoveKeySet?: {
			inputparams: readonly [
				GroupKeySetID: number, 
			],
			 outputparams: readonly []
            }
		AddGroup?: {
			inputparams: readonly [
				GroupID: number, 
				FriendlyName: string, 
				GroupKeySetID: number, 
				GroupCAT: number, 
				GroupCATVersion: number, 
				GroupPermission: DatastoreAccessControlEntryPrivilegeEnum, 
			],
			 outputparams: readonly []
            }
		UpdateGroup?: {
			inputparams: readonly [
				GroupID: number, 
				FriendlyName: string, 
				GroupKeySetID: number, 
				GroupCAT: number, 
				GroupCATVersion: number, 
				GroupPermission: DatastoreAccessControlEntryPrivilegeEnum, 
			],
			 outputparams: readonly []
            }
		RemoveGroup?: {
			inputparams: readonly [
				GroupID: number, 
			],
			 outputparams: readonly []
            }
		AddAdmin?: {
			inputparams: readonly [
				NodeID: string, 
				FriendlyName: string, 
				VendorID: number, 
				ICAC: import ("@akala/core").IsomorphicBuffer, 
			],
			 outputparams: readonly []
            }
		UpdateAdmin?: {
			inputparams: readonly [
				NodeID: string, 
				FriendlyName: string, 
				ICAC: import ("@akala/core").IsomorphicBuffer, 
			],
			 outputparams: readonly []
            }
		RemoveAdmin?: {
			inputparams: readonly [
				NodeID: string, 
			],
			 outputparams: readonly []
            }
		AddPendingNode?: {
			inputparams: readonly [
				NodeID: string, 
				FriendlyName: string, 
			],
			 outputparams: readonly []
            }
		RefreshNode?: {
			inputparams: readonly [
				NodeID: string, 
			],
			 outputparams: readonly []
            }
		UpdateNode?: {
			inputparams: readonly [
				NodeID: string, 
				FriendlyName: string, 
			],
			 outputparams: readonly []
            }
		RemoveNode?: {
			inputparams: readonly [
				NodeID: string, 
			],
			 outputparams: readonly []
            }
		UpdateEndpointForNode?: {
			inputparams: readonly [
				EndpointID: number, 
				NodeID: string, 
				FriendlyName: string, 
			],
			 outputparams: readonly []
            }
		AddGroupIDToEndpointForNode?: {
			inputparams: readonly [
				NodeID: string, 
				EndpointID: number, 
				GroupID: number, 
			],
			 outputparams: readonly []
            }
		RemoveGroupIDFromEndpointForNode?: {
			inputparams: readonly [
				NodeID: string, 
				EndpointID: number, 
				GroupID: number, 
			],
			 outputparams: readonly []
            }
		AddBindingToEndpointForNode?: {
			inputparams: readonly [
				NodeID: string, 
				EndpointID: number, 
				Binding: DatastoreBindingTargetStruct, 
			],
			 outputparams: readonly []
            }
		RemoveBindingFromEndpointForNode?: {
			inputparams: readonly [
				ListID: number, 
				EndpointID: number, 
				NodeID: string, 
			],
			 outputparams: readonly []
            }
		AddACLToNode?: {
			inputparams: readonly [
				NodeID: string, 
				ACLEntry: DatastoreAccessControlEntryStruct, 
			],
			 outputparams: readonly []
            }
		RemoveACLFromNode?: {
			inputparams: readonly [
				ListID: number, 
				NodeID: string, 
			],
			 outputparams: readonly []
            }
}
	events: {
	}
}

export const jointFabricDatastore: ClusterDefinition<JointFabricDatastore> = {
id: 0x0752,
	attributes: [
		"AnchorRootCA",
		"AnchorNodeID",
		"AnchorVendorID",
		"FriendlyName",
		"GroupKeySetList",
		"GroupList",
		"NodeList",
		"AdminList",
		"Status",
		"EndpointGroupIDList",
		"EndpointBindingList",
		"NodeKeySetList",
		"NodeACLList",
		"NodeEndpointList",
	] as const,
	commands: [
		"AddKeySet",
		"UpdateKeySet",
		"RemoveKeySet",
		"AddGroup",
		"UpdateGroup",
		"RemoveGroup",
		"AddAdmin",
		"UpdateAdmin",
		"RemoveAdmin",
		"AddPendingNode",
		"RefreshNode",
		"UpdateNode",
		"RemoveNode",
		"UpdateEndpointForNode",
		"AddGroupIDToEndpointForNode",
		"RemoveGroupIDFromEndpointForNode",
		"AddBindingToEndpointForNode",
		"RemoveBindingFromEndpointForNode",
		"AddACLToNode",
		"RemoveACLFromNode",
	] as const,
	events: [
	] as const
}

export default jointFabricDatastore;