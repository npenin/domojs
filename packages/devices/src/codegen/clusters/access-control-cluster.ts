// This file is generated from access-control-cluster.xml - do not edit it directly
// Generated on 2025-08-24T09:48:21.721Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum AccessControlEntryPrivilegeEnum {
	View= 1,
	ProxyView= 2,
	Operate= 3,
	Manage= 4,
	Administer= 5,
}

export enum AccessControlEntryAuthModeEnum {
	PASE= 1,
	CASE= 2,
	Group= 3,
}

export enum AccessRestrictionTypeEnum {
	AttributeAccessForbidden= 0,
	AttributeWriteForbidden= 1,
	CommandForbidden= 2,
	EventForbidden= 3,
}

export enum ChangeTypeEnum {
	Changed= 0,
	Added= 1,
	Removed= 2,
}

export interface AccessControlTargetStruct {
	Cluster:import ("./clusters-index.js").ClusterIds,
	Endpoint:number,
	DeviceType:number,
}

export interface AccessControlEntryStruct {
	Privilege:AccessControlEntryPrivilegeEnum,
	AuthMode:AccessControlEntryAuthModeEnum,
	Subjects:readonly bigint[],
	Targets:readonly AccessControlTargetStruct[],
}

export interface AccessControlExtensionStruct {
	Data:import ("@akala/core").IsomorphicBuffer,
}

export interface AccessRestrictionEntryStruct {
	Endpoint:number,
	Cluster:import ("./clusters-index.js").ClusterIds,
	Restrictions:readonly AccessRestrictionStruct[],
}

export interface AccessRestrictionStruct {
	Type:AccessRestrictionTypeEnum,
	ID:number,
}

export interface CommissioningAccessRestrictionEntryStruct {
	Endpoint:number,
	Cluster:import ("./clusters-index.js").ClusterIds,
	Restrictions:readonly AccessRestrictionStruct[],
}

/**
 * The Access Control Cluster exposes a data model view of a
      Node's Access Control List (ACL), which codifies the rules used to manage
      and enforce Access Control for the Node's endpoints and their associated
      cluster instances.
 */

export interface AccessControl {
id: 31;
	attributes: {
		ACL:readonly AccessControlEntryStruct[]
		Extension?:readonly AccessControlExtensionStruct[]
		readonly SubjectsPerAccessControlEntry:number
		readonly TargetsPerAccessControlEntry:number
		readonly AccessControlEntriesPerFabric:number
		readonly CommissioningARL?:readonly CommissioningAccessRestrictionEntryStruct[]
		readonly ARL?:readonly AccessRestrictionEntryStruct[]
		/** Device provides ACL Extension attribute */
		readonly SupportsExtension: boolean
		/** Device is managed */
		readonly SupportsManagedDevice: boolean
}
	commands: {
		/** This command signals to the service associated with the device vendor that the fabric administrator would like a review of the current restrictions on the accessing fabric. */
		ReviewFabricRestrictions?: {
			inputparams: readonly [
				ARL: readonly CommissioningAccessRestrictionEntryStruct[], 
			],
			 outputparams: readonly [
				Token: bigint, ]
            }
}
	events: {
		AccessControlEntryChanged: [
			
			AdminNodeID: string, 
			AdminPasscodeID: number, 
			ChangeType: ChangeTypeEnum, 
			LatestValue: AccessControlEntryStruct, ];
		AccessControlExtensionChanged?: [
			
			AdminNodeID: string, 
			AdminPasscodeID: number, 
			ChangeType: ChangeTypeEnum, 
			LatestValue: AccessControlExtensionStruct, ];
		FabricRestrictionReviewUpdate?: [
			
			Token: bigint, 
			Instruction: string, 
			ARLRequestFlowUrl: string, ];
	}
}

export const accessControl: ClusterDefinition<AccessControl> = {
id: 31,
	attributes: [
		"ACL",
		"Extension",
		"SubjectsPerAccessControlEntry",
		"TargetsPerAccessControlEntry",
		"AccessControlEntriesPerFabric",
		"CommissioningARL",
		"ARL",
		"SupportsExtension",
		"SupportsManagedDevice",
	] as const,
	commands: [
		"ReviewFabricRestrictions",
	] as const,
	events: [
		"AccessControlEntryChanged",
		"AccessControlExtensionChanged",
		"FabricRestrictionReviewUpdate",
	] as const
}

export default accessControl;