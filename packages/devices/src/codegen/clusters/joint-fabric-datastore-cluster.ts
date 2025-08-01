

export enum DatastoreAccessControlEntryAuthModeEnum {
	PASE= 1,
	CASE= 2,
	Group= 3,
}

export enum DatastoreAccessControlEntryPrivilegeEnum {
	View= 1,
	ProxyView= 2,
	Operate= 3,
	Manage= 4,
	Administer= 5,
}

export enum DatastoreGroupKeyMulticastPolicyEnum {
	PerGroupID= 0,
	AllNodes= 1,
}

export enum DatastoreGroupKeySecurityPolicyEnum {
	TrustFirst= 0,
}

export enum DatastoreStateEnum {
	Pending= 0,
	Committed= 1,
	DeletePending= 2,
	CommitFailed= 3,
}

export interface DatastoreACLEntryStruct {
	NodeID: string,
	ListID: number,
	ACLEntry:DatastoreAccessControlEntryStruct,
	StatusEntry:DatastoreStatusEntryStruct,
}

export interface DatastoreAccessControlEntryStruct {
	Privilege:DatastoreAccessControlEntryPrivilegeEnum,
	AuthMode:DatastoreAccessControlEntryAuthModeEnum,
	Subjects: bigint,
	Targets:DatastoreAccessControlTargetStruct,
}

export interface DatastoreAccessControlTargetStruct {
	Cluster:import ("./clusters-index.js").ClusterIds,
	Endpoint: number,
	DeviceType: number,
}

export interface DatastoreAdministratorInformationEntryStruct {
	NodeID: string,
	FriendlyName: string,
	VendorID: number,
	ICAC:import ("@akala/core").IsomorphicBuffer,
}

export interface DatastoreBindingTargetStruct {
	Node?: string,
	Group?: number,
	Endpoint?: number,
	Cluster?:import ("./clusters-index.js").ClusterIds,
}

export interface DatastoreEndpointBindingEntryStruct {
	NodeID: string,
	EndpointID: number,
	ListID: number,
	Binding:DatastoreBindingTargetStruct,
	StatusEntry:DatastoreStatusEntryStruct,
}

export interface DatastoreEndpointEntryStruct {
	EndpointID: number,
	NodeID: string,
	FriendlyName: string,
	StatusEntry:DatastoreStatusEntryStruct,
}

export interface DatastoreEndpointGroupIDEntryStruct {
	NodeID: string,
	EndpointID: number,
	GroupID: number,
	StatusEntry:DatastoreStatusEntryStruct,
}

export interface DatastoreGroupInformationEntryStruct {
	GroupID: bigint,
	FriendlyName: string,
	GroupKeySetID: number,
	GroupCAT: number,
	GroupCATVersion: number,
	GroupPermission:DatastoreAccessControlEntryPrivilegeEnum,
}

export interface DatastoreGroupKeySetStruct {
	GroupKeySetID: number,
	GroupKeySecurityPolicy:DatastoreGroupKeySecurityPolicyEnum,
	EpochKey0:import ("@akala/core").IsomorphicBuffer,
	EpochStartTime0: number,
	EpochKey1:import ("@akala/core").IsomorphicBuffer,
	EpochStartTime1: number,
	EpochKey2:import ("@akala/core").IsomorphicBuffer,
	EpochStartTime2: number,
	GroupKeyMulticastPolicy:DatastoreGroupKeyMulticastPolicyEnum,
}

export interface DatastoreNodeInformationEntryStruct {
	NodeID: string,
	FriendlyName: string,
	CommissioningStatusEntry:DatastoreStatusEntryStruct,
}

export interface DatastoreNodeKeySetEntryStruct {
	NodeID: string,
	GroupKeySetID: number,
	StatusEntry:DatastoreStatusEntryStruct,
}

export interface DatastoreStatusEntryStruct {
	State:DatastoreStateEnum,
	UpdateTimestamp: number,
	FailureCode: number,
}

/**
 * The Joint Fabric Datastore Cluster is a cluster that provides a mechanism for the Joint Fabric Administrators to manage the set of Nodes, Groups, and Group membership among Nodes in the Joint Fabric.
 */

export interface JointFabricDatastore {
id: 1874;
	attributes: {
		readonly AnchorRootCA:import ("@akala/core").IsomorphicBuffer
		readonly AnchorNodeID: string
		readonly AnchorVendorID: number
		readonly FriendlyName: string
		readonly GroupKeySetList:readonly DatastoreGroupKeySetStruct[]
		readonly GroupList:readonly DatastoreGroupInformationEntryStruct[]
		readonly NodeList:readonly DatastoreNodeInformationEntryStruct[]
		readonly AdminList:readonly DatastoreAdministratorInformationEntryStruct[]
		readonly Status:DatastoreStatusEntryStruct
		readonly EndpointGroupIDList:readonly DatastoreEndpointGroupIDEntryStruct[]
		readonly EndpointBindingList:readonly DatastoreEndpointBindingEntryStruct[]
		readonly NodeKeySetList:readonly DatastoreNodeKeySetEntryStruct[]
		readonly NodeACLList:readonly DatastoreACLEntryStruct[]
		readonly NodeEndpointList:readonly DatastoreEndpointEntryStruct[]
}
	commands: {
		/** This command SHALL be used to add a KeySet to the Joint Fabric Datastore Cluster of the accessing fabric. */
		AddKeySet: {
			inputparams: readonly [
				GroupKeySet: DatastoreGroupKeySetStruct, 
			],
			 outputparams: readonly []
            }
		/** This command SHALL be used to update a KeySet in the Joint Fabric Datastore Cluster of the accessing fabric. */
		UpdateKeySet: {
			inputparams: readonly [
				GroupKeySet: DatastoreGroupKeySetStruct, 
			],
			 outputparams: readonly []
            }
		/** This command SHALL be used to remove a KeySet from the Joint Fabric Datastore Cluster of the accessing fabric. */
		RemoveKeySet: {
			inputparams: readonly [
				GroupKeySetID:  number, 
			],
			 outputparams: readonly []
            }
		/** This command SHALL be used to add a group to the Joint Fabric Datastore Cluster of the accessing fabric. */
		AddGroup: {
			inputparams: readonly [
				GroupID:  number, 
				FriendlyName:  string, 
				GroupKeySetID:  number, 
				GroupCAT:  number, 
				GroupCATVersion:  number, 
				GroupPermission: DatastoreAccessControlEntryPrivilegeEnum, 
			],
			 outputparams: readonly []
            }
		/** This command SHALL be used to update a group in the Joint Fabric Datastore Cluster of the accessing fabric. */
		UpdateGroup: {
			inputparams: readonly [
				GroupID:  number, 
				FriendlyName:  string, 
				GroupKeySetID:  number, 
				GroupCAT:  number, 
				GroupCATVersion:  number, 
				GroupPermission: DatastoreAccessControlEntryPrivilegeEnum, 
			],
			 outputparams: readonly []
            }
		/** This command SHALL be used to remove a group from the Joint Fabric Datastore Cluster of the accessing fabric. */
		RemoveGroup: {
			inputparams: readonly [
				GroupID:  number, 
			],
			 outputparams: readonly []
            }
		/** This command SHALL be used to add an admin to the Joint Fabric Datastore Cluster of the accessing fabric. */
		AddAdmin: {
			inputparams: readonly [
				NodeID:  string, 
				FriendlyName:  string, 
				VendorID:  number, 
				ICAC: import ("@akala/core").IsomorphicBuffer, 
			],
			 outputparams: readonly []
            }
		/** This command SHALL be used to update an admin in the Joint Fabric Datastore Cluster of the accessing fabric. */
		UpdateAdmin: {
			inputparams: readonly [
				NodeID:  string, 
				FriendlyName:  string, 
				ICAC: import ("@akala/core").IsomorphicBuffer, 
			],
			 outputparams: readonly []
            }
		/** This command SHALL be used to remove an admin from the Joint Fabric Datastore Cluster of the accessing fabric. */
		RemoveAdmin: {
			inputparams: readonly [
				NodeID:  string, 
			],
			 outputparams: readonly []
            }
		/** The command SHALL be used to add a node to the Joint Fabric Datastore Cluster of the accessing fabric. */
		AddPendingNode: {
			inputparams: readonly [
				NodeID:  string, 
				FriendlyName:  string, 
			],
			 outputparams: readonly []
            }
		/** The command SHALL be used to request that Datastore information relating to a Node of the accessing fabric is refreshed. */
		RefreshNode: {
			inputparams: readonly [
				NodeID:  string, 
			],
			 outputparams: readonly []
            }
		/** The command SHALL be used to update the friendly name for a node in the Joint Fabric Datastore Cluster of the accessing fabric. */
		UpdateNode: {
			inputparams: readonly [
				NodeID:  string, 
				FriendlyName:  string, 
			],
			 outputparams: readonly []
            }
		/** This command SHALL be used to remove a node from the Joint Fabric Datastore Cluster of the accessing fabric. */
		RemoveNode: {
			inputparams: readonly [
				NodeID:  string, 
			],
			 outputparams: readonly []
            }
		/** This command SHALL be used to update the state of an endpoint for a node in the Joint Fabric Datastore Cluster of the accessing fabric. */
		UpdateEndpointForNode: {
			inputparams: readonly [
				EndpointID:  number, 
				NodeID:  string, 
				FriendlyName:  string, 
			],
			 outputparams: readonly []
            }
		/** This command SHALL be used to add a Group ID to an endpoint for a node in the Joint Fabric Datastore Cluster of the accessing fabric. */
		AddGroupIDToEndpointForNode: {
			inputparams: readonly [
				NodeID:  string, 
				EndpointID:  number, 
				GroupID:  number, 
			],
			 outputparams: readonly []
            }
		/** This command SHALL be used to remove a Group ID from an endpoint for a node in the Joint Fabric Datastore Cluster of the accessing fabric. */
		RemoveGroupIDFromEndpointForNode: {
			inputparams: readonly [
				NodeID:  string, 
				EndpointID:  number, 
				GroupID:  number, 
			],
			 outputparams: readonly []
            }
		/** This command SHALL be used to add a binding to an endpoint for a node in the Joint Fabric Datastore Cluster of the accessing fabric. */
		AddBindingToEndpointForNode: {
			inputparams: readonly [
				NodeID:  string, 
				EndpointID:  number, 
				Binding: DatastoreBindingTargetStruct, 
			],
			 outputparams: readonly []
            }
		/** This command SHALL be used to remove a binding from an endpoint for a node in the Joint Fabric Datastore Cluster of the accessing fabric. */
		RemoveBindingFromEndpointForNode: {
			inputparams: readonly [
				ListID:  number, 
				EndpointID:  number, 
				NodeID:  string, 
			],
			 outputparams: readonly []
            }
		/** This command SHALL be used to add an ACL to a node in the Joint Fabric Datastore Cluster of the accessing fabric. */
		AddACLToNode: {
			inputparams: readonly [
				NodeID:  string, 
				ACLEntry: DatastoreAccessControlEntryStruct, 
			],
			 outputparams: readonly []
            }
		/** This command SHALL be used to remove an ACL from a node in the Joint Fabric Datastore Cluster of the accessing fabric. */
		RemoveACLFromNode: {
			inputparams: readonly [
				ListID:  number, 
				NodeID:  string, 
			],
			 outputparams: readonly []
            }
}
	events: {
	}
}